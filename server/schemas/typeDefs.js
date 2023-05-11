const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  savedBooks: [Book]
}

type Book {
  bookId: String!
  authors: [String]
  description: String
  image: String
  link: String
  title: String!
}

type Auth {
  token: ID!
  user: User
}

input BookInput {
  bookId: String!
  authors: [String]
  description: String
  image: String
  link: String
  title: String!
}

type Query {
  getSingleUser: User
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  saveBook(body: BookInput!): User
  deleteBook(bookId: String!): User
}
`;

module.exports = typeDefs;