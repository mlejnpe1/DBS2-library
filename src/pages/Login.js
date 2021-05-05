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
import { useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "../assets/Form.css";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../graphql/mutations";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Alert from "@material-ui/lab/Alert";

const Login = () => {
  let history = useHistory();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [login] = useMutation(LOGIN);

  const handleSubmit = (event) => {
    event.preventDefault();
    const res = login({
      variables: {
        username: event.target[0].value,
        password: event.target[1].value,
      },
    })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => {
          return error.message;
        });
      })
      .then((returningData) => {
        if (returningData && returningData.data.login) {
          sessionStorage.setItem("role", returningData.data.login.role.name);
          sessionStorage.setItem("id", returningData.data.login.id);
          sessionStorage.setItem("username", returningData.data.login.username);
          history.push("/");
        } else {
          setErrorMessage(
            "Chyba! Špatné přihlašovací údaje, zkontrolujte své údaje."
          );
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
    <div>
      <Navbar />
      <div className="container-wrapper">
        <div className="container">
          <form onSubmit={(event) => handleSubmit(event)}>
            {errorMessage !== "" && (
              <Alert severity="error">{errorMessage}</Alert>
            )}
            <Typography
              component={"span"}
              className="h2"
              style={{ textAlign: "center" }}
              variant="h2"
            >
              Přihlašte se na svůj účet
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
              <Button
                type="submit"
                className="button"
                variant="contained"
                color="primary"
              >
                Přihlásit se
              </Button>
            </div>
          </form>
          <div className="link-wrapper">
            <Link to="/register">
              <InputLabel class="link" htmlFor="standard-adornment-password">
                <Typography component={"span"}>Ještě nemáš účet?</Typography>
              </InputLabel>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
