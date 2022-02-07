import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { auth, database, signInWithEmailAndPassword } from "../../firebase.js";
import { getDatabase, get, child, ref } from "@firebase/database";
import { onAuthStateChanged, signOut } from "@firebase/auth";

import "./DinerLogin.css";
import Alert from "../HomePage/Alert";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

function BusinessLogin() {
  const [, dispatch] = useStateValue();

  const [email, setEmail] = useState("");

  const [accessToken, setAccessToken] = useState("");

  const [password, setPassword] = useState("");

  const [alertState, setAlertState] = useState(null);

  let data = [];

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

  // CHECKING USER IS BUSINESS RELATED OR NOT START
  let navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      get(
        ref(database, `registered__business/${user.uid}/${user.displayName}`)
      ).then((snapshot) => {
        var business_email = snapshot
          .child("registered__business__email")
          .val();

        if (String(user.email) === String(business_email)) {
          // USER IS RELATED TO BUSINESS, HE IS NOT A INTRUDER (;
          if (user.emailVerified !== false) {
            navigate("/businessdashboard", { replace: true });
          }
        }
      });
    }
  });
  // CHECKING USER IS BUSINESS RELATED OR NOT END

  const submitHandle = (event) => {
    event.preventDefault();

    event.target.className += " was-validated";

    // LOGIN USER FUNCTION START
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user.emailVerified !== false) {
          // Signed in
          const userId = userCredential.user.uid;

          const dbRef = ref(getDatabase());

          get(child(dbRef, `registered__business/${userId}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                snapshot.forEach((ownerName) => data.push(ownerName.val()));

                if (
                  data?.[0]?.registered__business__accesstoken === accessToken
                ) {
                  dispatch({
                    type: actionTypes.SET_BUSINESS_USER,
                    business_user: userCredential.user.uid,
                  });

                  // NAVIGATE TO ADMIN DASHBOARD PAGE
                  showAlert(
                    "You'll be redirected to Dashboard page",
                    "success"
                  );
                  changeUrl(navigate);
                } else {
                  // SIGNOUT USER FUNCTION
                  signOut(auth)
                    .then(() => {})
                    .catch((error) => console.log(error.message));
                  showAlert("Your Business Is Not Verified Till Yet", "danger");
                }
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          // SIGNOUT USER FUNCTION
          signOut(auth)
            .then(() => {})
            .catch((error) => console.log(error.message));

          // RESET THE INPUT FIELDS TO FILL AGAIN
          document.getElementById("myForm").reset();

          showAlert(
            "We've already Sent You An Account Verification Email, Please Verify It First, And Try Again",
            "danger"
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // LOGIN USER FUNCTION END
  };

  const changeUrl = (navigate) => {
    navigate("/businessdashboard", { replace: true });
  };

  return (
    <div className="businessLogin" style={{height: "100vh", }} >
      <section
        style={{ backgroundColor: "black",  }}
      >
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
                id="myForm"
                className="needs-validation"
                noValidate
                onSubmit={submitHandle}
                style={{ color: "white" }}
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
                    placeholder="Email"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                {/* Access Token */}
                <div className="form-outline mb-4">
                  <i className="fas fa-user-secret fa-lg me-3 fa-fw"></i>
                  <label className="form-label" htmlFor="accessToken">
                    Access Token
                  </label>
                  <input
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                    type="text"
                    id="accessToken"
                    className="form-control inputBtn form-control-lg"
                    placeholder="Access Token"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="form1Example23"
                    className="form-control inputBtn form-control-lg"
                    suggested="current-password"
                    placeholder="Password"
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
                      id="form1Example3"
                      required
                    />
                    <label
                      className="form-check-label rememberLabel"
                      htmlFor="form1Example3"
                    >
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                  <Link className="forgetPassword" to="/forgetPassword">
                    Forgot password ?
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
                  style={{ backgroundColor: "black" }}
                  to="/restaurant-register"
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

export default BusinessLogin;
