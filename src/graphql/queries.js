import { gql } from "@apollo/client";

export const LOAD_BOOKS = gql`
  query {
    books {
      id
      authorId
    }
  }
`;

export const LOAD_USER = (id) => gql`
    query {
        user(id:${id}) {
        email
        telNumber
        username
        reservations {
            id
            publicationId
            publication {
            id
            name
            }
            dateFrom
            dateTo
        }
        }
    }
`;
