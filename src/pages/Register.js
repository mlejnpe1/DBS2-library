import React, { useState } from "react";
import {
  Typography,
  TextField,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "../assets/Form.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/mutations";

const Register = () => {
  let history = useHistory();
  const [register] = useMutation(REGISTER);

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = register({
      variables: {
        username: e.target[0].value,
        email: e.target[1].value,
        password: values.password,
      },
    })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => {
          return error.message;
        });
      })
      .then((data) => {
        if (data) {
          history.push("/login");
        }
      });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div className="container-wrapper">
        <div className="container">
          <form onSubmit={(event) => handleSubmit(event)}>
            <Typography
              component={"span"}
              style={{ textAlign: "center" }}
              className="h2"
              variant="h2"
            >
              Zaregistrujte se
            </Typography>
            <div className="item">
              <InputLabel htmlFor="standard-adornment-password">
                Uživatelské jméno
              </InputLabel>
              <TextField
                required
                className="item width"
                id="standart-basic"
                placeholder="Požadováno*"
              ></TextField>
            </div>
            <div className="item">
              <InputLabel htmlFor="standard-adornment-password">
                E-mailové adresa
              </InputLabel>
              <TextField
                required
                className="item width"
                id="standart-basic"
                placeholder="Požadováno*"
              ></TextField>
            </div>
            <div className="item">
              <InputLabel htmlFor="standard-adornment-password">
                Heslo
              </InputLabel>
              <Input
                required
                className="width"
                id="standard-adornment-password"
                placeholder="Požadováno*"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <div className="button">
              <Button type="submit" variant="contained" color="primary">
                Registrovat
              </Button>
            </div>
          </form>
          <div className="link-wrapper">
            <Link to="/login">
              <InputLabel class="link" htmlFor="standard-adornment-password">
                <Typography>Jste již registrován?</Typography>
              </InputLabel>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
