import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { onAuthStateChanged, signInWithEmailAndPassword } from "@firebase/auth";
import { get, ref } from "@firebase/database";

import "./DinerLogin.css";
import { auth, database } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import Alert from "../HomePage/Alert";

function DinerLogin() {
  const [dinerEmail, setDinerEmail] = useState("");
  const [dinerPassword, setDinerPassword] = useState("");
  const [alertState, setAlertState] = useState(null);

  // SHOWALERT FUNCTION START
  const showAlert = (message, type) => {
    setAlertState({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlertState(null);
    }, 15000);
  };
  // SHOWALERT FUNCTION END

  const [{ table_number }] = useStateValue();

  // CHECKING USER IS DINER RELATED OR NOT START
  let navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      get(ref(database, `registered__diners/${user.uid}`)).then((snapshot) => {
        var diner_email = snapshot.child("registered__diner__email").val();

        if (String(user.email) === String(diner_email) && table_number) {
          navigate(`/menucard${table_number}`, { replace: true });
        } else {
          showAlert("Please Book A Table First.", "danger");
        }
      });
    }
  });
  // CHECKING USER IS DINER RELATED OR NOT END

  const submitHandle = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    // LOGIN USER FUNCTION START
    signInWithEmailAndPassword(auth, dinerEmail, dinerPassword)
      .then((userCredential) => {
        if (userCredential.user.emailVerified === false) {
          // RESET THE INPUT FIELDS TO FILL AGAIN
          document.getElementById("myForm").reset();

          showAlert(
            "We've already Sent You An Account Verification Email, Please Verify It.",
            "danger"
          );
        }
      })
      .catch((error) => {
        showAlert(
          "Your credentials does not matched, if you don't have an account then Register an account first.",
          "danger"
        );
        console.log(error);
      });
    // LOGIN USER FUNCTION END
  };

  return (
    <div className="dinerLogin">
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
              style={{ flex: "0.85" }}
            >
              <form
                className="needs-validation"
                noValidate
                onSubmit={submitHandle}
              >
                {/* Email input */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                  <input
                    value={dinerEmail}
                    onChange={(e) => setDinerEmail(e.target.value)}
                    type="email"
                    id="form1Example13"
                    className="form-control inputBtn form-control-lg"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                  <input
                    value={dinerPassword}
                    onChange={(e) => setDinerPassword(e.target.value)}
                    suggested="current-password"
                    type="password"
                    id="form1Example23"
                    className="form-control inputBtn form-control-lg"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* Checkbox */}
                  <div className="form-check">
                    <input
                      className="form-check-input radioBtn"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                      defaultChecked
                    />
                    <label
                      className="form-check-label rememberLabel"
                      htmlFor="form1Example3"
                    >
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                  <Link className="forgetPassword" to="/forgetpassword">
                    Forgot password?
                  </Link>
                </div>
                {/* ALERT COMPONENT */}
                <Alert alertState={alertState} />

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block submitBtnLogin"
                >
                  Sign in
                </button>
                <div className="divider d-flex align-items-center my-4 orText">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <Link
                  className="btn btn-primary btn-lg btn-block mb-10 signInBtn"
                  style={{
                    backgroundColor: "rgb(17 82 182 / 0%)",
                    width: "100%",
                  }}
                  to="/diner-register"
                  role="button"
                >
                  <i className="me-2">
                    <FontAwesomeIcon icon={faUser} />
                  </i>
                  Register A New Account
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DinerLogin;
