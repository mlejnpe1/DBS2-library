import React from 'react';
import Navbar from '../home/Navbar';
import Cards from '../home/Cards';
import Footer from '../home/Footer';
import '../assets/Home.css'
import '../assets/Cards.css'
import FillterMenu from '../home/FillterMenu';

function Home() {
  return (
    <>
      <Navbar/>
      <div className="content">
        <FillterMenu/>
        <Cards/>
      </div>
      <Footer/>
    </>
  );
}

export default Home;