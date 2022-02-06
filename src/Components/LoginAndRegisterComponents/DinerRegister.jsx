import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
} from "@firebase/auth";
import { get, ref, set } from "@firebase/database";

import "./DinerRegister.css";
import Alert from "../HomePage/Alert";
import { auth, database } from "../../firebase";
import { useStateValue } from "../../StateProvider";

function DinerRegister() {
  const [{ table_number }] = useStateValue();

  // CHECKING USER IS DINER RELATED OR NOT START
  let navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
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

  const [dinerName, setDinerName] = useState("");

  const [dinerEmail, setDinerEmail] = useState("");

  const [dinerPassword, setDinerPassword] = useState("");

  const [dinerRepeatPassword, setDinerRepeatPassword] = useState("");

  const [alertState, setAlertState] = useState(null);

  // SHOWALERT FUNCTION START
  const showAlert = (message, type) => {
    setAlertState({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlertState(null);
    }, 10000);
  };
  // SHOWALERT FUNCTION END

  const submitHandle = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    var radioBtn = document.getElementById("form2Example3c").checked;

    if (
      dinerName &&
      dinerEmail &&
      dinerPassword === dinerRepeatPassword &&
      radioBtn
    ) {
      // CREATE USER WITH EMAIL AND PASSWORD FUNCTION START
      createUserWithEmailAndPassword(auth, dinerEmail, dinerPassword).then(
        (auth1) => {
          // IF CONDITION FOR AUTH1 PROMISE START
          if (auth1) {
            // UPDATING USER DISPLAY NAME IN PROFILE
            updateProfile(auth.currentUser, {
              displayName: `${dinerName}`,
            })
              .then(() => {})
              .catch((error) => {
                console.log(error.message);
              });

            // SEND EMAIL VERIFICATION FUNCTION START
            sendEmailVerification(auth.currentUser)
              .then(() => {})
              .catch((error) => {
                console.log(error.message);
              });
            // SEND EMAIL VERIFICATION END

            writeDinerData(
              auth.currentUser.uid,
              dinerName,
              dinerEmail,
              dinerRepeatPassword
            );
          }
        }
      );
    } else {
      showAlert(" Please Fill All The Fields", "danger");
      // RESET THE INPUT FIELDS TO FILL AGAIN
      document.getElementById("myForm").reset();
    }
  };

  const writeDinerData = (dinerUid, dinerName, dinerEmail, dinerPassword) => {
    set(ref(database, `registered__diners/${dinerUid}`), {
      registered__diner__name: dinerName,
      registered__diner__email: dinerEmail,
      registered__diner__password: dinerPassword,
      registered__diner__uid: dinerUid,
    })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="dinerRegister">
      <section style={{ backgroundColor: "black" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black"
                style={{ borderRadius: "25px", backgroundColor: "black" }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div
                      className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                      style={{ color: "white" }}
                    >
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form
                        id="myForm"
                        className="mx-1 mx-md-4 needs-validation"
                        noValidate
                        onSubmit={submitHandle}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Your Name
                            </label>
                            <input
                              value={dinerName}
                              onChange={(e) => setDinerName(e.target.value)}
                              type="text"
                              id="form3Example1c"
                              className="form-control inputBtn"
                              placeholder="Full Name"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                            <input
                              value={dinerEmail}
                              onChange={(e) => setDinerEmail(e.target.value)}
                              type="email"
                              id="form3Example3c"
                              className="form-control inputBtn"
                              placeholder="name@email.com"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                            <input
                              value={dinerPassword}
                              onChange={(e) => setDinerPassword(e.target.value)}
                              type="password"
                              id="form3Example4c"
                              className="form-control inputBtn"
                              placeholder="Your Unique Password"
                              suggested="new-password"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              Repeat your password
                            </label>
                            <input
                              value={dinerRepeatPassword}
                              onChange={(e) =>
                                setDinerRepeatPassword(e.target.value)
                              }
                              type="password"
                              id="form3Example4cd"
                              className="form-control inputBtn"
                              placeholder="Retype Your Password"
                              suggested="new-password"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2 radioBtn"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <Link
                              className="rememberLabel"
                              to="/termsandservices"
                            >
                              Terms of service
                            </Link>
                          </label>
                        </div>

                        <Alert alertState={alertState} />

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg submitBtnRegister"
                          >
                            <i className="me-2">
                              <FontAwesomeIcon icon={faUser} />
                            </i>
                            Register
                          </button>
                        </div>

                        <p className="text-center text-muted mt-5 mb-0">
                          Have already an account?{" "}
                          <Link
                            to="/diner-login"
                            className="fw-bold text-body rememberLabel"
                          >
                            <u>Login here</u>
                          </Link>
                        </p>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                        className="img-fluid"
                        alt="SampleImage"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DinerRegister;
