import gql from 'graphql-tag';

const LOGS = gql`
  query {
    logs {
      id
      verbInfinitive
      tense
      answer
      correct
      createdAt
      user {
        id
        name
        email
      }
    }
  }
`;

const AM_I_LOGGED_IN = gql`
  query {
    me {
      id
      email
      name
    }
  }
`;

const CREATE_LOG = gql`
  mutation(
    $correct: Boolean!
    $correctAnswer: String!
    $tense: String!
    $userAnswer: String!
    $verbInfinitive: String!
    $verbPerson: String!
  ) {
    createLog(
      data: {
        correct: $correct
        correctAnswer: $correctAnswer
        tense: $tense
        userAnswer: $userAnswer
        verbInfinitive: $verbInfinitive
        verbPerson: $verbPerson
      }
    ) {
      id
      verbInfinitive
      tense
      correctAnswer
      userAnswer
      verbPerson
      correct
      createdAt
      user {
        id
        name
        email
      }
    }
  }
`;

const MY_LOGS = gql`
  query {
    myLogs {
      id
      verbInfinitive
      tense
      correctAnswer
      userAnswer
      verbPerson
      correct
      createdAt
      user {
        id
        name
        email
        createdAt
        stripeSubId
      }
    }
  }
`;

const MY_LOGS_BY_DATE = gql`
  query($date: DateTime!) {
    myLogs(where: { createdAt_gte: $date }) {
      id
      verbInfinitive
      tense
      correctAnswer
      userAnswer
      verbPerson
      correct
      createdAt
      user {
        id
        name
        email
        createdAt
      }
    }
  }
`;

export { LOGS, AM_I_LOGGED_IN, CREATE_LOG, MY_LOGS_BY_DATE, MY_LOGS };
