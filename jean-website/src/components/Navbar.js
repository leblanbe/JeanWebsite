import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/websitelogo.png';

function Navbar({ loggedInUser, setLoggedInUser }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock credentials (safe for demo only)
    if (email === 'jean.feerick@gmail.com' && password === 'LunaPeanut2025!') {
      setLoggedInUser(email);       // set login state globally
      setShowLoginModal(false);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);          // clear login state globally
  };

  return (
    <>
      <nav className="navbar background">
        <div className="navbar-left">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
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
          <li>
            {loggedInUser ? (
              <button className="login-btn" onClick={handleLogout}>Log out</button>
            ) : (
              <button className="login-btn" onClick={() => setShowLoginModal(true)}>Login</button>
            )}
          </li>
        </ul>
      </nav>

      {showLoginModal && (
        <div className="login-modal">
          <div className="login-content">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            <button className="close-btn" onClick={() => setShowLoginModal(false)}>X</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
