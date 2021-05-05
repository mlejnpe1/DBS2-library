import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
  mutation(
    $text: String!
    $userId: Int!
    $date: DateTime!
    $publicationId: Int!
  ) {
    createReview(
      reviewModel: {
        depublication: false
        text: $text
        userId: $userId
        creationDate: $date
        publicationId: $publicationId
      }
    ) {
      id
      depublication
      user {
        username
      }
      text
      creationDate
    }
  }
`;

export const CREATE_RESERVATION = gql`
  mutation(
    $dateFrom: DateTime!
    $dateTo: DateTime!
    $publicationId: Int!
    $userId: Int!
    $returned: Boolean!
  ) {
    createReservation(
      reservationModel: {
        dateFrom: $dateFrom
        dateTo: $dateTo
        publicationId: $publicationId
        userId: $userId
        bookReturned: $returned
      }
    ) {
      id
      dateFrom
      dateTo
    }
  }
`;

export const UPDATE_RESERVATION = gql`
  mutation(
    $id: ID!
    $dateFrom: DateTime!
    $dateTo: DateTime!
    $publicationId: Int!
    $userId: Int!
    $returned: Boolean!
    $debt: Float!
  ) {
    updateReservation(
      reservationModel: {
        id: $id
        dateFrom: $dateFrom
        dateTo: $dateTo
        publicationId: $publicationId
        userId: $userId
        bookReturned: $returned
        debt: $debt
      }
    ) {
      id
      dateFrom
      dateTo
    }
  }
`;

export const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(userName: $username, password: $password) {
      id
      username
      role {
        name
      }
    }
  }
`;

export const REGISTER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(
      userModel: {
        username: $username
        email: $email
        password: $password
        roleId: 1
      }
    ) {
      id
      username
      email
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation($name: String!) {
    createCategory(categoryModel: { name: $name }) {
      id
      name
    }
  }
`;

export const CREATE_AUTHOR = gql`
  mutation($name: String!, $secondName: String!, $lastName: String!) {
    createAuthor(
      authorModel: { name: $name, secondName: $secondName, lastName: $lastName }
    ) {
      id
      name
      secondName
      lastName
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation(
    $name: String!
    $authorId: Int!
    $isbn: String!
    $publisherId: Int!
    $img: String!
    $desc: String
    $categoryId: Int!
    $year: Int!
    $fileExt: String!
    $date: DateTime!
    $quantity: Int!
  ) {
    createBook(
      bookModel: {
        authorId: $authorId
        iSBN: $isbn
        publication: {
          description: $desc
          name: $name
          quantity: $quantity
          yearOfPub: $year
          categoryId: $categoryId
          publisherId: $publisherId
          image: {
            img: $img
            fileExtension: $fileExt
            dateCreated: $date
            dateModified: $date
          }
        }
      }
    ) {
      iSBN
      author {
        lastName
        id
        name
        secondName
      }
      publication {
        id
        bookId
        categoryId
        magazineId
        name
        publisher {
          name
        }
        image {
          img
        }
        description
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const CREATE_MAGAZINE = gql`
  mutation(
    $issue: String!
    $name: String!
    $publisherId: Int!
    $img: String!
    $desc: String
    $categoryId: Int!
    $year: Int!
    $fileExt: String!
    $date: DateTime!
    $quantity: Int!
  ) {
    createMagazine(
      magazineModel: {
        issue: $issue
        publication: {
          description: $desc
          name: $name
          quantity: $quantity
          yearOfPub: $year
          categoryId: $categoryId
          publisherId: $publisherId
          image: {
            img: $img
            fileExtension: $fileExt
            dateCreated: $date
            dateModified: $date
          }
        }
      }
    ) {
      publication {
        id
        categoryId
        magazineId
        name
        publisher {
          name
        }
        image {
          img
        }
        description
      }
    }
  }
`;

export const CREATE_PUBLISHER = gql`
  mutation($name: String!) {
    createPublisher(publisherModel: { name: $name }) {
      id
      name
    }
  }
`;

export const DELETE_RESERVATION = gql`
  mutation($reservationId: Int!) {
    deleteReservation(id: $reservationId) {
      dateTo
      publication {
        name
      }
    }
  }
`;

export const DELETE_PUBLICATION = gql`
  mutation($id: Int!) {
    deletePublication(id: $id) {
      name
      id
    }
  }
`;

export const UPDATE_MAGAZINE = gql`
  mutation(
    $id: ID!
    $issue: String!
    $name: String!
    $publisherId: Int!
    $desc: String
    $categoryId: Int!
    $year: Int!
    $quantity: Int!
  ) {
    updateMagazine(
      magazineModel: {
        issue: $issue
        publication: {
          id: $id
          description: $desc
          name: $name
          quantity: $quantity
          yearOfPub: $year
          categoryId: $categoryId
          publisherId: $publisherId
        }
      }
    ) {
      id
      publication {
        id
        bookId
        categoryId
        magazineId
        name
        publisher {
          name
        }
        image {
          img
        }
        description
      }
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation(
    $id: ID!
    $name: String!
    $authorId: Int!
    $isbn: String!
    $publisherId: Int!
    $desc: String
    $categoryId: Int!
    $year: Int!
    $quantity: Int!
  ) {
    updateBook(
      bookModel: {
        authorId: $authorId
        iSBN: $isbn
        publication: {
          id: $id
          description: $desc
          name: $name
          quantity: $quantity
          yearOfPub: $year
          categoryId: $categoryId
          publisherId: $publisherId
        }
      }
    ) {
      iSBN
      id
      author {
        lastName
        id
        name
        secondName
      }
      publication {
        id
        bookId
        categoryId
        magazineId
        name
        publisher {
          name
        }
        image {
          img
        }
        description
      }
    }
  }
`;

export const DEPUBLICATE = gql`
  mutation($id: Int!) {
    depublication(id: $id) {
      userId
      text
      id
      depublication
    }
  }
`;
