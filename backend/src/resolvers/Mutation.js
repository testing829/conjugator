import bcrypt from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

import verbsFile from '../../csvjson'

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    });
    if (!user) {
      throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(args.data.password, user.password);
    if (!isMatch) {
      throw new Error('Unable to login');
    }
    return {
      user,
      token: generateToken(user.id)
    };
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId
        }
      },
      info
    );
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: args.data
      },
      info
    );
  },

  async createLog(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);
    if (userId) {
      return await prisma.mutation.createLog(
        {
          data: {
            ...args.data,
            student: {
              connect: {
                id: userId
              }
            }
          }
        },
        info
      );
    } else {
      return await prisma.mutation.createLog({
        data: {
          ...args.data
        }
      });
    }
  },

  async createFeedback(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);
    if (userId) {
      return await prisma.mutation.createFeedback(
        {
          data: {
            ...args.data,
            student: {
              connect: {
                id: userId
              }
            }
          }
        },
        info
      );
    } else {
      return await prisma.mutation.createFeedback({
        data: {
          ...args.data
        }
      });
    }
  },

  async createVerb(parent, args, { prisma, request }, info) {
    return await Object.values(verbsFile.slice(args.data.start, args.data.end)).map(file => {
      prisma.mutation.createVerb({
        data: {
          form1p: file.form_1p,
          form1s: file.form_1s,
          form2p: file.form_2p,
          form2s: file.form_2s,
          form3p: file.form_3p,
          form3s: file.form_3s,
          gerund: file.gerund,
          gerundEnglish: file.gerund_english,
          infinitive: file.infinitive,
          infinitiveEnglish: file.infinitive_english,
          mood: file.mood,
          moodEnglish: file.mood_english,
          pastparticiple: file.pastparticiple,
          pastparticipleEnglish: file.pastparticiple_english,
          tense: file.tense,
          tenseEnglish: file.tense_english,
          verbEnglish: file.verb_english
        }, info
      });
    });
  }
};

export { Mutation as default };
