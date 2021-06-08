import { gql } from '@apollo/client'

export const SignInMutation = gql`
    mutation SignIn($username: String!, $password: String!) {
      signIn(username: $username, password: $password) {
        userId
        username
        object
        emailAddress
        enabled
      }
    }
`