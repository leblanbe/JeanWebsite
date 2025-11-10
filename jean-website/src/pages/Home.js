import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <>
      <Navbar />
      <section className="section background">
        <div className="firsthalf">
          <h1 className="home-title">
            Exploring the World of Shakespeare
          </h1>
          <p className="home-body">
            Welcome to the personal portal of Jean Feerick, where classical scholarship meets contemporary insight. Journey through the timeless works of William Shakespeare with scholarly depth and theatrical passion.
          </p>
          <div className="home-buttons">
            <Link to="/blog" className="btn-blog">
              Explore Articles
            </Link>
            <Link to="/contact" className="btn-contact">
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="secondhalf">
          {/* Optionally add an image or illustration here */}
        </div>
      </section>
    </>
  );
}

export default Home;