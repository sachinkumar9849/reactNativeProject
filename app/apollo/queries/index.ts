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
export const GET_CANDIDATE_LOCATIONS = gql`
  query CandidateLocations {
    candidateLocations {
      id
      nicename
    }
  }
`;

export const MY_DETAIL_QUERY = gql`
  query MyDetail {
    myDetail {
      id
      status
      is_favourite
      experiences {
        id
        candidate_id
        title
        company
        location
        currently_working
        start_date
        end_date
        description
        country {
          id
          iso
          nicename
          phonecode
        }
      }
      user_id
    }
  }
`;

