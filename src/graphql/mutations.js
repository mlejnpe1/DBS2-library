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
  ) {
    updateReservation(
      reservationModel: {
        id: $id
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

export const LOGIN = gql`
  mutation($name: String, $password: String) {
    login(userName: $name, password: $password) {
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
      id
      author {
        lastName
        id
        name
        secondName
      }
      publication {
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
      id
      publication {
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
mutation(
  $name: String!
){
  createPublisher(
    publisherModel:{
      name: $name
    }
  ){
    id
    name
  }
}
`;
