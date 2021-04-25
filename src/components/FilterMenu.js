import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import "../assets/FilterMenu.css";
import { LOAD_CATEGORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

function FillterMenu() {
  const [age, setAge] = React.useState("");
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  const { error, loading, data } = useQuery(LOAD_CATEGORIES);
  const [categories, setCategories] = useState([]);

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const handleCheckChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
    <div className="fillter-container">
      <div className="fillter-wrapper">
        <Typography className="mobile-h5" variant="h5">
          Hledáš něco?
        </Typography>
      </div>
      <div className="fillter-wrapper">
        <div className="fields">
          <TextField
            size="small"
            id="outlined-basic"
            label="Titul"
            variant="standard"
          />
        </div>
        <div className="fields">
          <TextField
            size="small"
            id="outlined-basic"
            label="Autor"
            variant="standard"
          />
        </div>
      </div>
      <div className="divider"></div>
      <div className="fillter-wrapper">
        <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
        <Select
          className="fillter-select"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleSelectChange}
        >
          {categories.map((category) => {
            return (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            );
          })}
        </Select>
        <FormControlLabel
          id="checkbox"
          control={
            <Checkbox
              id="checkbox"
              checked={state.checkedB}
              onChange={handleCheckChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Dostupné"
        />
        <Button id="button" variant="contained" color="primary">
          Filtrovat položky
        </Button>
      </div>
    </div>
  );
}

export default FillterMenu;
