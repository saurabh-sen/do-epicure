import React, { useState } from "react";
import { auth } from "../../firebase";
import "../LoginAndRegisterComponents/DinerLogin.css";

import { sendPasswordResetEmail } from "@firebase/auth";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const submitHandle = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    sendPasswordResetEmail(auth, email)
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="businessLogin">
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="PhoneImage"
              />
            </div>
            <div
              className="col-md-7 col-lg-5 col-xl-5 offset-xl-1"
              style={{ flex: "0.85", marginTop: "30px" }}
            >
              <form
                className="needs-validation"
                noValidate
                onSubmit={submitHandle}
              >
                {/* Email input */}
                <div className="form-outline mb-4">
                  <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="form1Example13"
                    className="form-control inputBtn form-control-lg"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block submitBtnLogin"
                >
                  Reset My Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgetPassword;
