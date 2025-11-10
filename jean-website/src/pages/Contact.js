import React from 'react';
import Navbar from '../components/Navbar';
import './Contact.css';
import '../App.css';

function Contact() {
  return (
    <>
      <Navbar />
      <section className="section contact-background">
          <div className="firsthalf">
            <h1 className="text-big">Contact Me</h1>
            <p className="text-small">Hey there! Feel free to reach out if you have any questions about my experience or want me on your team. My preferred contact method is email.</p>
            <p className="text-small">
              Email: jean.feerick@gmail.com<br />
            </p>
          </div>
          <div className="secondhalf">
            <div className="contact-box">
              <h2 className="contact-header">Send Me a Message!</h2>
              <form 
                action="mailto:leblancbrynn@gmail.com" 
                method="POST" 
                encType="text/plain"
              >
                <input type="text" name="firstname" placeholder="First Name" required />
                <input type="text" name="lastname" placeholder="Last Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="text" name="subject" placeholder="Subject" required />
                <textarea name="message" placeholder="Comments" rows="5" required></textarea>
                <button type="submit" className="btn-send">Send Message</button>
              </form>
            </div>
          </div>
      </section>
    </>
  );
}

export default Contact;