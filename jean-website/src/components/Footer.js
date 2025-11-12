import React from 'react';
import './Footer.css';
import '../App.css';
import logo from '../assets/websitelogo.png';
import linkedin from '../assets/linkedin.png';
import facebook from '../assets/facebook.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <section className="section-footer">

        {/* Logo + text horizontally, with icons below */}
        <div className="logo-column">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
            <div className="logo-text">
              <div className="footer-logo-name">Jean Feerick</div>
              <div className="footer-logo-title">Shakespearean Scholar</div>
            </div>
          </div>

          <div className="social-media">
            <a
              href="https://www.linkedin.com/in/jean-feerick-60313049/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" className="social-media-icon" />
            </a>
            <a
              href="https://www.facebook.com/jean.feerick.98"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="facebook" className="social-media-icon" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <section className="vertical-list">
          <div className="h1-medium-white">Quick Links</div>
          <div className="vertical-list-item">
            <Link to="/">Home</Link>
          </div>
          <div className="vertical-list-item">
            <Link to="/about">About</Link>
          </div>
          <div className="vertical-list-item">
            <Link to="/blog">Blog</Link>
          </div>
          <div className="vertical-list-item">
            <Link to="/contact">Contact</Link>
          </div>
        </section>

        {/* Resources Column */}
        <section className="vertical-list">
          <div className="h1-medium-white">Resources</div>
          <div className="vertical-list-item">
            <a
              href="https://www.folger.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Folger Shakespeare Library
            </a>
          </div>
          <div className="vertical-list-item">
            <a
              href="https://www.shakespearesglobe.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shakespeare's Globe
            </a>
          </div>
        </section>

      </section>
    </>
  );
}

export default Footer;
