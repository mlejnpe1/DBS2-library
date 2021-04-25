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
        password: e.target[3].value,
      },
    })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => {
          return error.message;
        });
      })
      .then((data) => {
        console.log(data);
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
      <div className="form-height container-wrapper">
        <div className="container">
          <Typography className="h2" variant="h2">
            Create new Account
          </Typography>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="item">
              <InputLabel htmlFor="standard-adornment-password">
                User name
              </InputLabel>
              <TextField
                required
                className="item width"
                id="standart-basic"
                placeholder="Required*"
              ></TextField>
            </div>
            <div className="item">
              <InputLabel htmlFor="standard-adornment-password">
                Mail address
              </InputLabel>
              <TextField
                required
                className="item width"
                id="standart-basic"
                placeholder="Required*"
              ></TextField>
            </div>
            <div className="item">
              <InputLabel htmlFor="standard-adornment-password">
                Mail address
              </InputLabel>
              <TextField
                className="item width"
                id="standart-basic"
                placeholder="Optional*"
              ></TextField>
            </div>
            <div className="item">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                required
                className="width"
                id="standard-adornment-password"
                placeholder="Required*"
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
                Register
              </Button>
            </div>
          </form>
        </div>
        <div className="link-wrapper">
          <Link to="/login">
            <InputLabel class="link" htmlFor="standard-adornment-password">
              <Typography>Already registered ?</Typography>
            </InputLabel>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
