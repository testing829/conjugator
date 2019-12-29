import getUserId from '../utils/getUserId';
import moment from 'moment';

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

  async monthCorrectCount(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const user = await prisma.query.user({
      where: {
        id: userId
      }
    });

    const accountCreatedDay = moment(user.createdAt).date();
    const todaysDay = moment(new Date()).date();
    const difference = todaysDay - accountCreatedDay;
    let billingDate;
    if (difference >= 0) {
      billingDate = moment()
        .subtract(difference, 'day')
        .format('YYYY-MM-DD');
    } else {
      billingDate = moment()
        .subtract(1, 'month')
        .subtract(difference, 'day')
        .format('YYYY-MM-DD');
    }

    const monthlyLogs = await prisma.query.logsConnection(
      {
        where: {
          correct: true,
          AND: {
            user: {
              id: userId
            },
            createdAt_gte: billingDate
          }
        }
      },
      `{aggregate {count}}`
    );
    return monthlyLogs.aggregate.count;
  },

  async todayCorrectCount(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const dailyLogs = await prisma.query.logsConnection(
      {
        where: {
          correct: true,
          AND: {
            user: {
              id: userId
            },
            createdAt_gte: moment().subtract(1, 'day')
          }
        }
      },
      `{aggregate {count}}`
    );
    return dailyLogs.aggregate.count;
  }
};

export { Query as default };
