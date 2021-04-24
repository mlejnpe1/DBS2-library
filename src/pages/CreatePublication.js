import React, { useState, useEffect } from "react";
import '../assets/Form.css';
import {Typography, InputLabel, TextField, Input, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Button} from '@material-ui/core';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import {LOAD_CATEGORIES} from '../graphql/queries';
import {useQuery } from "@apollo/client";

function CreatePublication() {
    const [value, setValue] = useState('magazine');
    const [item, setItem] = useState("");
    const { error, loading, data } = useQuery(LOAD_CATEGORIES);
    const [categories, setCategories] = useState([]);

    const handleRadio = (event) => {
        setValue(event.target.value);
      };

    const handleSelectChange = (event) => {
    setItem(event.target.value);
    };

    useEffect(() => {
        if (data) {
            setCategories(data.categories);
        }
        console.log(data);
    }, [data]);

    if (error) return `Error! ${error.message}`;
    if (loading) return "Loading...";
    return (
        <>
        <NavBar/>
        <div className="container-wrapper">
            <div className="container">
                <form>
                    <Typography className="h2" variant="h2">Vytváření položky</Typography>
                    <div className="item">
                        <InputLabel>Jméno autora</InputLabel>
                        <TextField required className="item width" id="standart-basic" placeholder="KřestníJméno DruhéJméno Příjmení"/>
                    </div>
                    <div className="item">
                        <InputLabel>Název položky</InputLabel>
                        <TextField required className="item width" id="standart-basic" placeholder="Required*"/>
                    </div>
                    <div className="item">
                        <InputLabel>Obrázek</InputLabel>
                        <Input className="item width" required color="primary" type="file"></Input>
                    </div>
                    <div className="item">
                        <InputLabel>Popis</InputLabel>
                        <TextField required className="item width" multiline="true" rows="4" color="primary" variant="outlined" placeholder="Required*"></TextField>
                    </div>
                    <div className="item">
                        <InputLabel>Typ položky</InputLabel>
                        <RadioGroup aria-label="type" name="type" value={value} onChange={handleRadio} className="item">
                            <FormControlLabel value="magazine" control={<Radio color="primary"/>} label="Magazine" />
                            <FormControlLabel value="book" control={<Radio color="primary"/>} label="Book" />
                        </RadioGroup>
                    </div>
                    <div className="item">
                    <InputLabel htmlFor="age-native-simple" className="item">Kategorie</InputLabel>
                    <Select
                        className="select-width"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={item}
                        onChange={handleSelectChange}
                    >
                        {categories.map((category)=>{
                            return <MenuItem value={category.id}>{category.name}</MenuItem>
                        })
                    }
                    </Select>
                    </div>
                    <div className="button-wrapper">
                        <Button variant="contained" color="primary" className="item">Vytvořit položku</Button>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default CreatePublication
