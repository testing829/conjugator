import gql from 'graphql-tag';

const FIFTY_PERCENT_OFF = gql`
  mutation($id: String!) {
    fiftyPercentDiscount(data: $id)
  }
`;

const MONTH_FREE = gql`
  mutation($id: String!) {
    monthFreeDiscount(data: $id)
  }
`;

export { FIFTY_PERCENT_OFF, MONTH_FREE };
