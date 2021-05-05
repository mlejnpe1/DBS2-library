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
  NativeSelect,
} from "@material-ui/core";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CREATE_BOOK,
  CREATE_MAGAZINE,
  UPDATE_BOOK,
  UPDATE_MAGAZINE,
} from "../graphql/mutations";
import {
  LOAD_AUTHORS,
  LOAD_CATEGORIES,
  LOAD_PUBLICATION,
  LOAD_PUBLISHERS,
} from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Redirect } from "react-router";
import { useHistory } from "react-router";

function UpdatePublication(props) {
  const history = useHistory();
  const { id: pId } = props.location.state;
  const [updateBook] = useMutation(UPDATE_BOOK);
  const [updateMagazine] = useMutation(UPDATE_MAGAZINE);

  const { error, isLoading, loading, data } = useQuery(LOAD_PUBLICATION, {
    variables: {
      id: parseInt(pId),
    },
  });

  const [createBook] = useMutation(CREATE_BOOK);
  const [createMagazine] = useMutation(CREATE_MAGAZINE);

  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }
  const [publication, setPublication] = useState({});
  const [value, setValue] = useState("");
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
  const [isbn, setIsbn] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [issue, setIssue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [yearOfPub, setYearOfPub] = useState();

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
    if (data) {
      setPublication(data.publication);
      setAuthorItem(data?.publication.book.author.id);
      setPublisherItem(data.publication.publisherId);
      setCategoryItem(data.publication.categoryId);
      setIsbn(data.publication.book?.iSBN);
      setQuantity(data.publication.quantity);
      setName(data.publication.name);
      setYearOfPub(data.publication.yearOfPub);
      setDesc(data.publication.description);
      setIssue(data.publication.magazine?.issue);
      if (data.publication.bookId === null) {
        setValue("magazine");
      } else {
        setValue("book");
      }
    }
  }, [data, category, publish, author]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (value === "book") {
      updateBook({
        variables: {
          id: parseInt(pId),
          name: name,
          authorId: parseInt(event.target[9].value),
          isbn: isbn,
          publisherId: parseInt(event.target[4].value),
          desc: desc,
          categoryId: parseInt(event.target[10].value),
          year: yearOfPub,
          quantity: parseInt(quantity),
        },
      })
        .catch((res) => {
          const errors = res.graphQLErrors.map((error) => {
            return error.message;
          });
        })
        .then((updateData) => {
          if (updateData.data !== null) {
            console.log(updateData);
            history.push({
              pathname: "/detail",
              state: { id: updateData.data.updateBook.publication.id },
            });
          }
        });
    } else {
      updateMagazine({
        variables: {
          id: parseInt(pId),
          name: name,
          publisherId: parseInt(event.target[3].value),
          desc: desc,
          issue: issue,
          categoryId: parseInt(event.target[9].value),
          year: yearOfPub,
          quantity: parseInt(quantity),
        },
      })
        .catch((res) => {
          const errors = res.graphQLErrors.map((error) => {
            return error.message;
          });
        })
        .then((updateData) => {
          if (updateData.data !== null) {
            console.log(updateData);
            history.push({
              pathname: "/detail",
              state: { id: updateData.data.updateMagazine.publication.id },
            });
          }
        });
    }
  }

  if (publisherLoading || isLoading || categoryLoading || authorLoading)
    return "Loading...";
  if (publisherError || error || categoryError || authorError) {
    return `Error! ${
      publisherError?.message +
      categoryError?.message +
      authorError?.message +
      error?.message
    }`;
  }
  return (
    <>
      <NavBar />
      <div className="container-wrapper" style={{ height: "auto" }}>
        <form onSubmit={(event) => handleSubmit(event)} className="container">
          <Typography
            component={"span"}
            style={{ textAlign: "center" }}
            className="h2"
            variant="h2"
          >
            Úprava položky
          </Typography>
          {value === "book" && (
            <div className="item">
              <InputLabel>ISBN</InputLabel>
              <TextField
                required
                value={isbn}
                onChange={(event) => setIsbn(event.target.value)}
                className="item width"
                id="standart-basic"
                placeholder="Zadejte ISBN"
              />
            </div>
          )}
          <div className="item">
            <InputLabel>Název položky</InputLabel>
            <TextField
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="item width"
              id="standart-basic"
              placeholder="Zadejte název"
            />
          </div>
          <div className="item">
            <InputLabel>Rok Vydání</InputLabel>
            <TextField
              value={yearOfPub}
              onChange={(event) => setYearOfPub(event.target.value)}
              required
              type="number"
              className="item width"
              id="standart-basic"
              placeholder="Zadejte rok vydání"
            />
          </div>
          <div className="item">
            <InputLabel>Počet Kusů</InputLabel>
            <TextField
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              required
              type="number"
              className="item width"
              id="standart-basic"
              placeholder="Zadejte počet kusů"
            />
          </div>
          <div className="item">
            <InputLabel htmlFor="age-native-simple" className="item">
              Vydavatelství
            </InputLabel>
            <Select
              value={publisherItem}
              className="select-width"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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
              placeholder="Zadejte Popis..."
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
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
          {value !== "book" ? (
            <div className="item">
              <InputLabel>Ročník</InputLabel>
              <TextField
                required
                className="item width"
                id="standart-basic"
                placeholder="Zadejte ročník..."
                value={issue}
                onChange={(event) => setIssue(event.target.value)}
              />
            </div>
          ) : (
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
              Upravit položku
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UpdatePublication;
