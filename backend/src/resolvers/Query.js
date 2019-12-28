import getUserId from '../utils/getUserId';

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: args.where
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          }
        ]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user(
      {
        where: {
          id: userId
        }
      },
      info
    );
  },
  myLogs(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        ...args.where,
        user: {
          id: userId
        }
      }
    };

    return prisma.query.logs(opArgs, info);
  },
  verbs(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: args.where
    };

    return prisma.query.verbs(opArgs, info);
  },
  logs(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: args.where
    };
    return prisma.query.logs(opArgs, info);
  },
  feedbacks(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: args.where
    };
    return prisma.query.feedbacks(opArgs, info);
  },
  settings(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: args.where
    };
    return prisma.query.settings(opArgs, info);
  },
  dailyTargets(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: args.where
    };
    return prisma.query.dailyTargets(opArgs, info);
  },
  bestStreaks(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: args.where
    };
    return prisma.query.bestStreaks(opArgs, info);
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
    let mail;
    console.log('TCL: forgotPassword -> mail', mail);
    try {
      mail = await transporter.sendMail({
        from: '"Conjugator" <conjugator.app@gmail.com>',
        to: `nickoferrall@gmail.com`,
        subject: 'Reset password',
        html: `<div>Hey ${user.name}, \n <p>Here’s the password reset link you requested. Please click the link to reset your password and regain access to your account: <a href="https://conjugator.io/#/forgot-password/${user.id}">https://conjugator.io/#/forgot-password/${user.id}</a></p>\n <p>If you have any problems resetting your password, just respond to this email and we'll be happy to help.</p></div>`
      });
    } catch (err) {
      console.log('Error sending mail:', err);
    }

    return 'hello';
  }
};

export { Query as default };
