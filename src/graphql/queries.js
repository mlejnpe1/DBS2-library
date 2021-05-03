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
        text
        user {
          username
        }
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
  query($id: Int, $name: String, $authorId: Int) {
    publications(
      where: {
        and: [
          { categoryId: { eq: $id } }
          { book: { authorId: { eq: $authorId } } }
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

export const LOAD_RESERVATIONS = gql`
  query{
    reservations{
      id
      userId
      dateFrom
      dateTo
      debt
      user{
        username
      }
      publication{
        name
      }
    }
  }
`;
