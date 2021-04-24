<<<<<<< HEAD
import React from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
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
import HomeButton from "../components/HomeButton";
import "../assets/Form.css";
import { Link } from "react-router-dom";
=======
import React from 'react';
import { Typography, TextField, InputLabel, Input, InputAdornment, IconButton, Button} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import HomeButton from '../components/HomeButton';
import '../assets/Form.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
>>>>>>> 658ca01b8fd3fea2e9d5e7b1e4761405ac8c26f9

const Login = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const [login] = useMutation(LOGIN);

  const handleSubmit = (event) => {
    event.preventDefault();

    const res = login({
      variables: {
        name: event.target[0].value,
        password: event.target[1].value,
      },
    })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => {
          console.log(error);
          return error.message;
        });
      })
      .then((returningData) => {
        console.log(returningData);
        if (returningData && returningData.data.login) {
          console.log(returningData);
          console.log(document.cookie);
        }
      });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

<<<<<<< HEAD
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
=======
    return (
        <>
        <Navbar/>
        <div className="height container-wrapper">
            <div className="container">
                <Typography className="h2" variant="h2">Login to your Account</Typography>
                <div className="item">
                    <InputLabel htmlFor="standard-adornment-password">User name</InputLabel>
                    <TextField required className="item width" id="standart-basic" placeholder="Required*"></TextField>
                </div>
                <div className="item">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        required
                        className="width"
                        id="standard-adornment-password"
                        placeholder="Required*"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
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
                    <Button className="button" variant="contained" color="primary">
                        Login
                    </Button>
                </div>
            </div>
            <div className="link-wrapper">
                <Link to="/register"><InputLabel class="link" htmlFor="standard-adornment-password"><Typography>Dont have account yet?</Typography></InputLabel></Link>
            </div>
        </div>
        <Footer/>
        </>
    )
}
>>>>>>> 658ca01b8fd3fea2e9d5e7b1e4761405ac8c26f9

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container-wrapper">
      <div className="container">
        <Typography className="h2" variant="h2">
          Login to your Account
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
              Login
            </Button>
          </div>
        </form>
      </div>
      <div className="link-wrapper">
        <Link to="/register">
          <InputLabel class="link" htmlFor="standard-adornment-password">
            <Typography>Dont have account yet?</Typography>
          </InputLabel>
        </Link>
      </div>
      <HomeButton />
    </div>
  );
};

export default Login;
