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
  NativeSelect,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import "../assets/FilterMenu.css";
import { LOAD_AUTHORS, LOAD_CATEGORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

function FillterMenu({ onFilter }) {
  const [age, setAge] = React.useState("");
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  const { error: errorCat, loading: loadingCat, data: dataCat } = useQuery(
    LOAD_CATEGORIES
  );
  const {
    error: errorAuthors,
    loading: loadingAuthors,
    data: dataAuthors,
  } = useQuery(LOAD_AUTHORS);
  const [categories, setCategories] = useState([]);

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const handleCheckChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    if (dataCat) {
      setCategories(dataCat.categories);
    }
    if (dataAuthors) {
    }
  }, [dataCat, dataAuthors]);

  if (errorCat || errorAuthors)
    return `Error! ${errorCat.message && "CategoryError:" + errorCat.message} ${
      errorAuthors.message && "CategoryError:" + errorAuthors.message
    }`;
  if (loadingCat || loadingAuthors) return "Loading...";
  return (
    <form onSubmit={(event) => onFilter(event)} className="fillter-container">
      <div className="fillter-wrapper">
        <Typography component={"span"} className="mobile-h5" variant="h5">
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
        <FormControl>
          <InputLabel htmlFor="uncontrolled-native">Authors</InputLabel>
          <NativeSelect
            inputProps={{
              name: "name",
              id: "uncontrolled-native",
            }}
          >
            <option value="0"></option>
            {dataAuthors.authors.map((author) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.name + ""}
                  {author.secondName
                    ? " " + author.secondName + " " + author.lastName
                    : " " + author.lastName}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </div>
      <div className="divider"></div>
      <div className="fillter-wrapper">
        <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
        <NativeSelect
          className="fillter-select"
          id="demo-simple-select"
          onChange={handleSelectChange}
        >
          <option value="0"></option>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </NativeSelect>
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
        <Button type="submit" id="button" variant="contained" color="primary">
          Filtrovat položky
        </Button>
      </div>
    </form>
  );
}

export default FillterMenu;
