import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Review from "../components/Review";
import { LOAD_BOOK } from "../graphql/queries";
import { CREATE_REVIEW, CREATE_RESERVATION } from "../graphql/mutations";
import { Typography, Button, TextField } from "@material-ui/core";
import faker from "faker";
import { useMutation, useQuery } from "@apollo/client";
import "../assets/PublicationDetail.css";
import { formatDate } from "../services/utils";

const PublicationDetail = (props) => {
  const idPublication = parseInt(props.location.state.id); //String with ID has to be parse into Int, otherwise useQuery cannot fetch data and fails
  console.log(idPublication);
  const { error, loading, isLoading, data } = useQuery(LOAD_BOOK, {
    variables: { id: idPublication }, //If it still reporst undefined data, check whether variables name is matched with the ones passed in query
  });

  const [createReview] = useMutation(CREATE_REVIEW);
  const [createReservation] = useMutation(CREATE_RESERVATION);
  const [publication, setPublication] = useState({});
  const [textReview, setTextReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e, text, idPublication, uId) => {
    e.preventDefault();
    console.log(text);
    const res = createReview({
      variables: {
        publicationId: idPublication,
        text: text,
        userId: uId,
        date: new Date().toISOString(),
      },
    })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => {
          return error.message;
        });
      })
      .then((review) => {
        console.log(review);
        setReviews([...reviews, review.data.createReview]);
      });
  };

  const handleMonth = () => {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 31);
    return currentDate.toISOString();
  };

  const addReservation = (e) => {
    e.preventDefault();
    const res = createReservation({
      variables: {
        dateFrom: new Date().toISOString(),
        dateTo: handleMonth(),
        publicationId: idPublication,
        userId: 6,
        returned: false,
      },
    })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => {
          return error.message;
        });
      })
      .then((reservation) => {
        console.log(reservation);
      });
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      if (reviews.length === 0) setReviews(data.publication.reviews);
    }
  }, [data, reviews]);

  if (isLoading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <>
      <Navbar />
      {data.publication ? (
        <div id="mainContent">
          <div id="content">
            <div id="image">
              <img
                src={data.publication.image.img}
                alt="Publication Detail"
              ></img>
            </div>
            <div id="detail">
              <Typography className="texts" variant="h4">
                {data.publication.name}
              </Typography>
              <Typography className="texts" variant="h6">
                {data.publication.book?.author.name}{" "}
                {data.publication.book?.author.secondName
                  ? " " +
                    data.publication.book?.author.secondName +
                    " " +
                    data.publication.book?.author.lastName
                  : " " + data.publication.book?.author.lastName}
              </Typography>
              <Typography className="texts" variant="body1">
                {data.publication.description}
              </Typography>
              <div className="button">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => addReservation(event)}
                >
                  Vypůjčit
                </Button>
              </div>
            </div>
          </div>
          <Typography variant="h4">Recenze</Typography>
          <div id="reviews">
            {reviews.length > 0 ? (
              reviews.map((review) => {
                return (
                  <Review
                    key={review.id}
                    user={review.user.username}
                    date={formatDate(review.creationDate)}
                    text={review.text}
                  />
                );
              })
            ) : (
              <Typography
                style={{
                  margin: "20px 0px",
                  color: "grey",
                  textAlign: "center",
                }}
                variant="h6"
              >
                Žádné recenze
              </Typography>
            )}
          </div>
          <form
            onSubmit={(event) =>
              handleSubmit(event, textReview, idPublication, 2)
            }
            id="insertReview"
          >
            <TextField
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
      ) : (
        <div></div>
      )}
      <Footer />
    </>
  );
};

export default PublicationDetail;
