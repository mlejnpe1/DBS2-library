import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import "../assets/Home.css";
import FillterMenu from "../components/FilterMenu";
import { LOAD_PUBLICATIONS, FILTER_PUBLICATIONS } from "../graphql/queries";
import { useLazyQuery, useQuery } from "@apollo/client";

function Home() {
  const {
    error: errorData,
    loading: loadingData,
    data: publications,
  } = useQuery(LOAD_PUBLICATIONS);
  const [results, setResults] = useState({});
  const [
    getFilteredResults,
    { loading: loadingFilter, data: filteredResults },
  ] = useLazyQuery(FILTER_PUBLICATIONS);

  const FilterData = (e, filter) => {
    e.preventDefault();
    getFilteredResults({
      variables: {
        id: parseInt(filter[2].value),
        name: filter[0].value,
        authorId: parseInt(filter[1].value),
      },
    });
    setResults(filteredResults);
  };

  if (errorData) return `Error while fetching data!: ${errorData.message}`;
  if (loadingData || loadingFilter) return "Loading...";
  return (
    <>
      <Navbar />
      <div className="content">
        <FillterMenu onFilter={FilterData} />
        <Cards data={publications} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
