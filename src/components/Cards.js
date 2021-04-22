import React, { useEffect, useState } from "react";
import faker from "faker";
import { Typography } from "@material-ui/core";
import CardItem from "../components/CardItem";
import { useQuery, gql } from "@apollo/client";
import { LOAD_BOOKS, LOAD_USER } from "../graphql/queries";

function Cards() {
  const { error, loading, data } = useQuery(LOAD_BOOKS);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    if (data) {
      setPublications(data.publications);
    }
    console.log(data);
  }, [data]);
  console.log(error);

  return (
    <div className="cards">
      <Typography className="phrase-h3" variant="h3">
        Check out our book sortiment!
      </Typography>
      <div className="cards-divider"></div>
      <div className="cards-container">
        {publications.map((book) => {
          return (
            <div className="cards-items">
              <CardItem
                key={book.bookId}
                title={book.name}
                author="unknown"
                cover={faker.image.image()}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
