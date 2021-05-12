import React from "react";
import "../assets/Form.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {useQuery, useMutation} from '@apollo/client';
import {LOAD_USER} from '../graphql/queries';
import {UPDATE_USER} from '../graphql/mutations';
import { Typography, InputLabel, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router";

function EditAccount() {
    const history = useHistory();
    const [updateUser] = useMutation(UPDATE_USER);
    const { error, loading, data } = useQuery(
        LOAD_USER,
        {
          variables: {
            id: parseInt(sessionStorage.getItem("id")),
          },
        }
      );

    const handleSubmit = (e) =>{
        e.preventDefault();
        updateUser({
            variables: {
                id: parseInt(sessionStorage.getItem("id")),
                username: e.target[0].value,
                email: e.target[1].value,
                telnum: e.target[2].value
            },
          })
            .catch((res) => {
              const errors = res.graphQLErrors.map((error) => {
                return error.message;
              });
            })
            .then((updateData) => {
              if (updateData.data !== null) {
                console.log(updateData);
                history.push({
                  pathname: "/account",
                  state: { id: sessionStorage.getItem("id") },
                });
              }
            });
    };
    if (error) return `Error! ${error.message}`;
    if (loading) return "Loading...";
    return (
        <>
      <Navbar />
        <form onSubmit={(event) => handleSubmit(event)} className="container">
          <Typography
            component={"span"}
            style={{ textAlign: "center" }}
            className="h2"
            variant="h2"
          >
            Upravit účet
          </Typography>
          <div className="item">
            <InputLabel>Uživatelské jméno</InputLabel>
            <TextField
              required
              defaultValue={data.user.username}
              className="item width"
              id="standart-basic"
              placeholder="Required*"
            />
          </div>
          <div className="item">
            <InputLabel>E-mail</InputLabel>
            <TextField
              required
              defaultValue={data.user.email}
              className="item width"
              id="standart-basic"
              placeholder="Required*"
            />
          </div>
          <div className="item">
            <InputLabel>Telefoní číslo</InputLabel>
            <TextField
              defaultValue={data.user.telNumber}
              className="item width"
              id="standart-basic"
              placeholder="Telefonní číslo"
            />
          </div>
          <div className="button">
            <Button type="submit" variant="contained" color="primary">
              Upravit účet
            </Button>
          </div>
        </form>
      <Footer />
    </>
    )
}

export default EditAccount;
