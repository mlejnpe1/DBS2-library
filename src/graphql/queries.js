import { gql } from "@apollo/client";

export const LOAD_BOOKS = gql`
  query {
    publications {
      name
      id
      yearOfPub
      bookId
      category {
        id
        name
      }
      image {
        fileExtension
        id
        img
      }
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
