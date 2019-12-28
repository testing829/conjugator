import getUserId from '../utils/getUserId';

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
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
  }
  // async forgotPassword(parent, args, { prisma, request }, info) {
  //   console.log('TCL: forgotPassword -> args.data', args.data);
  //   const userId = getUserId(request);
  //   console.log('TCL: forgotPassword -> userId', userId);

  //   const user = await prisma.query.user(
  //     {
  //       where: {
  //         id: userId
  //       }
  //     },
  //     info
  //   );
  //   console.log('TCL: forgotPassword -> user', user);
  //   const transporter = nodemailer.createTransport(
  //     smtpTransport({
  //       service: 'gmail',
  //       host: 'smtp.gmail.com',
  //       auth: {
  //         user: 'conjugator.app@gmail.com',
  //         pass: 'UjvqU3Emk7iepGiXVEU-'
  //       }
  //     })
  //   );
  //   try {
  //     await transporter.sendMail({
  //       from: '"Conjugator" <conjugator.app@gmail.com>', // sender address
  //       to: `${args.data}`,
  //       subject: 'Hello ✔', // Subject line
  //       text: 'Hello world!', // plain text body
  //       html: '<b>Hello world?</b>' // html body
  //     });
  //   } catch (err) {
  //     console.log('Error sending mail:', err);
  //   }

  //   return 'hello';
  // }
};

export { Query as default };
