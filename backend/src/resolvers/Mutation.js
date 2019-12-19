import bcrypt from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

import verbsFile from '../../csvjson';

// const stripe = require('stripe')(process.env.STRIPE_SECRET);
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    console.log('TCL: createUser -> args.data', args.data);
    let customer;
    try {
      // customer = await stripe.customers.create({
      //   email: args.data.email,
      //   source: args.data.stripeSource,
      //   plan: process.env.STRIPE_PLAN_TEST,
      //   coupon: 'FInYElST'
      // });
      customer = await stripe.customers.create({
        name: args.data.name,
        email: args.data.email,
        source: args.data.stripeSource
      });
      // plan: process.env.STRIPE_PLAN,
    } catch (err) {
      console.log('ERR', err);
    }

    console.log('TCL: createUser -> customer', customer.id);
    if (!customer) return 'Unable to create customer!';

    let subscription;
    try {
      subscription = await stripe.subscriptions.create({
        coupon: 'FInYElST',
        customer: customer.id,
        items: [
          {
            plan: process.env.STRIPE_PLAN_TEST
          }
        ]
      });
    } catch (err) {
      console.log('Error creating subscription', err);
    }
    console.log('TCL: createUser -> subscription', subscription);

    // const password = await hashPassword(args.data.password);
    // const user = await prisma.mutation.createUser({
    //   data: {
    //     ...args.data,
    //     stripeSubId: customer.subscriptions.data[0].id,
    //     password
    //   }
    // });

    // return {
    //   user,
    //   token: generateToken(user.id)
    // };
  },
  async cancelSubscription(parent, args, { prisma, request }, info) {
    let cancel;
    try {
      cancel = await stripe.subscriptions.del(args.data);
    } catch (err) {
      console.log('ERR', err);
    }
    return JSON.stringify(cancel);
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
            user: {
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
            user: {
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

  async upsertSetting(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);
    const userSetting = await prisma.query.settings({
      where: {
        user: {
          id: userId
        }
      }
    });
    if (userSetting[0]) {
      return await prisma.mutation.updateSetting(
        {
          where: {
            id: userSetting[0].id
          },
          data: {
            ...args.data
          }
        },
        info
      );
    } else {
      return await prisma.mutation.createSetting(
        {
          data: {
            ...args.data,
            user: {
              connect: {
                id: userId
              }
            }
          }
        },
        info
      );
    }
  },

  async createBestStreak(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);
    return await prisma.mutation.createBestStreak(
      {
        data: {
          ...args.data,
          user: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  },

  async createDailyTarget(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);

    return await prisma.mutation.createDailyTarget(
      {
        data: {
          ...args.data,
          user: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  },

  async updateDailyTarget(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const userDailyTarget = await prisma.query.dailyTargets({
      where: {
        user: {
          id: userId
        }
      }
    });

    return await prisma.mutation.updateDailyTarget(
      {
        where: {
          id: userDailyTarget[0].id
        },
        data: {
          ...args.data
        }
      },
      info
    );
  },

  async createVerb(parent, args, { prisma, request }, info) {
    return await Object.values(
      verbsFile.slice(args.data.start, args.data.end)
    ).map(file => {
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
        },
        info
      });
    });
  }
};

export { Mutation as default };
