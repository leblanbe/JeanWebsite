import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './Home.css';
import '../App.css';
import PlayImage from '../assets/gentlekatherine.png';

function Home() {
  return (
    <>
      <Navbar />
      <section className="section background">
        <div className="first34">
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
      <section className="center-text about-section">
      <div>
        <h1 className="about-title">About Jean Feerick</h1>
        <p className="about-subtitle">
          Scholar, Performer, and Passionate Advocate for the Bard
        </p>
      </div>
    </section>

    <section className="section-about">
      <div className="firsthalf">
      <p className="home-body">
        Jean Feerick is a dedicated Shakespearean scholar with over two decades of experience in literary analysis, theatrical performance, and academic research. Her work bridges the gap between classical interpretation and modern understanding, bringing Shakespeare's timeless themes to contemporary audiences.
      </p>
      <p className="home-body">
          Through rigorous scholarship and passionate engagement with the text, Jean has developed a unique perspective on Shakespeare's plays, sonnets, and their enduring relevance. Her insights have been featured in academic journals, theatrical productions, and literary conferences worldwide.
      </p>
      <p className="home-body">
        This portal serves as a gathering place for Jean's articles, reflections, and ongoing dialogue with fellow enthusiasts of Shakespeare's extraordinary body of work.
      </p>
      </div>
      <div className="secondhalf">
            <img src={PlayImage} className="katherine-img" />
      </div>
    </section>
    </>
  );
}

export default Home;