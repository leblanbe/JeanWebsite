import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/websitelogo.png';

function Navbar() {
  return (
    <nav className="navbar background">
      <div className="navbar-left">
        <div className="logo-container">
          
          <div className="logo-text">
            <div className="logo-name">Jean Feerick</div>
            <div className="logo-title">Shakespearean Scholar</div>
          </div>
        </div>
      </div>

      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
