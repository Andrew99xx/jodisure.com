import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/contact">Contact Us</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms-and-condition">Terms & Conditions</Link>
        <Link to="/disclaimer">Disclaimer</Link>
        <Link to="/return">Return & Refund Policy</Link>
        <Link to="/terms-of-service">Term of Service</Link>
        <Link to="/delete-profile">Delete Profile</Link>
        <Link to="/shipping-policy">Shipping Policy</Link>
      </div>
    </footer>
  );
}

export default Footer;
