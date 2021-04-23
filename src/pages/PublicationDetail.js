import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TextField from "@material-ui/core/TextField";
import faker from "faker";
import Footer from "../components/Footer";
import { useMutation, useQuery } from "@apollo/client";
import "../assets/PublicationDetail.css";
import Button from "@material-ui/core/Button";
import { LOAD_BOOK } from "../graphql/queries";
import { CREATE_REVIEW } from "../graphql/mutations";
import { Typography } from "@material-ui/core";
import Review from "../components/Review";

const PublicationDetail = (props) => {
  const idPublication = parseInt(props.location.state.id); //String with ID has to be parse into Int, otherwise useQuery cannot fetch data and fails
  const { error, loading, data } = useQuery(LOAD_BOOK, {
    variables: { id: idPublication }, //If it still reporst undefined data, check whether variables name is matched with the ones passed in query
  });

  const { createReview } = useMutation(CREATE_REVIEW);
  const [publication, setPublication] = useState([]);
  const [textReview, setTextReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const addReview = (e, text, idPublication, uId) => {
    e.preventDefault();
    if (text) {
      console.log(text);
      createReview({
        variables: {
          publicationId: idPublication,
          text: text,
          userId: uId,
          date: "2019-01-28T19:32:08.382Z",
        },
      });
    } else {
      alert("Textové pole neobsahuje žádný text!");
    }
  };

  useEffect(() => {
    if (data) {
      setPublication(data.publication);
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
        <form onSubmit={addReview} id="insertReview">
          <TextField
            onChange
            id="outlined-multiline-static"
            label="Zadejte zde svoji recenzi"
            multiline
            value={textReview}
            onChange={(event) =>
              setTextReview(event.target.value, textReview, idPublication, 1)
            }
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
      <Footer />
    </>
  );
};

export default PublicationDetail;
