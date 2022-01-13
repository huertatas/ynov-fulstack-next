import gql from "graphql-tag";

export const getProducts = gql`
  query {
    getProducts {
      id
      title
      price
    }
  }
`;
