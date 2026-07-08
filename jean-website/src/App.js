import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); // store email if logged in

  return (
    <Router>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Routes>
        <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
        <Route path="/gallery" element={<Gallery loggedInUser={loggedInUser} />} />
        <Route path="/blog" element={<Blog loggedInUser={loggedInUser} />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact loggedInUser={loggedInUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
