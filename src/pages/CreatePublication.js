import React, { useState, useEffect } from "react";
import '../assets/Form.css';
import {Typography, InputLabel, TextField, Input, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Button} from '@material-ui/core';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import {LOAD_CATEGORIES, LOAD_PUBLISHERS} from '../graphql/queries';
import {useQuery } from "@apollo/client";

function CreatePublication() {
    const [value, setValue] = useState('magazine');

    const [categoryItem, setCategoryItem] = useState("");
    const { error: categoryError, loading: categoryLoading, data: category } = useQuery(LOAD_CATEGORIES);
    const [categories, setCategories] = useState([]);

    const [publisherItem, setPublisherItem] = useState("");
    const { error: publisherError, loading: publisherLoading, data: publish } = useQuery(LOAD_PUBLISHERS);
    const [publishers, setPublishers] = useState([]);

    const handleRadio = (event) => {
        setValue(event.target.value);
      };

    const handleCategoryChange = (event) => {
        setCategoryItem(event.target.value);
    };

    const handlePublisherChange = (event) =>{
        setPublisherItem(event.target.value);
    }

    useEffect(() => {
        if (category) {
            setCategories(category.categories);
        }
        if (publish){
            setPublishers(publish.publishers);
        }
        console.log(publish);
        console.log(category);
    }, [category, publish]);

    const handleSubmit = (event) =>{
        event.preventDefault();
    }

    if (publisherError || categoryError) return `Error! ${publisherError.message}`;
    if (publisherLoading || categoryLoading) return "Loading...";
    return (
        <>
        <NavBar/>
        <div className="container-wrapper">
                <form onSubmit={(event)=>
                    handleSubmit(event)

                } className="container">
                    <Typography className="h2" variant="h2">Vytváření položky</Typography>
                    <div className="item">
                        <InputLabel>ISBN</InputLabel>
                        <TextField required value="" className="item width" id="standart-basic" placeholder="Required*"/>
                    </div>
                    <div className="item">
                        <InputLabel>Jméno autora</InputLabel>
                        <TextField required value="" className="item width" id="standart-basic" placeholder="KřestníJméno DruhéJméno Příjmení"/>
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
                    <InputLabel htmlFor="age-native-simple" className="item">Vydavatelství</InputLabel>
                    <Select
                        className="select-width"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={publisherItem}
                        onChange={handlePublisherChange}
                    >
                        {publishers.map((publisher)=>{
                            return <MenuItem value={publisher.id}>{publisher.name}</MenuItem>
                        })
                    }
                    </Select>
                    </div>
                    <div className="item">
                        <InputLabel>Popis</InputLabel>
                        <TextField required className="item width" multiline rows="4" color="primary" variant="outlined" placeholder="Required*"></TextField>
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
                        value={categoryItem}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category)=>{
                            return <MenuItem value={category.id}>{category.name}</MenuItem>
                        })
                    }
                    </Select>
                    </div>
                    <div className="button">
                        <Button type="submit" variant="contained" color="primary">Vytvořit položku</Button>
                    </div>
                </form> 
        </div>
        <Footer/>
        </>
    )
}

export default CreatePublication
