import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Query {
    user(username: String!): User!
    users: [User!]!
  }
  type User {
    id: ID
    username: String!
    firstName: String!
    lastName: String!
    emailAddress: String!
  }
`