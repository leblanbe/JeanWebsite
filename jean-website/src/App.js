import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); // store email if logged in

  return (
    <Router>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Routes>
        <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
        <Route path="/blog" element={<Blog loggedInUser={loggedInUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
