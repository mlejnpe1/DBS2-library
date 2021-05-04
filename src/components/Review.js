import React from "react";
import "../assets/Review.css";
import Button from "@material-ui/core/Button";
import { makeStyles, Typography } from "@material-ui/core";
import { DEPUBLICATE } from "../graphql/mutations";

const depublicate = (event, id) => {};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },
}));

const Review = ({ user, date, text, id }) => {
  const [depublicateQuery] = useMutation(DEPUBLICATE);
  const classes = useStyles();
  return (
    <div key={id} className="review">
      <div id="info">
        <Typography id="user" variant="subtitle2">
          {user}
        </Typography>
        <Typography id="date" variant="subtitle2">
          {date}
        </Typography>
      </div>
      <div>
        <Typography>{text}</Typography>
      </div>
      {sessionStorage.getItem("role") === "MODERATOR" && (
        <Button
          className={classes.root}
          variant="outlined"
          key={id}
          onClick={(event) => depublicate(event, id)}
        >
          Nahlásit
        </Button>
      )}
    </div>
  );
};

Review.propTypes = {};

export default Review;
