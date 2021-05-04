import React from 'react';
import '../assets/Footer.css';
import { Facebook, PhotoCamera, CreditCard } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

function Footer() {

    return (
        <div className="footer-container">
            <Typography component={'span'} >Děkujeme za vaší návštěvu, brzy se vraťte!</Typography>
            <div className="footer-icon-strip">
                <Typography component={'span'} >Můžete nás podpořit níže</Typography>
                <div className="footer-divider"></div>
                <div className="footer-icons">
                    <CreditCard />
                    <Facebook />
                    <PhotoCamera />
                </div>
            </div>
        </div>
    );
}

export default Footer
