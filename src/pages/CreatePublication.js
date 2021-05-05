import React, { useState, useEffect } from "react";
import "../assets/Form.css";
import {
  Typography,
  InputLabel,
  TextField,
  Input,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { CREATE_BOOK, CREATE_MAGAZINE } from "../graphql/mutations";
import {
  LOAD_AUTHORS,
  LOAD_CATEGORIES,
  LOAD_PUBLISHERS,
} from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";

function CreatePublication() {
  const history = useHistory();
  const [createPublication] = useMutation(CREATE_BOOK);
  const [createMagazine] = useMutation(CREATE_MAGAZINE);

  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };
      //reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const [value, setValue] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [categoryItem, setCategoryItem] = useState("");
  const {
    error: categoryError,
    loading: categoryLoading,
    data: category,
  } = useQuery(LOAD_CATEGORIES);
  const [categories, setCategories] = useState([]);

  const [publisherItem, setPublisherItem] = useState("");
  const {
    error: publisherError,
    loading: publisherLoading,
    data: publish,
  } = useQuery(LOAD_PUBLISHERS);
  const [publishers, setPublishers] = useState([]);

  const [authorItem, setAuthorItem] = useState("");
  const { error: authorError, loading: authorLoading, data: author } = useQuery(
    LOAD_AUTHORS
  );
  const [authors, setAuthors] = useState([]);

  const handleRadio = (event) => {
    setValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryItem(event.target.value);
  };

  const handlePublisherChange = (event) => {
    setPublisherItem(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthorItem(event.target.value);
  };

  useEffect(() => {
    if (category) {
      setCategories(category.categories);
    }
    if (publish) {
      setPublishers(publish.publishers);
    }
    if (author) {
      setAuthors(author.authors);
    }
  }, [category, publish, author]);

  async function handleSubmit(event) {
    event.preventDefault();
    const ext = "." + event.target[3].value.split(".")[1];
    const renderedFile = await readFileAsync(event.target[3].files[0]);
    if (value === "book") {
      const res = createPublication({
        variables: {
          name: event.target[0].value,
          authorId: parseInt(event.target[10].value),
          isbn: event.target[9].value,
          publisherId: parseInt(event.target[4].value),
          img: renderedFile,
          desc: event.target[5].value,
          categoryId: parseInt(event.target[11].value),
          year: parseInt(event.target[1].value),
          fileExt: ext,
          date: new Date().toISOString(),
          quantity: parseInt(event.target[2].value),
        },
      })
        .catch((res) => {
          const errors = res.graphQLErrors.map((error) => {
            return error.message;
          });
        })
        .then((creationData) => {
          if (creationData.data !== null) {
            history.push({
              pathname: "/detail",
              state: { id: creationData.data.createBook.publication.id },
            });
          }
        });
    } else {
      const res = createMagazine({
        variables: {
          name: event.target[0].value,
          publisherId: parseInt(event.target[4].value),
          img: renderedFile,
          desc: event.target[5].value,
          issue: event.target[9].value,
          categoryId: parseInt(event.target[10].value),
          year: parseInt(event.target[1].value),
          fileExt: ext,
          date: new Date().toISOString(),
          quantity: parseInt(event.target[2].value),
        },
      })
        .catch((res) => {
          const errors = res.graphQLErrors.map((error) => {
            return error.message;
          });
        })
        .then((creationData) => {
          if (creationData.data !== null) {
            history.push({
              pathname: "/detail",
              state: { id: creationData.data.createMagazine.publication.id },
            });
          }
        });
    }
  }

  if (publisherError || categoryError || authorError)
    return `Error! ${
      publisherError.message + categoryError.message + authorError.message
    }`;
  if (publisherLoading || categoryLoading || authorLoading) return "Loading...";
  return (
    <>
      <NavBar />
      <form onSubmit={(event) => handleSubmit(event)} className="container">
        <Typography
          component={"span"}
          style={{ textAlign: "center" }}
          className="h2"
          variant="h2"
        >
          Vytváření položky
        </Typography>
        <div className="item">
          <InputLabel>Název položky</InputLabel>
          <TextField
            required
            className="item width"
            id="standart-basic"
            placeholder="Required*"
          />
        </div>
        <div className="item">
          <InputLabel>Rok Vydání</InputLabel>
          <TextField
            required
            type="number"
            className="item width"
            id="standart-basic"
            placeholder="Required*"
          />
        </div>
        <div className="item">
          <InputLabel>Počet Kusů</InputLabel>
          <TextField
            required
            type="number"
            className="item width"
            id="standart-basic"
            placeholder="Required*"
          />
        </div>
        <div className="item">
          <InputLabel>Obrázek</InputLabel>
          <Input
            className="item width"
            required
            color="primary"
            type="file"
          ></Input>
        </div>
        <div className="item">
          <InputLabel htmlFor="age-native-simple" className="item">
            Vydavatelství
          </InputLabel>
          <Select
            className="select-width"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={publisherItem}
            onChange={handlePublisherChange}
          >
            {publishers.map((publisher) => {
              return (
                <MenuItem key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="item">
          <InputLabel>Popis</InputLabel>
          <TextField
            required
            className="item width"
            multiline
            rows="4"
            color="primary"
            variant="outlined"
            placeholder="Required*"
          ></TextField>
        </div>
        <div className="item">
          <InputLabel>Typ položky</InputLabel>
          <RadioGroup
            aria-label="type"
            name="type"
            value={value}
            onChange={(event) => handleRadio(event)}
            className="item"
          >
            <FormControlLabel
              value="magazine"
              control={<Radio color="primary" />}
              label="Magazine"
            />
            <FormControlLabel
              value="book"
              control={<Radio color="primary" />}
              label="Book"
            />
          </RadioGroup>
        </div>
        {value === "book" && (
          <div className="item">
            <InputLabel>ISBN</InputLabel>
            <TextField
              required
              value={isbn}
              className="item width"
              id="standart-basic"
              placeholder="Required*"
              onChange={(event) => setIsbn(event.target.value)}
            />
          </div>
        )}
        {value === "book" && (
          <div className="item">
            <InputLabel htmlFor="age-native-simple" className="item">
              Autor
            </InputLabel>
            <Select
              className="select-width"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={authorItem}
              onChange={handleAuthorChange}
            >
              {authors.map((author) => {
                return (
                  <MenuItem key={author.id} value={author.id}>
                    {author.name}{" "}
                    {author.secondName
                      ? " " + author.secondName + " " + author.lastName
                      : " " + author.lastName}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        )}
        {value === "magazine" && (
          <div className="item">
            <InputLabel>Ročník</InputLabel>
            <TextField
              required
              className="item width"
              id="standart-basic"
              placeholder="Required*"
            ></TextField>
          </div>
        )}
        <div className="item">
          <InputLabel htmlFor="age-native-simple" className="item">
            Kategorie
          </InputLabel>
          <Select
            className="select-width"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryItem}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </Select>
        </div>
        <div className="button">
          <Button type="submit" variant="contained" color="primary">
            Vytvořit položku
          </Button>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default CreatePublication;
