import React, { useEffect, useState } from "react";
import "../assets/Form.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Typography, InputLabel, TextField, Button } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY } from "../graphql/mutations";
import { useHistory } from "react-router";

function CreateCategory() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [createCategory, { error, data }] = useMutation(CREATE_CATEGORY);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({
      variables: {
        name,
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
          <Typography
            component={"span"}
            style={{ textAlign: "center" }}
            className="h2"
            variant="h2"
          >
            Nová Kategorie
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
              Přidat Kategorii
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateCategory;
