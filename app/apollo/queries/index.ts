import { gql } from '@apollo/client'

export const GET_SKILLS = gql`
  query Skills {
    skills {
      id
      name
    }
  }
`
export const ADD_ROLE = gql`
  mutation AddRole($input: AddRoleInput!) {
    addRole(input: $input) {
      success
      message
      role
    }
  }
`