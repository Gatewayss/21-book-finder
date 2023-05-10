import { gql } from '@apollo/client';

export const QUERY_SINGLEUSER = gql`
   query getSingleUser {
      _id
      username
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
`;

