import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import "../assets/Review.css";
import { StylesProvider, Typography } from "@material-ui/core";

const Review = (props) => {
  return (
    <StylesProvider injectFirst>
      <div className="review">
        <div id="info">
          <Typography id="user" variant="subtitle2">
            {props.user}
          </Typography>
          <Typography id="date" variant="subtitle2">
            {props.date}
          </Typography>
        </div>
        <div>
          <Typography>
            Kniha mě velmi vtáhla do svýho příběhu. Velmi podrobně a zajimavě
            jsou rozebrány události za napoleonských válek. Kniha se mi líbila,
            ale komu ne. Je to stará dobra klasika.
          </Typography>
        </div>
      </div>
    </StylesProvider>
  );
};

Review.propTypes = {};

export default Review;
