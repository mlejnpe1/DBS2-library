import React, { useState } from "react";
import "../assets/Form.css"
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import {Typography, InputLabel, TextField, Button} from '@material-ui/core'; 
import { CREATE_PUBLISHER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";


function CreateAuthor() {
    const [name, setName] = useState("");
    const [createPublisher] = useMutation(CREATE_PUBLISHER);

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(name);
        const res = createPublisher({
        variables: {
            name
        },
        })
        .catch((res) => {
            const errors = res.graphQLErrors.map((error) => {
            return error.message;
            });
        })
        .then((data) => {
            console.log(data);
        });
    }

    return (
        <>
        <Navbar/>
        <div className="form-height container-wrapper">
            <form onSubmit={(event)=>
                handleSubmit(event)
                } className="container">
            <Typography className="h2" variant="h2">Nové vydavatelství</Typography>
            <div className="item">
                <InputLabel>Název</InputLabel>
                <TextField  required value={name}
                    className="item width"
                    id="standart-basic"
                    placeholder="Required*"
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="button">
                <Button type="submit" variant="contained" color="primary">Přidat vydavaterlství</Button>
            </div>
            </form>
        </div>
        <Footer/>
        </>
    )
}

export default CreateAuthor
