import React from 'react';
import { Typography, TextField, InputLabel, Input, InputAdornment, IconButton, Button} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import HomeButton from '../components/HomeButton';
import '../assets/Form.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

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
        <Navbar/>
            <div className="height container-wrapper">
                <div className="container">
                    <Typography className="h2" variant="h2">Create new Account</Typography>
                    <div className="item">
                        <InputLabel htmlFor="standard-adornment-password">User name</InputLabel>
                        <TextField required className="item width" id="standart-basic" placeholder="Required*"></TextField>
                    </div>
                    <div className="item">
                        <InputLabel htmlFor="standard-adornment-password">Mail address</InputLabel>
                        <TextField required className="item width" id="standart-basic" placeholder="Required*"></TextField>
                    </div>
                    <div className="item">
                        <InputLabel htmlFor="standard-adornment-password">Mail address</InputLabel>
                        <TextField className="item width" id="standart-basic" placeholder="Optional*"></TextField>
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
                            Register
                        </Button>
                    </div>
                </div>
                <div className="link-wrapper">
                    <Link to="/login"><InputLabel class="link" htmlFor="standard-adornment-password"><Typography>Already registered ?</Typography></InputLabel></Link>
                </div>
            </div>
        <Footer/>
        </>
    )
}

export default Register
