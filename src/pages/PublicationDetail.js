import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Review from "../components/Review";
import { LOAD_PUBLICATION } from "../graphql/queries";
import {
  CREATE_REVIEW,
  CREATE_RESERVATION,
  DELETE_PUBLICATION,
} from "../graphql/mutations";
import { Typography, Button, TextField, makeStyles } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import "../assets/PublicationDetail.css";
import { Link } from "react-router-dom";
import { formatDate } from "../services/utils";
import { useHistory } from "react-router-dom";

const PublicationDetail = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { id: pId } = props.location.state;

  const [
    deletePublication,
    { error: errorDelete, data: dataDelete },
  ] = useMutation(DELETE_PUBLICATION);
  const { error, loading, isLoading, data } = useQuery(LOAD_PUBLICATION, {
    variables: { id: parseInt(pId) }, //If it still reporst undefined data, check whether variables name is matched with the ones passed in query, also ALWAYS parse numbers into int
  });
  const deleteItem = (e) => {
    if (window.confirm("Chcete opravdu smazat vybranou položku?")) {
      deletePublication({
        variables: {
          id: parseInt(pId),
        },
      })
        .catch((res) => {
          const errors = res.graphQLErrors.map((error) => {
            return error.message;
          });
        })
        .then((result) => {
          if (result.data !== null) {
            alert("Položka byla úspěšně odstraněna");
            history.push("/");
          }
        });
    }
  };

  const [createReview] = useMutation(CREATE_REVIEW);
  const [createReservation] = useMutation(CREATE_RESERVATION);
  const [textReview, setTextReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    if (sessionStorage.getItem("id") !== null) {
      e.preventDefault();
      const uId = sessionStorage.getItem("id");
      createReview({
        variables: {
          publicationId: parseInt(pId),
          text: textReview,
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
    } else {
      alert("Nejste přihlášen! Přihlaste se pro přídání recenze.");
      history.push("/login");
    }
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
        publicationId: parseInt(pId),
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
      setReviews(data.publication?.reviews);
    }
  }, [data, reviews]);

  if (isLoading || loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <>
      <Navbar />
      {data.publication ? (
        <div id="mainContent">
          <div id="content">
            <div id="image">
              <img
                src={data.publication.image?.img}
                alt="Publication Detail"
              ></img>
            </div>
            <div id="detail">
              {sessionStorage.getItem("role") === "ADMIN" && (
                <div className={classes.edit}>
                  <Link
                    className={classes.editButton}
                    to={{ pathname: "/updatePub", state: { id: pId } }}
                  >
                    <Button variant="outlined" color="primary">
                      Upravit
                    </Button>
                  </Link>
                  <Button
                    onClick={(event) => deleteItem(event)}
                    className={classes.editButton}
                    variant="outlined"
                    color="primary"
                  >
                    Smazat
                  </Button>
                </div>
              )}
              <Typography className="texts" variant="h4">
                {data.publication.name}
              </Typography>
              <Typography className="texts" variant="h6">
                {!data.publication.book?.author.name
                  ? data.publication.magazine?.issue
                  : data.publication.book?.author.name}
                {data.publication.book?.author.secondName &&
                  (data.publication.book?.author.secondName
                    ? " " +
                      data.publication.book?.author.secondName +
                      " " +
                      data.publication.book?.author.lastName
                    : " " + data.publication.book?.author.lastName)}
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
          <form onSubmit={(event) => handleSubmit(event)} id="insertReview">
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

const useStyles = makeStyles((theme) => ({
  edit: {
    display: "flex",
    justifyContent: "flex-end",
  },

  editButton: {
    marginLeft: "5px",
  },
}));
