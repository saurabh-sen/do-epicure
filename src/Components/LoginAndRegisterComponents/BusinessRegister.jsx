import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

import "./BusinessRegister.css";
import "./DinerRegister.css";
import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  set,
  ref,
  database,
  updateProfile,
  storage,
  reference,
} from "../../firebase";
import Alert from "../HomePage/Alert";
import { uploadBytesResumable } from "@firebase/storage";

function BusinessRegister() {
  const [progress, setProgress] = useState(0);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [ownerName, setOwnerName] = useState("");

  const [businessName, setBusinessName] = useState("");

  const [phone, setPhone] = useState("");

  const [businessAddress, setBusinessAddress] = useState("");

  const [cityName, setCityName] = useState("");

  const [tradeName, setTradeName] = useState("");

  const [businessEntityName, setBusinessEntityName] = useState("");

  const [gstRegistrationNumber, setGstRegistrationNumber] = useState("");

  const [fssaiRegistrationNumber, setFssaiRegistrationNumber] = useState("");

  const [fileKyc, setFileKyc] = useState();

  const [fileGst, setFileGst] = useState();

  const [fileFssai, setFileFssai] = useState();

  const [repeatPassword, setRepeatPassword] = useState("");

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

  // SUBMITHANDLE FUNCION START
  const submitHandle = (event) => {
    // STOPS RELOADING THE WEBPAGE
    event.preventDefault();

    // CHECKING FOR INPUT FIELD VALIDATION
    event.target.className += " was-validated";

    // REGISTER FUNCTION, SEND EMAIL VERIFICATION FUNCTION AND UPLOAD FILES FUNCTION START
    var radioBtn = document.getElementById("radioBtnBusinessRegister").checked;

    // IF VALIDATION CONDITION START
    if (
      email &&
      password &&
      radioBtn &&
      ownerName &&
      businessName &&
      phone &&
      businessAddress &&
      cityName &&
      tradeName &&
      businessEntityName &&
      gstRegistrationNumber &&
      fssaiRegistrationNumber &&
      repeatPassword &&
      password === repeatPassword
    ) {
      // CREATE USER WITH EMAIL AND PASSWORD FUNCTION START
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth1) => {
          // IF CONDITION FOR AUTH1 PROMISE START
          if (auth1) {
            // UPDATING USER PHONENUMBER IN PROFILE
            updateProfile(auth.currentUser, {
              phoneNumber: `${phone}`,
            })
              .then(() => {})
              .catch((error) => {
                console.log(error.message);
              });

            // UPDATING USER DISPLAY NAME IN PROFILE
            updateProfile(auth.currentUser, {
              displayName: `${ownerName}`,
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

            // UPLOAD FILES TO FIREBASE STORAGE START
            uploadFiles(fileKyc, auth.currentUser.uid);
            uploadFiles(fileGst, auth.currentUser.uid);
            uploadFiles(fileFssai, auth.currentUser.uid);
            // UPLOAD FILES TO FIREBASE STORAGE END

            // SHOW ALERTS AFTER SUCCESSFULLY SUBMIT OF APPLICATION FOR REGISTRATION
            //SHOWALERT FUNCION START
            showAlert(
              "Successfully submited the application for your Business Registration on Epicure",
              "success"
            );

            // JAVASCRIPT ALERT FUNCTION START
            alert(
              "A verification link has been sent to Your Email, Please Verify it."
            );
            alert(
              "We will reach you soon only if your all submitted documents are verfied by Epicure's verification process with an email consists of your secret credentials (UserId, Email, Password) which will you can further use for accessing Your Registered Business Profile Dashboard along with a unique QR code for your customers. ThankYou for registering."
            );
            // JAVASCRIPT ALERT FUNCTION END

            //generates random uuid;
            let guid = () => {
              let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
              };
              //return id of format 'aaaaaaaa'
              return s4() + "-" + s4();
            };

            // AUTH ACCESS TOKEN GENERATED BY BACKEND FOR BUSINESS REGISTERATION AFTER VERIFICATION
            var uuid = guid();
            // EXAMPLE UUID : "c218-1edf"

            // CALLING WIRTEUESRDATA FUNCTION TO STORE USER INFORMATION TO FIREBASE REALTIME DATABASE START
            writeUserData(
              auth.currentUser.uid,
              email,
              password,
              ownerName,
              businessName,
              phone,
              businessAddress,
              cityName,
              tradeName,
              businessEntityName,
              gstRegistrationNumber,
              fssaiRegistrationNumber,
              uuid
            );
            // CALLING WIRTEUESRDATA FUNCTION TO STORE USER INFORMATION TO FIREBASE REALTIME DATABASE END

            // SIGNOUT USER FUNCTION
            signOut(auth)
              .then(() => {})
              .catch((error) => console.log(error.message));
          }
          // IF CONDITION FOR AUTH1 PROMISE END
        })
        .catch((error) => console.log(error.message));
    } else {
      showAlert(" Please Fill All The Fields", "danger");
    }
    // IF ELSE VALIDATION CONDITION END
  };
  // SUBMITHANDLE FUNCTION END

  // UPLOADFILES FUNCTION DEFINATION START
  const uploadFiles = (file, userId) => {
    // IF CONDITION FOR FILES === NULL START
    if (!file && !userId) return;
    // IF CONDITION FOR FILES === NULL END

    // CREATING A STORAGE REFERENCE
    const storageRef = reference(
      storage,
      `/DocumentsForVerification/${userId}/${file.name}`
    );

    // UPLOADING FILES WITH RESUMABLE FEATURES
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error)
    );
  };
  // UPLOADFILES FUNCTION DEFINATION END

  function writeUserData(
    userId,
    email,
    password,
    ownerName,
    businessName,
    phone,
    businessAddress,
    cityName,
    tradeName,
    businessEntityName,
    gstRegistrationNumber,
    fssaiRegistrationNumber,
    uuid
  ) {
    set(ref(database, `registered__business/${userId}/${ownerName}/`), {
      registered__business__email: email,
      registered__business__password: password,
      registered__business__ownername: ownerName,
      registered__business__businessname: businessName,
      registered__business__phone: phone,
      registered__business__businessaddress: businessAddress,
      registered__business__cityname: cityName,
      registered__business__tradename: tradeName,
      registered__business__businessentityname: businessEntityName,
      registered__business__gstregistrationnumber: gstRegistrationNumber,
      registered__business__fssairegistrationnumber: fssaiRegistrationNumber,
      registered__business__accesstoken: uuid,
    })
      .then(() => {
        // RESET THE INPUT FIELDS TO FILL AGAIN
        document.getElementById("myForm").reset();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="businessRegister">
      <section className="vh-auto" style={{ backgroundColor: "black" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-white"
                style={{ borderRadius: "25px", backgroundColor: "black" }}
              >
                <div className="card-body p-md-5">
                  <div
                    className="row justify-content-center"
                    style={{ display: "flex", flexDirection: "column-reverse" }}
                  >
                    <div
                      className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                      style={{ width: "100vw" }}
                    >
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Register Your Business
                      </p>

                      <form
                        id="myForm"
                        className="mx-1 mx-md-4 needs-validation"
                        // noValidate
                        onSubmit={submitHandle}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw fab__icon"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Business Owner Name
                            </label>
                            <input
                              value={ownerName}
                              onChange={(e) => setOwnerName(e.target.value)}
                              type="text"
                              id="form3Example1c"
                              className="form-control inputBtn"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-utensils fa-lg me-3 fa-fw fab__icon"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example2c"
                            >
                              Restaurant/Cafe/Hotel Name
                            </label>
                            <input
                              value={businessName}
                              onChange={(e) => setBusinessName(e.target.value)}
                              type="text"
                              id="form3Example2c"
                              className="form-control inputBtn"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-mobile-alt fa-lg me-3 fa-fw fab__icon"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Contact Number Of Business Owner
                            </label>
                            <input
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              type="phone"
                              id="form3Example3c"
                              className="form-control inputBtn"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw fab__icon"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Your Email
                            </label>
                            <input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              type="email"
                              id="form3Example4c"
                              className="form-control inputBtn required"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-map-marker-alt fa-lg me-3 fa-fw fab__icon"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example5c"
                            >
                              Your Business Address
                            </label>
                            <input
                              value={businessAddress}
                              onChange={(e) =>
                                setBusinessAddress(e.target.value)
                              }
                              type="text"
                              id="form3Example5c"
                              className="form-control inputBtn"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-city fa-lg me-3 fa-fw fab__icon"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example6c"
                            >
                              city
                            </label>
                            <input
                              value={cityName}
                              onChange={(e) => setCityName(e.target.value)}
                              type="text"
                              id="form3Example6c"
                              className="form-control inputBtn"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-business-time fa-lg me-3 fa-fw fab__icon"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example7c"
                            >
                              Trade Name(A registered and legal name for your
                              business)
                            </label>
                            <input
                              value={tradeName}
                              onChange={(e) => setTradeName(e.target.value)}
                              type="text"
                              id="form3Example7c"
                              className="form-control inputBtn"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="far fa-thumbs-up fa-lg fa-fw fab__icon"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example8c"
                            >
                              Business Entity Name(Type of your business)
                            </label>
                            <input
                              value={businessEntityName}
                              onChange={(e) =>
                                setBusinessEntityName(e.target.value)
                              }
                              type="text"
                              id="form3Example8c"
                              className="form-control inputBtn"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="far fa-registered fa-lg me-3 fa-fw fab__icon"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example9c"
                            >
                              GST Registration Number(15 Digit Number)
                            </label>
                            <input
                              value={gstRegistrationNumber}
                              onChange={(e) =>
                                setGstRegistrationNumber(e.target.value)
                              }
                              placeholder="A 15 Digit Fssai Registration Number"
                              minLength="15"
                              maxLength="15"
                              type="text"
                              id="form3Example9c"
                              className="form-control inputBtn"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-registered fa-lg me-3 fa-fw fab__icon"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example10c"
                            >
                              FSSAI Registration Number(14 Digit Number)
                            </label>
                            <input
                              value={fssaiRegistrationNumber}
                              onChange={(e) =>
                                setFssaiRegistrationNumber(e.target.value)
                              }
                              placeholder="A 14 Digit Fssai Registration Number"
                              minLength="99999999999999"
                              maxLength="99999999999999"
                              type="text"
                              id="form3Example10c"
                              className="form-control inputBtn"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <hr className="mx-n3" />

                        <div className="row align-items-center py-3">
                          <div style={{ width: "auto", marginBottom: "8px" }}>
                            <i className="far fa-address-card fa-lg me-3 fa-fw"></i>
                          </div>
                          <div className="col-md-7 mb-2">
                            <h6 className="mb-0">
                              Upload KYC{" "}
                              {
                                " (Aadhar Card/ Pan Card/ Driving License) *format supported - PDF, JPEG, JPG "
                              }
                            </h6>
                          </div>
                          <div className="col-md-9 pe-5">
                            <input
                              onChange={(e) => setFileKyc(e.target.files[0])}
                              className="form-control form-control-lg"
                              id="formFileLg"
                              type="file"
                              accept=".pdf,.jpeg,.jpg"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>

                            <div className="small text-muted mt-2">
                              Upload your EKYC file. Max file size 10 MB
                              <h2>uploaded done {`${progress} %`}</h2>
                            </div>
                          </div>
                        </div>

                        <hr className="mx-n3" />

                        <div className="row align-items-center py-3">
                          <div style={{ width: "auto", marginBottom: "8px" }}>
                            <i className="fas fa-certificate fa-lg me-3 fa-fw"></i>
                          </div>
                          <div className="col-md-7">
                            <h6 className="mb-0">
                              Upload GST Certificate{" "}
                              {" (format supported - PDF, JPEG, JPG) "}
                            </h6>
                          </div>
                          <div className="col-md-9 pe-5">
                            <input
                              onChange={(e) => setFileGst(e.target.files[0])}
                              className="form-control form-control-lg"
                              id="formFileLg1"
                              type="file"
                              accept=".pdf,.jpeg,.jpg"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>

                            <div className="small text-muted mt-2">
                              Upload your Certificate file. Max file size 10 MB
                              <h2>uploaded done {`${progress} %`}</h2>
                            </div>
                          </div>
                        </div>

                        <hr className="mx-n3" />

                        <div className="row align-items-center py-3">
                          <div style={{ width: "auto", marginBottom: "8px" }}>
                            <i className="fas fa-certificate fa-lg me-3 fa-fw"></i>
                          </div>
                          <div className="col-md-7 ">
                            <h6 className="mb-0">
                              Upload FSSAI Certificate{" "}
                              {" (format supported - PDF, JPEG, JPG) "}
                            </h6>
                          </div>
                          <div className="col-md-9 pe-5">
                            <input
                              onChange={(e) => setFileFssai(e.target.files[0])}
                              className="form-control form-control-lg"
                              id="formFileLg2"
                              type="file"
                              accept=".pdf,.jpeg,.jpg"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="small text-muted mt-2">
                              Upload your Certificate file. Max file size 10 MB
                              <h2>uploaded done {`${progress} %`}</h2>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw fab__icon"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example11c"
                            >
                              Password
                            </label>
                            <input
                              value={password}
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                              type="password"
                              placeholder="Password Must be of minimum 8 character and consists of *1#a$b2%"
                              id="form3Example11c"
                              className="form-control inputBtn required"
                              autoComplete="new-password"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw fab__icon"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example11cd"
                            >
                              Repeat your password
                            </label>
                            <input
                              value={repeatPassword}
                              onChange={(e) =>
                                setRepeatPassword(e.target.value)
                              }
                              type="password"
                              placeholder="repeat your password"
                              id="form3Example11cd"
                              className="form-control inputBtn"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2 radioBtn"
                            type="checkbox"
                            id="radioBtnBusinessRegister"
                            required
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
                            to="/restaurant-login"
                            className="fw-bold text-body rememberLabel"
                          >
                            <u>Login here</u>
                          </Link>
                        </p>
                      </form>
                    </div>
                    <div
                      className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                      style={{ width: "100vw" }}
                    >
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

export default BusinessRegister;
