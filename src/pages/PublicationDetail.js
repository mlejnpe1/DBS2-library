import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TextField from "@material-ui/core/TextField";
import faker from "faker";
import Footer from "../components/Footer";
import { useQuery } from "@apollo/client";
import "../assets/PublicationDetail.css";
import Button from "@material-ui/core/Button";
import { LOAD_BOOK } from "../graphql/queries";
import { Typography } from "@material-ui/core";
import Review from "../components/Review";

const PublicationDetail = (props) => {
  const id = parseInt(props.location.state.id);
  const { error, loading, data } = useQuery(LOAD_BOOK, {
    variables: { id: 1 },
  });
  const [publication, setPublication] = useState([]);

  if (error) console.log(`Error! ${error.message}`);

  useEffect(() => {
    if (data) {
      setPublication(data.publication);
    }
    console.log(data);
  });

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
        <form onSubmit="addReview" id="insertReview">
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Zadejte zde Recenzi"
            variant="outlined"
          />
          <Button on id="buttonInsert" variant="contained" color="primary">
            Přidat Recenzi
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PublicationDetail;
