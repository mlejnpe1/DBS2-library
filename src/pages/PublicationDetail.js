import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeButton from "../components/HomeButton";
import Review from "../components/Review";
import { LOAD_BOOK } from "../graphql/queries";
import { CREATE_REVIEW, CREATE_RESERVATION } from "../graphql/mutations";
import { Typography, Button, TextField } from "@material-ui/core";
import faker from "faker";
import { useMutation, useQuery } from "@apollo/client";
import "../assets/PublicationDetail.css";

const PublicationDetail = (props) => {
  const idPublication = parseInt(props.location.state.id); //String with ID has to be parse into Int, otherwise useQuery cannot fetch data and fails
  const { error, loading, data } = useQuery(LOAD_BOOK, {
    variables: { id: idPublication }, //If it still reporst undefined data, check whether variables name is matched with the ones passed in query
  });

  const [createReview] = useMutation(CREATE_REVIEW);
  const [createReservation] = useMutation(CREATE_RESERVATION);
  const [publication, setPublication] = useState([]);
  const [textReview, setTextReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const addReview = (e, text, idPublication, uId) => {
    e.preventDefault();
      console.log(text);
        const res = createReview({
          variables: {
            publicationId: idPublication,
            text: text,
            userId: uId,
            date: "2019-01-28T19:32:08.382Z",
          },
        }).catch((res) => {
          const errors = res.graphQLErrors.map((error) => {
              return error.message;
          });
        }).then(review => {
          console.log(review.data.createReview);
        });
  };

  const addReservation = (e, idPublication,  uId) =>{
    e.preventDefault();
    const res = createReservation({
      variables: {
        dateFrom: Date.now(),
        dateTo: "2019-01-28T19:32:08.382Z",
        publicationId: idPublication,
        userID: uId
      },
    }).catch((res)=>{
      const errors = res.graphQLErrors.map((error) => {
        return error.message;
    });
    }).then(reservation =>{
      console.log(reservation.data.createReservation);
    }
    )
  }

  useEffect(() => {
    if (data) {
      setPublication(data.publication);
      setReviews(data.publication.reviews);
    }
    console.log(data);
  }, [data]);

  if (error) return `Error! ${error.message}`;
  if (loading) return "Loading...";
  return (
    <>
      <Navbar />
      <div id="mainContent">
        <div id="content">
          <div id="image">
            <img src={faker.image.image()}></img>
          </div>
          <div id="detail">
            <Typography className="texts" variant="h4">
              {publication.name}
            </Typography>
            <Typography className="texts" variant="h6">
              {publication.book?.author.name}{" "}
              {publication.book?.author.secondName
                ? " " +
                  publication.book?.author.secondName +
                  " " +
                  publication.book?.author.lastName
                : " " + publication.book?.author.lastName}
            </Typography>
            <Typography className="texts" variant="body1">
              {publication.description}
            </Typography>
            <div className="button">
              <Button 
                variant="contained"
                color="primary"
                onClick={(event)=> addReservation(event, idPublication, 2)}
               >Vypůjčit</Button>
            </div>
          </div>
        </div>
        <Typography variant="h4">Recenze</Typography>
        <div id="reviews">
          <Review user="Uživatel" date="Datum" />
          <Review user="Uživatel" date="Datum" />
          <Review user="Uživatel" date="Datum" />
          <Review user="Uživatel" date="Datum" />
          <Review user="Uživatel" date="Datum" />
        </div>
        <form
          onSubmit={(event) => addReview(event, textReview, idPublication, 2)}
          id="insertReview"
        >
          <TextField
            onChange
            id="outlined-multiline-static"
            placeholder="Zadejte zde svoji recenzi"
            multiline
            value={textReview}
            onChange={(event) => setTextReview(event.target.value)}
            rows={4}
            variant="outlined"
          />
          <Button
            type="submit"
            id="buttonInsert"
            variant="contained"
            color="primary"
          >
            Přidat Recenzi
          </Button>
        </form>
      </div>
      <HomeButton/>
      <Footer />
    </>
  );
};

export default PublicationDetail;
