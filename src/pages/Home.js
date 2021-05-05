import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import "../assets/Home.css";
import FillterMenu from "../components/FilterMenu";
import { LOAD_PUBLICATIONS, FILTER_PUBLICATIONS } from "../graphql/queries";
import { useLazyQuery, useQuery } from "@apollo/client";

const getAuthorLastName = (name) => {
  if (name[0] !== "") {
    if (name.length === 3) {
      return name[2];
    } else {
      return name[1];
    }
  }
  return "";
};

function Home() {
  const [results, setResults] = useState(undefined);

  const {
    error: errorData,
    loading: loadingData,
    data,
  } = useQuery(LOAD_PUBLICATIONS, { onCompleted: setResults });

  const [
    getFilteredResults,
    { loading: loadingFilter, data: filteredResults },
  ] = useLazyQuery(FILTER_PUBLICATIONS);

  const FilterData = (e) => {
    e.preventDefault();
    const authorIndex = e.target[1].selectedIndex;
    const author = e.target[1].options[authorIndex].text.split(" ");
    const categoryIndex = e.target[2].selectedIndex;
    const category = e.target[2].options[categoryIndex].text;
    const quantity = e.target[3].value.checked === true ? 1 : 0;
    const authorLastName = getAuthorLastName(author);
    getFilteredResults({
      variables: {
        cat: category,
        name: e.target[0].value,
        authorName: author[0],
        authorLastName: authorLastName,
        qua: quantity,
      },
    });
  };

  useEffect(() => {
    if (filteredResults) {
      setResults(filteredResults);
    }
  }, [filteredResults]);

  if (errorData) return `Error while fetching data!: ${errorData.message}`;
  if (loadingData) return "Loading...";
  return (
    <>
      <Navbar />
      <div className="content">
        <FillterMenu onFilter={FilterData} />
        <Cards data={results ? results : data} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
