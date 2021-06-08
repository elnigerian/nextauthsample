import { gql } from '@apollo/client'

export const GetAllUsersQuery = gql`
    query GetAllUsers {
      getAllUsers {
        userId
        object
        username
        firstName
        lastName
        emailAddress
        enabled
        email_verified
      }
    }
`

export const GetUserByEmailAddressQuery = gql`
    query GetUserByEmailAddress($emailAddress: String!) {
      getUserByEmailAddress(emailAddress: $emailAddress) {
        userId
        username
        firstName
        lastName
        emailAddress
        enabled
        email_verified
      }
    }
`

export const GetUserByUsernameQuery = gql`
    query GetUserByUsername($username: String!) {
      getUserByUsername(username: $username) {
        userId
        username
        firstName
        lastName
        emailAddress
        enabled
        email_verified
      }
    }
`