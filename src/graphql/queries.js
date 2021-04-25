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

export const LOAD_USER = gql`
  query($id: Int!) {
    user(id: $id) {
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
      reviews {
        text
        user {
          username
        }
        creationDate
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

export const LOAD_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export const LOAD_PUBLISHERS = gql`
query{
  publishers{
    id
    name
  }
}
`;