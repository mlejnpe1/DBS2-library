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
  ) {
    createReservation(
      reservationModel: {
        dateFrom: $dateFrom
        dateTo: $dateTo
        publicationId: $publicationId
        userId: $userId
      }
    ) {
      id
      dateFrom
      dateTo
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

export const LOGIN = gql`
  mutation($name: String, $password: String) {
    login(userName: $name, password: $password) {
      id
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
mutation(
  $name: String!
  $secondName: String!
  $lastName: String!
){
  createAuthor(
    authorModel:{
      name: $name
      secondName: $secondName
      lastName: $lastName
    }
  ){
    id
    name
    secondName
    lastName
  }
}
`;
