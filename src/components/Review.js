import React from "react";
import "../assets/Review.css";
import Button from "@material-ui/core/Button";
import { StylesProvider, Typography } from "@material-ui/core";

const depublicate = (event, id) => {};

const Review = ({ user, date, text, id }) => {
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
        <Button key={id} onClick={(event) => depublicate(event, id)}></Button>
      </div>
  );
};

Review.propTypes = {};

export default Review;
