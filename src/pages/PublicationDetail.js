import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Review from "../components/Review";
import DatePicker from "../components/DatePicker";
import { LOAD_PUBLICATION } from "../graphql/queries";
import { CREATE_REVIEW, DELETE_PUBLICATION } from "../graphql/mutations";
import { Typography, Button, TextField, makeStyles } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import "../assets/PublicationDetail.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const authorName = (p) => {
  if (p.book) {
    var string = p.book.author.name + " ";
    if (p.book.author.secondName !== null) {
      string += p.book.author.secondName + " " + p.book.author.lastName;
    } else {
      string += " " + p.book.author.lastName;
    }
    return string;
  }
  return p.magazine.issue;
};

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
  const [textReview, setTextReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    if (sessionStorage.getItem("id") !== null) {
      e.preventDefault();
      const uId = parseInt(sessionStorage.getItem("id"));
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
          if (reviews.length !== 0) {
            setReviews([...data.publication.reviews, review.data.createReview]);
          } else {
            setReviews([review.data.createReview]);
          }
        });
    } else {
      alert("Nejste přihlášen! Přihlaste se pro přídání recenze.");
      history.push("/login");
    }
  };

  useEffect(() => {
    if (data) {
      setReviews(data.publication?.reviews);
    }
  }, [data]);

  const isLoggedIn = () => {
    if (sessionStorage.getItem("username") !== null) {
      return <DatePicker pId={pId} />;
    }
  };

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
              <Typography component={"span"} className="texts" variant="h4">
                {data.publication.name}
              </Typography>
              <Typography component={"span"} className="texts" variant="h6">
                {authorName(data.publication)}
              </Typography>
              <Typography component={"span"} className="texts" variant="body1">
                {data.publication.description}
              </Typography>
              {isLoggedIn()}
            </div>
          </div>
          <Typography component={"span"} variant="h4">
            Recenze
          </Typography>
          <div id="reviews">
            {reviews.length > 0 ? (
              reviews.map((review) => {
                if (review.depublication === false) {
                  return (
                    <Review
                      key={review.id}
                      id={review.id}
                      pId={pId}
                      date={review.creationDate}
                      text={review.text}
                      user={review.user}
                    />
                  );
                }
                return null;
              })
            ) : (
              <Typography
                component={"span"}
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
            ;
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
