import { Typography } from "@material-ui/core";
import React from "react";

function CardItem(props) {
  return (
    <>
      <a href="#">
        <div className="cards-item-wrap">
          <img
            className="cards-item-image"
            alt="book cover"
            src={props.cover}
          />
          <div className="cards-item-info">
            <Typography variant="h5" className="cards-item-Title">
              {props.title}
            </Typography>
            <Typography
              variant="h7"
              className="cards-item-author"
              style={{ height: "50px" }}
            >
              {props.cat}
            </Typography>
          </div>
        </div>
      </a>
    </>
  );
}

export default CardItem;
