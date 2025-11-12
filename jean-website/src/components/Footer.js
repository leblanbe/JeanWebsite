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
    <section className = "section-footer">
            <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
            <div className="logo-text">
            <div className="logo-name">Jean Feerick</div>
            <div className="logo-title">Shakespearean Scholar</div>
            </div>
            </div>
            <section className = "social-media"> 
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
                rel="noopener noreferrer">
                  <img src={facebook} alt="facebook" className= "social-media-icon" />
                </a>
            </section>
            <section className = "vertical-list">
              
              <div className = "h1-medium">Quick Links</div> 
              
              <div className = "vertical-list-item">
              <div><Link to="/">Home</Link></div>
              </div>
              <div className = "vertical-list-item">
              <div><Link to="/about">About</Link></div>
              </div>
              <div className = "vertical-list-item">
              <div><Link to="/blog">Blog</Link></div>
              </div>
              <div className = "vertical-list-item">
              <div><Link to="/contact">Contact</Link></div>
              </div>
            </section>
            <section className = "vertical-list">
              
              <div className = "h1-medium">Resources</div> 
              
              <div className = "vertical-list-item">
                <a
                href="https://www.folger.edu/" 
                target="_blank" 
                rel="noopener noreferrer">
                  Folger Shakespeare Library
                </a>
              </div>
              <div className = "vertical-list-item">
              <a
                href="https://www.shakespearesglobe.com/" 
                target="_blank" 
                rel="noopener noreferrer">
                  Shakespeare's Globe
                </a>
              </div>
            </section>
        </section>
    </>
      );
}

export default Footer;