import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './Home.css';
import '../App.css';
import '../components/Navbar.css';
import PlayImage from '../assets/gentlekatherine.png';
import logo from '../assets/websitelogo.png';
import linkedin from '../assets/linkedin.png';
import facebook from '../assets/facebook.png';

function Home() {
  return (
    <>
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
      <section className="center-text">
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
    <section className="section-contact">
        <h1 className="contact-title">Join the Conversation</h1>
        <p className="home-body white"> Whether you're a theater professional, literary scholar, student, or simply an admirer of Shakespeare's work, I'd love to hear from you. Reach out to discuss collaborations, inquiries, or share your own insights.</p>
        <div className="home-buttons">
          <Link to="/contact" className="btn-contact tan">
              Contact Jean Feerick
          </Link>
        </div>
    </section>
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

export default Home;