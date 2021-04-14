import React from 'react';
import Navbar from '../home/Navbar';
import Cards from '../home/Cards';
import Footer from '../home/Footer';
import './Home.css'
import './Cards.css'
import FillterMenu from './FillterMenu';

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