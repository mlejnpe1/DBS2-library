import { gql } from "@apollo/client";

export const LOAD_PUBLICATIONS = gql`
  query {
    publications {
      name
      id
      yearOfPub
      bookId
      quantity
      magazineId
      magazine {
        issue
      }
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
  query {
    publishers {
      id
      name
    }
  }
`;

export const LOAD_AUTHORS = gql`
  query {
    authors {
      id
      name
      secondName
      lastName
    }
  }
`;

export const FILTER_PUBLICATIONS = gql`
  query($id: Int!, $name: String!) {
    publications(
      where: {
        and: [
          { categoryId: { eq: $id } }
          { name: { contains: $name } }
          { quantity: { gt: 0 } }
        ]
      }
    ) {
      name
      category {
        name
      }
      quantity
    }
  }
`;
