import React from "react";
import { NavLink } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <div className="section-padding">
        <div className="section-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="contact-form">
                <h2 className="absolute-text">Get In Touch</h2>
                <form action="#">
                  <div className="row">
                    <div className="col-md-6">
                      <input type="text" placeholder="Name*" required />
                    </div>
                    <div className="col-md-6">
                      <input type="email" placeholder="Email*" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <input type="tel" placeholder="Phone Number" required />
                    </div>
                    <div className="col-md-6">
                      <input type="date" placeholder="Date" />
                    </div>
                  </div>
                  <p>
                    <textarea
                      name="message"
                      id="message"
                      cols="30"
                      rows="10"
                      placeholder="Message"
                    ></textarea>
                  </p>
                  <p>
                    <input type="submit" value="Send Message" />
                  </p>
                </form>
              </div>
            </div>
            <div className="col-md-5">
              <div className="appointment-text">
                <h5>What we need to know:</h5>
                <ul className="list-unstyled">
                  <li>
                    <i className="fas fa-shield-alt"></i>Brief summary of your
                    problem
                  </li>
                  <li>
                    <i className="fas fa-shield-alt"></i>Your team size and
                    structure
                  </li>
                  <li>
                    <i className="fas fa-shield-alt"></i>What is your current
                    role
                  </li>
                  <li>
                    <i className="fas fa-shield-alt"></i>Why did you choose
                    Adept
                  </li>
                </ul>
                <NavLink to="#" className="boxed-btn">
                  Learn More
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
