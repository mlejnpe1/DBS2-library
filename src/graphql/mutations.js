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
  ){
    createReservation(
      reservationModel:{
        dateFrom: $dateFrom
        dateTo: $dateTo
        publicationId: $publicationId
        userId: $userId
      }
    ){
      id
      dateFrom
      dateTo
    }
  }
`;

export const DELETE_RESERVATION = gql`
mutation(
  $reservationId: Int!
){
  deleteReservation(
    id: $reservationId
  ){
    dateTo
    publication{
      name
    }
  }
}
`;
