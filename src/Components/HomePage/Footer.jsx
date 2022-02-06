import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGooglePlusG,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const facebookClicked = () => {
  window.open("https://www.facebook.com/");
};

const twitterClicked = () => {
  window.open("https://www.twitter.com/");
};

const googlePlusClicked = () => {
  window.open("https://www.google.com/");
};

const instagramClicked = () => {
  window.open("https://www.instagram.com/");
};

const linkedInClicked = () => {
  window.open("https://www.in.linkedin.com/");
};

const githubClicked = () => {
  window.open("https://www.github.com/");
};

function Footer() {
  return (
    <div className="footer">
      {/* Footer */}
      <footer className="bg-light text-center text-white footer">
        {/* Grid container */}
        <div className="container p-4">
          {/* Section: Social media */}
          <section className="mb-4">
            {/* <!-- Facebook --> */}
            <button
              className="btn btn-primary btn-floating m-1"
              style={{
                backgroundColor: "#3b5998",
                width: "46px",
                border: "2px solid #9e2632",
              }}
              onClick={facebookClicked}
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </button>

            {/* <!-- Twitter --> */}
            <button
              className="btn btn-primary btn-floating m-1"
              style={{
                backgroundColor: "#55acee",
                border: "2px solid #9e2632",
              }}
              onClick={twitterClicked}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </button>

            {/* <!-- Google --> */}
            <button
              className="btn btn-primary btn-floating m-1"
              style={{
                backgroundColor: "#dd4b39",
                border: "2px solid #9e2632",
              }}
              onClick={googlePlusClicked}
            >
              <FontAwesomeIcon icon={faGooglePlusG} />
            </button>

            {/* <!-- Instagram --> */}
            <button
              className="btn btn-primary btn-floating m-1"
              style={{
                backgroundColor: "#ff5195",
                border: "2px solid #9e2632",
              }}
              onClick={instagramClicked}
            >
              <FontAwesomeIcon icon={faInstagram} />
            </button>

            {/* <!-- Linkedin --> */}
            <button
              className="btn btn-primary btn-floating m-1"
              style={{
                backgroundColor: "#0082ca",
                border: "2px solid #9e2632",
              }}
              onClick={linkedInClicked}
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </button>
            {/* <!-- Github --> */}
            <button
              className="btn btn-primary btn-floating m-1"
              style={{
                backgroundColor: "#333333",
                border: "2px solid #9e2632",
              }}
              onClick={githubClicked}
            >
              <FontAwesomeIcon icon={faGithub} />
            </button>
          </section>
          {/* Section: Social media */}

          {/* Section: Form */}
          <section className="">
            <form action="">
              {/* Grid row */}
              <div className="row d-flex justify-content-center">
                {/* Grid column */}
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </div>
                {/* Grid column */}

                {/* Grid column */}
                <div className="col-md-5 col-12">
                  {/* Email input */}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="form5Example21"
                      className="form-control inputBtn"
                      placeholder="name@email.com"
                      style={{
                        color: "white !important",
                        backgroundColor: "black !important",
                        border: "1px solid #ce3651",
                      }}
                    />
                    <label className="form-label" htmlFor="form5Example21">
                      Email address
                    </label>
                  </div>
                </div>
                {/* Grid column */}

                {/* Grid column */}
                <div className="col-auto">
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-outline-light mb-4 label submit__btn__footer"
                    style={{
                      color: "white !important",
                      backgroundColor: "black !important",
                      border: "1px solid #d82e4c",
                    }}
                  >
                    Subscribe
                  </button>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </form>
          </section>
          {/* Section: Form */}

          {/* Section: Text */}
          <section className="mb-4">
            <p>
              Our website application provide hygienic, contact-less, digital
              services to the Bussiness Restaurant's, Hotel's, cafe's including
              Diners with the ease of Online payment and time Efficient.
            </p>
          </section>
          {/* Section: Text */}

          {/* Section: Links */}
          <section className="">
            {/* Grid row */}
            <div className="row navigation">
              {/* Grid column */}
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase text-center">Navigation</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to="/" className="text-white links">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-white links">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-white links">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/feedback" className="text-white links">
                      Provide Us your Valuable Feedback
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to="/search" className="text-white links">
                      Search Top Cafe's
                    </Link>
                  </li>
                  <li>
                    <Link to="/diner-login" className="text-white links">
                      Customer Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/restaurant-login" className="text-white links">
                      Register Your Business Here
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link className="navbar-brand" to="/">
                      <p className="logo__text footer__text">Epicure</p>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </section>
          {/* Section: Links */}
        </div>
        {/* Grid container */}

        {/* Copyright */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:{" "}
          <Link className="text-white footer__text" to="/">
            Epicure.com
          </Link>{" "}
          <br />
          <Link className="text-white footer__text" to="/termsandservices">
            Terms And Condition related Our Privacy Policy
          </Link>
        </div>
        {/* Copyright */}

        {/* Copyright */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          Developed With 💖 By Team Epicure
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </div>
  );
}

export default Footer;
