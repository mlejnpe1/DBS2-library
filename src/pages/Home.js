import React from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import "../assets/Home.css";
import "../assets/Cards.css";
import FillterMenu from "../components/FilterMenu";

function Home() {
  return (
    <>
      <Navbar />
      <div className="content">
        <FillterMenu />
        <Cards />
      </div>
      <Footer />
    </>
  );
}

export default Home;
