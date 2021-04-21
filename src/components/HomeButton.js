import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import '../assets/HomeButton.css';

function HomeButton() {
    return (
        <div className="home-button">
            <Link to="/"><HomeIcon fontSize="large" color="primary"/></Link>
        </div>
    )
}

export default HomeButton
