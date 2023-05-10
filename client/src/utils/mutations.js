import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
  `;

export const LOGIN_USER = gql`
mutation login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      _id
      username
    }
  }
} 
`;

export const SAVE_BOOK = gql`
mutation saveBook($body: BookInput!) {
  saveBook(body: $body) {
    _id
    username
    email
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`
export const DELETE_BOOK = gql`
mutation deleteBook($bookId: String!) {
  deleteBook(bookId: $bookId) {
    _id
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`