const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    fullName: String!
    email: String!
    profilePicture: String
    token: String
  }

  type Course {
    id: ID!
    title: String!
    description: String!
    image: String
  }

  type Query {
    getCourses: [Course!]!
    getUserProfile(email: String!): User!
  }

  type Mutation {
    register(fullName: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    forgotPassword(email: String!): String!
    resetPassword(resetToken: String!, newPassword: String!): String!  # Added resetPassword mutation
    updateProfile(fullName: String, email: String, profilePicture: String): User!
  }
`;

module.exports = typeDefs;
