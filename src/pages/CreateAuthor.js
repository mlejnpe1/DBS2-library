import React, { useState, useEffect } from "react";
import "../assets/Form.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Typography, InputLabel, TextField, Button } from "@material-ui/core";
import { CREATE_AUTHOR } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";

function CreateAuthor() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [createAuthor, { error, data }] = useMutation(CREATE_AUTHOR);

  const handleSubmit = (e) => {
    e.preventDefault();
    createAuthor({
      variables: {
        name,
        secondName,
        lastName,
      },
    });
  };

  useEffect(() => {
    if (data && !error) {
      history.push("/account");
    }
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="form-height container-wrapper">
        <form onSubmit={(event) => handleSubmit(event)} className="container">
          <Typography className="h2" variant="h2">
            Nový autor
          </Typography>
          <div className="item">
            <InputLabel>Křestní jméno</InputLabel>
            <TextField
              required
              value={name}
              className="item width"
              id="standart-basic"
              placeholder="Required*"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="item">
            <InputLabel>Druhé jméno</InputLabel>
            <TextField
              value={secondName}
              className="item width"
              id="standart-basic"
              onChange={(event) => setSecondName(event.target.value)}
            />
          </div>
          <div className="item">
            <InputLabel>Příjmení</InputLabel>
            <TextField
              required
              value={lastName}
              className="item width"
              id="standart-basic"
              placeholder="Required*"
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="button">
            <Button type="submit" variant="contained" color="primary">
              Vložit autora
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateAuthor;
