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

type Query {
  getSingleUser(user: ID, params: GetSingleUserParams): User
}

input GetSingleUserParams {
  id: ID
  username: String
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  login(input: LoginInput!): Auth
  saveBook(body: BookInput!): User
  deleteBook(bookId: String!): User
}

input LoginInput {
  username: String!
  email: String!
  password: String!
}

input BookInput {
  bookId: String!
  authors: [String]
  description: String
  image: String
  link: String
  title: String!
}
`;

module.exports = typeDefs;