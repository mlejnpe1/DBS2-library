import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import "../assets/Review.css";
import { StylesProvider, Typography } from "@material-ui/core";

const Review = ({ user, date, text, id }) => {
  return (
    <StylesProvider injectFirst>
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
      </div>
    </StylesProvider>
  );
};

Review.propTypes = {};

export default Review;
