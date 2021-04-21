import React from 'react';
import '../assets/Footer.css';
import { Facebook, PhotoCamera, CreditCard } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

function Footer() {

    return (
        <div className="footer-container">
            <Typography>Thanks for your visitation, see you soon !</Typography>
            <div className="footer-icon-strip">
                <Typography>You can support us below</Typography>
                <div className="footer-divider"></div>
                <div className="footer-icons">
                    <a href="#"><CreditCard /></a>
                    <a href="#"><Facebook /></a>
                    <a href="#"><PhotoCamera /></a>
                </div>
            </div>
        </div>
    );
}

export default Footer
