import { gql } from "@apollo/client";

export const LOAD_PUBLICATIONS = gql`
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

export const LOAD_BOOK = gql`
  query($id: Int!) {
    publication(id: $id) {
      id
      name
      yearOfPub
      description
      image {
        img
      }
      category {
        id
        name
      }
      book {
        quantity
        author {
          name
          secondName
          lastName
        }
      }
    }
  }
`;
