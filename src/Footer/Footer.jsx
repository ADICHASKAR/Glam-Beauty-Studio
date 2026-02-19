import React from 'react'
import './Footer.css'
function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer-container">

                    <div className="footer-brand">
                        <h2>GLAM Beauty Studio</h2>
                        <p>Elegant ethnic wear for every occasion, where heritage craftsmanship meets <br/>contemporary style to create outfits that radiate charm and elegance.</p>
                    </div>
                    <div className="footer-contact">
                        <h2>Contact</h2>
                        <p>Email: glamstudio@email.com</p>
                        <p>Phone: +91 98765XXXXX</p>
                    </div>

                </div>

                <div className="footer-bottom">
                    © {new Date().getFullYear()} GLAM Beauty Studio. All Rights Reserved.
                </div>

            </footer >


        </>
    )
}

export default Footer