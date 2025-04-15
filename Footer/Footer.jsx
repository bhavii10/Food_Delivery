import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>your go-to destination for fast, fresh, and delicious food delivered straight to your door! We partner with top local restaurants to bring you a wide variety of cuisines, from comforting classics to exciting new flavors. Whether you're craving a quick bite or a full feast, we’ve got you covered. Our easy-to-use platform ensures a seamless ordering experience with secure payments and real-time tracking. Customer satisfaction is our priority, and we’re committed to delivering quality meals with exceptional service. Order now and enjoy great food, hassle-free!</p>                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 &copy; Tomato.com - All Rights Reserved.</p>
      
    </div>
  )
}

export default Footer
