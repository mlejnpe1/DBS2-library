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
        debt
        userId
      }
    }
  }
`;

export const LOAD_PUBLICATION = gql`
  query($id: Int!) {
    publication(id: $id) {
      id
      name
      yearOfPub
      description
      quantity
      publisherId
      bookId
      magazineId
      categoryId
      image {
        img
      }
      category {
        id
        name
      }
      magazine {
        issue
      }
      reviews {
        id
        text
        user {
          id
          username
        }
        depublication
        creationDate
      }
      book {
        iSBN
        author {
          id
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
  query(
    $name: String!
    $cat: String
    $qua: Int!
    $authorName: String!
    $authorLastName: String!
  ) {
    publications(
      where: {
        and: [
          { name: { contains: $name } }
          { quantity: { gt: $qua } }
          { category: { name: { contains: $cat } } }
          { book: { author: { name: { contains: $authorName } } } }
          { book: { author: { lastName: { contains: $authorLastName } } } }
        ]
      }
    ) {
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

export const LOAD_RESERVATIONS = gql`
  query {
    reservations {
      id
      userId
      dateFrom
      dateTo
      debt
      user {
        username
      }
      publication {
        id
        name
      }
      bookReturned
    }
  }
`;
