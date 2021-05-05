import React, { useEffect, useState } from "react";
import "../assets/Form.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Typography, InputLabel, TextField, Button } from "@material-ui/core";
import { CREATE_PUBLISHER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";

function CreateAuthor() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [createPublisher, { error, data }] = useMutation(CREATE_PUBLISHER);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPublisher({
      variables: {
        name,
      },
    });
  };

  useEffect(() => {
    if (data) {
      history.push("/account");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="form-height container-wrapper">
        <form onSubmit={(event) => handleSubmit(event)} className="container">
          <Typography
            component={"span"}
            style={{ textAlign: "center" }}
            className="h2"
            variant="h2"
          >
            Nové vydavatelství
          </Typography>
          <div className="item">
            <InputLabel>Název</InputLabel>
            <TextField
              required
              value={name}
              className="item width"
              id="standart-basic"
              placeholder="Required*"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="button">
            <Button type="submit" variant="contained" color="primary">
              Přidat vydavatelství
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateAuthor;
