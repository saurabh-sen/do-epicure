import React from "react";
import { Link } from "react-router-dom";

import "./About.css";
import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";

const facebookClicked = () => {
  window.open("https://www.facebook.com/");
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

function About() {
  return (
    <div className="about">
      <NavBar />

      <div className="about__container">
        <div className="container py-5">
          <div className="row h-100 align-items-center py-5">
            <div className="col-lg-6">
              <h1 className="display-4">About Epicure</h1>
              <p className="lead text-muted mb-0">
                We are students from Gyan Ganga Institute of Technology and
                Sciences Jabalpur, We are currently pursuing in Computer Science
                And Engineering 5th semester. We overcome with many software
                solutions and this is one of those, This Web-Application
                provides a simple and effective solution to Food Serving related
                problem at Cafe's/Restaurant's and Hotel's.
              </p>
              <p className="lead text-muted">
                Our Application, We Developed with 💖{" "}
                <Link to="/" className="text-muted">
                  <u className="text-light">Epicure</u>
                </Link>
              </p>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img
                src="https://bootstrapious.com/i/snippets/sn-about/illus.png"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black py-5">
        <div className="container py-5">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 order-2 order-lg-1">
              <i class="far fa-chart-bar fa-2x mb-3 text-primary"></i>
              <h2 className="font-weight-light">
                Technologies On Epicure Works
              </h2>
              <p className="font-italic text-muted mb-4">
                We work with the latest Technologies to serve best services to
                our customers, We work on React.Js Node.Js Express.Js
                Firebase-V.9, Bootstrap-5.0, Material-UI, Antdesign and many
                more.....
              </p>
              <Link
                to="/contact"
                className="btn btn-black px-5 rounded-pill shadow-sm"
              >
                Contact Us Now!!!
              </Link>
            </div>
            <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
              <img
                src="https://bootstrapious.com/i/snippets/sn-about/img-1.jpg"
                alt=""
                className="img-fluid mb-4 mb-lg-0"
              />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-5 px-5 mx-auto">
              <img
                src="https://bootstrapious.com/i/snippets/sn-about/img-2.jpg"
                alt=""
                className="img-fluid mb-4 mb-lg-0"
              />
            </div>
            <div className="col-lg-6">
              <i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
              <h2 className="font-weight-light">Fast and Mobile compatible</h2>
              <p className="font-italic text-muted mb-4">
                We provide quick responce services, because of we deploy our
                Applications on fast server's. There is no need of external
                mobile compatible application since our Web-Applications are
                Mobile responsive and small screen size compatible.
              </p>
              <Link
                to="/contact"
                className="btn btn-black px-5 rounded-pill shadow-sm"
              >
                Wanna Have A Meet!!!
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black py-5">
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col-lg-5">
              <h2 className="display-4 font-weight-light">Our team</h2>
              <p className="font-italic text-muted">Think Food, Ask Epicure.</p>
            </div>
          </div>

          <div className="row justify-content-center text-center">
            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-black rounded shadow-sm py-5 px-4 team__box">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-2">Tanishq Banger</h5>
                <h6 className="mb-2">Full Stack Developer</h6>
                <span className="small text-uppercase text-muted">
                  CEO - Founder
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <button
                      onClick={facebookClicked}
                      type="button"
                      className="social-link"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button
                      onClick={instagramClicked}
                      type="button"
                      className="social-link"
                    >
                      <i class="fab fa-instagram"></i>
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button
                      onClick={linkedInClicked}
                      type="button"
                      className="social-link"
                    >
                      <i class="fab fa-linkedin-in"></i>
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button
                      onClick={githubClicked}
                      type="button"
                      className="social-link"
                    >
                      <i class="fab fa-github"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {/* End*/}

            {/* Team item */}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-black rounded shadow-sm py-5 px-4 team__box">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-2">Saurabh Sen</h5>
                <h6 className="mb-2">Full Stack Developer</h6>
                <span className="small text-uppercase text-muted">
                  CEO - Founder
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <button
                      onClick={facebookClicked}
                      type="button"
                      className="social-link"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button
                      onClick={instagramClicked}
                      type="button"
                      className="social-link"
                    >
                      <i class="fab fa-instagram"></i>
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button
                      onClick={linkedInClicked}
                      type="button"
                      className="social-link"
                    >
                      <i class="fab fa-linkedin-in"></i>
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button
                      onClick={githubClicked}
                      type="button"
                      className="social-link"
                    >
                      <i class="fab fa-github"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {/* End */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
