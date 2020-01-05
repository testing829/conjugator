import bcrypt from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';
import verbsFile from '../../csvjson';
import frenchFile from '../../french_verbs_new.json';

// const stripe = require('stripe')(process.env.STRIPE_SECRET);
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    let customer;
    try {
      customer = await stripe.customers.create({
        name: args.data.name,
        email: args.data.email,
        source: args.data.stripeSource
      });
    } catch (err) {
      console.log('ERR', err);
    }

    if (!customer) return 'Unable to create customer!';

    let subscription;
    try {
      subscription = await stripe.subscriptions.create({
        coupon: args.data.successfulPromo
          ? process.env.STRIPE_MONTH_FREE_COUPON_TEST
          : null,
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

    const password = await hashPassword(args.data.password);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        stripeSubId: subscription.id,
        password
      }
    });

    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })
    );
    const names = args.data.name.split(' ');
    const firstName = names[0];
    await transporter.sendMail({
      from: '"Conjugator" <conjugator.app@gmail.com>',
      to: `${user.email}`,
      subject: 'Welcome!',
      html: `<div>Hey ${firstName}, \n <p>Thanks for signing up to Conjugator!</p>\n <p>Now that you have a premium account, can now access all of the verb tenses, listen to a native pronounce the verbs, save your settings and track your learning progress.</p>\n<p>If you have any questions or feedback, please send us a message on the Feedback page: <a href="https://conjugator.io/#/feedback">https://conjugator.io/#/feedback</a></p>\n<p>Best of luck with your language learning journey!</p></div>`
    });

    return {
      user,
      token: generateToken(user.id)
    };
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
  async fiftyPercentDiscount(parent, args, { prisma, request }, info) {
    let subscription;
    try {
      subscription = await stripe.subscriptions.update(args.data, {
        coupon: process.env.STRIPE_50_OFF_COUPON
      });
    } catch (err) {
      console.log('ERR', err);
    }
    return JSON.stringify(subscription);
  },
  async monthFreeDiscount(parent, args, { prisma, request }, info) {
    let subscription;
    try {
      subscription = await stripe.subscriptions.update(args.data, {
        coupon: process.env.STRIPE_MONTH_FREE_COUPON
      });
    } catch (err) {
      console.log('ERR', err);
    }
    return JSON.stringify(subscription);
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
    // const userId = getUserId(request);

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }

    return await prisma.mutation.updateUser(
      {
        where: {
          id: args.data.id
        },
        data: {
          email: args.data.email,
          name: args.data.name,
          password: args.data.password,
          premium: args.data.premium
        }
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
  },
  async createFrenchVerb(parent, args, { prisma, request }, info) {
    console.log('FRENCH', args.data.start, args.data.end);
    console.log(frenchFile.length);
    return await Object.values(
      frenchFile.slice(args.data.start, args.data.end)
    ).map(file => {
      prisma.mutation.createFrenchVerb({
        data: {
          form1p: file.form_1p,
          form1s: file.form_1s,
          form2p: file.form_2p,
          form2s: file.form_2s,
          form3p: file.form_3p,
          form3s: file.form_3s,
          gerund: file.gerund,
          infinitive: file.infinitive,
          moodEnglish: file.mood_english,
          tense: file.tense,
          tenseEnglish: file.tense_english,
          verbEnglish: file.verb_english
        },
        info
      });
    });
  },
  async forgotPassword(parent, args, { prisma, request }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data
      }
    });
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })
    );
    const names = user.name.split(' ');
    const firstName = names[0];
    const sendingMail = await transporter.sendMail({
      from: '"Conjugator" <conjugator.app@gmail.com>',
      to: `${user.email}`,
      subject: 'Reset password',
      html: `<div>Hey ${firstName}, \n <p>Here’s the password reset link you requested. Please click the link to reset your password and regain access to your account: <a href="https://conjugator.io/#/forgot-password/${user.id}">https://conjugator.io/#/forgot-password/${user.id}</a></p>\n <p>If you have any problems resetting your password, just leave a message on the Feedback page and we'll get back to you as soon as possible.</p></div>`
    });
    return JSON.stringify(sendingMail);
  }
};

export { Mutation as default };
