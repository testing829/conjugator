import gql from 'graphql-tag';

const CANCEL_SUBSCRIPTION = gql`
  mutation($id: String!) {
    cancelSubscription(data: $id)
  }
`;

const CREATE_USER = gql`
  mutation(
    $name: String!
    $email: String!
    $password: String!
    $stripeSource: String!
    $successfulPromo: Boolean!
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        password: $password
        premium: true
        stripeSource: $stripeSource
        successfulPromo: $successfulPromo
      }
    ) {
      user {
        name
        email
      }
      token
    }
  }
`;

const FORGOT_PASSWORD = gql`
  mutation($email: String!) {
    forgotPassword(data: $email)
  }
`;

const GET_MY_INFO = gql`
  query {
    me {
      id
      name
      email
      password
      stripeSubId
      logs {
        id
        verbInfinitive
        tense
        correctAnswer
        userAnswer
        verbPerson
        correct
        createdAt
      }
    }
  }
`;

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

const UPDATE_USER = gql`
  mutation(
    $name: String!
    $email: String!
    $password: String!
    $premium: Boolean!
  ) {
    updateUser(
      data: {
        name: $name
        email: $email
        password: $password
        premium: $premium
      }
    ) {
      id
      email
      name
      premium
      stripeSource
      stripeSubId
    }
  }
`;

export {
  CANCEL_SUBSCRIPTION,
  CREATE_USER,
  FORGOT_PASSWORD,
  GET_MY_INFO,
  LOGIN,
  UPDATE_USER
};
