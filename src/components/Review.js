import React from "react";
import "../assets/Review.css";
import Button from "@material-ui/core/Button";
import { makeStyles, Typography } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { DEPUBLICATE } from "../graphql/mutations";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },
}));

const Review = ({ id, pId, date, text, user }) => {
  const [depublicateQuery, { loading, data }] = useMutation(DEPUBLICATE);

  var hidden = false;

  const depublicate = (e) => {
    if (window.confirm("Jste si jistí že chcete depublikovat ")) {
      e.preventDefault();
      depublicateQuery({
        variables: {
          id: parseInt(id),
        },
      });
      hidden = true;
    }
  };

  const classes = useStyles();
  return !hidden ? (
    <div key={id} className="review">
      <div id="info">
        <Typography component={"span"} id="user" variant="subtitle2">
          {user.username}
        </Typography>
        <Typography component={"span"} id="date" variant="subtitle2">
          {moment(date).format("DD. MM. YY, HH:mm:ss")}
        </Typography>
      </div>
      <div>
        <Typography component={"span"}>{text}</Typography>
      </div>
      {sessionStorage.getItem("role") === "MODERATOR" && (
        <Button
          className={classes.root}
          variant="outlined"
          onClick={(event) => depublicate(event)}
        >
          Nahlásit
        </Button>
      )}
    </div>
  ) : (
    <div key={id} className="review">
      Recenze byla Skryta
    </div>
  );
};

Review.propTypes = {};

export default Review;
