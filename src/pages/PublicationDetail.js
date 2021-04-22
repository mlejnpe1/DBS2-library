import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/PublicationDetail.css";

const PublicationDetail = () => {
  return (
    <>
      <Navbar />
      <div id="contentDetail">
        <div>
          <div id="image"></div>
          <div id="detail"></div>
        </div>
        <div id="reviews"></div>
      </div>
      <Footer />
    </>
  );
};

export default PublicationDetail;
