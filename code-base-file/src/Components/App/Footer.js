import React from 'react';

export function Footer() {
    return (
        <footer>
            <div className="container-fluid footer">
                <img
                    src="https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/98/2014/09/07214443/Signature_Center_Purple_Hex.png"
                    alt="UW Logo" className="logoImg"></img>
                <a href="mailto:ryanl32@uw.edu" className="footerText">Contact Us</a>
                <p className="footerText">&copy; Ryan Lee and Vanessa Sugiharto</p>
            </div>
        </footer>
    );
}
