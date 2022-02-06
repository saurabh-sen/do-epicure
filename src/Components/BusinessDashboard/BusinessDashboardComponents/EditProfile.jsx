import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uploadBytesResumable } from "@firebase/storage";
import {
  set,
  ref,
  reference,
  database,
  storage,
  auth,
} from "../../../firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { get } from "@firebase/database";

import "./EditProfile.css";
import { useStateValue } from "../../../StateProvider";
import Alert from "../../HomePage/Alert";

function EditProfile() {
  const [{ business_user }] = useStateValue();

  const [progress, setProgress] = useState(0);

  const [businessName, setBusinessName] = useState("");

  const [businessDescription, setBusinessDescription] = useState("");

  const [businessEmail, setBusinessEmail] = useState("");

  const [businessContactNumber, setBusinessContactNumber] = useState("");

  const [businessAddress, setBusinessAddress] = useState("");

  const [businessSpecialItem, setBusinessSpecialItem] = useState("");

  const [businessTotalTables, setBusinessTotalTables] = useState("");

  const [businessFilePic1, setBusinessFilePic1] = useState();

  const [businessFilePic2, setBusinessFilePic2] = useState();

  const [alertState, setAlertState] = useState(null);

  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        get(
          ref(database, `registered__business/${user.uid}/${user.displayName}`)
        ).then((snapshot) => {
          var business_email = snapshot
            .child("registered__business__email")
            .val();

          if (
            String(user.email) === String(business_email) &&
            user.emailVerified !== false
          ) {
            // USER IS RELATED TO BUSINESS, HE IS NOT A INTRUDER (;
          } else {
            navigate("/restaurant-login", { replace: true });
          }
        });
      } else {
        navigate("/restaurant-login", { replace: true });
      }
    });
  }, [navigate]);

  // SUBMITHANDLE FUNCION START
  const submitHandle = (event) => {
    // STOPS RELOADING THE WEBPAGE
    event.preventDefault();

    // CHECKING FOR INPUT FIELD VALIDATION
    event.target.className += " was-validated";

    // IF FORM VALIDATION CONDITION STARTS
    if (
      business_user &&
      businessName &&
      businessDescription &&
      businessEmail &&
      businessContactNumber &&
      businessAddress &&
      businessSpecialItem &&
      businessTotalTables &&
      businessFilePic1 &&
      businessFilePic2
    ) {
      writeUserData(
        business_user,
        businessName,
        businessDescription,
        businessEmail,
        businessContactNumber,
        businessAddress,
        businessSpecialItem,
        businessTotalTables
      );
      uploadFiles(businessFilePic1, business_user);
      uploadFiles(businessFilePic2, business_user);
      showAlert(
        " Your Information Has Been Succussfully Saved In Server",
        "success"
      );
    } else {
      showAlert(" Please Fill All Input Fields", "danger");
    }
  };
  // SUBMITHANDLE FUNCION END

  // WRITE DATA IN FIREBASE REAL TIME DATABASE
  const writeUserData = (
    userId,
    businessName,
    businessDescription,
    businessEmail,
    businessContactNumber,
    businessAddress,
    businessSpecialItem
  ) => {
    // SET FUNCTION OVERWRITES THE INFORMATION AT GIVEN ADDRESS, IF NO DATA FOUND THEN IT WILL DO WRITE ONLY
    set(ref(database, "verified__business__profile/" + userId), {
      verified__business__name: businessName,
      verified__business__email: businessEmail,
      verified__business__contact__number: businessContactNumber,
      verified__business__address: businessAddress,
      verified__business__special__item: businessSpecialItem,
      verified__business__description: businessDescription,
      verified__business__total__tables: businessTotalTables,
      verified__business__key: userId,
    })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  // UPLOADFILES FUNCTION DEFINATION START
  const uploadFiles = (file, userId) => {
    // IF CONDITION FOR FILES === NULL START
    if (!file && !userId) return;
    // IF CONDITION FOR FILES === NULL END

    // CREATING A STORAGE REFERENCE
    const storageRef = reference(
      storage,
      `/verified__business__profile__pictures/${userId}/${file.name}`
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

    // RESET THE INPUT FIELDS TO FILL AGAIN
    document.getElementById("myForm").reset();
  };
  // UPLOADFILES FUNCTION DEFINATION END

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

  return (
    <div className=" rounded bg-black editProfileContainer">
      <div className="row">
        <div className="col-md-8" style={{ width: "91vw" }}>
          <form
            id="myForm"
            className="p-3 py-5 needs-validation"
            onSubmit={submitHandle}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link
                className="d-flex flex-row align-items-center"
                to="/businessdashboard"
                style={{ color: "white" }}
              >
                <i className="fa fa-long-arrow-alt-left mr-1 mb-1"></i>
                <h6>Back To Dashboard</h6>
              </Link>
              <div className="d-flex flex-row align-items-center">
                <i className="fas fa-edit mr-1 mb-1"></i>
                <h6 className="text-right">Edit Your Business Profile</h6>
              </div>
            </div>
            <hr />
            <div className="row mt-2">
              <div className="col-md-6">
                <i className="fas fa-signature fa-lg me-3 fa-fw"></i>
                <label className="form-label" htmlFor="businessName">
                  Your Business Name
                </label>
                <input
                  value={businessName}
                  onChange={(e) =>
                    setBusinessName(e.target.value.toLowerCase())
                  }
                  type="text"
                  className="form-control inputBtnEditProfile"
                  placeholder="Your Business Name"
                  id="businessName"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-md-6">
                <i className="fas fa-pencil-alt fa-lg me-3 fa-fw"></i>
                <label className="form-label" htmlFor="description">
                  Write a short description about your business
                </label>
                <input
                  value={businessDescription}
                  onChange={(e) =>
                    setBusinessDescription(e.target.value.toLowerCase())
                  }
                  type="text"
                  className="form-control inputBtnEditProfile"
                  id="description"
                  placeholder="Describe Business In One Sentence"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <i className="fas fa-at fa-lg me-3 fa-fw"></i>
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  value={businessEmail}
                  onChange={(e) =>
                    setBusinessEmail(e.target.value.toLowerCase())
                  }
                  type="email"
                  id="email"
                  className="form-control inputBtnEditProfile"
                  placeholder="name@email.com"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-md-6">
                <i className="fas fa-mobile-alt fa-lg me-3 fa-fw"></i>
                <label className="form-label" htmlFor="contact">
                  Contact Number
                </label>
                <input
                  value={businessContactNumber}
                  onChange={(e) =>
                    setBusinessContactNumber(e.target.value.toLowerCase())
                  }
                  type="phone"
                  id="contact"
                  className="form-control inputBtnEditProfile"
                  placeholder="Business Contact Number"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <i className="fas fa-map-marker-alt fa-lg me-3 fa-fw"></i>
                <label className="form-label" htmlFor="address">
                  Your Business Address
                </label>
                <input
                  value={businessAddress}
                  onChange={(e) =>
                    setBusinessAddress(e.target.value.toLowerCase())
                  }
                  type="text"
                  className="form-control inputBtnEditProfile"
                  id="address"
                  placeholder="Address"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-md-6">
                <i className="fas fa-magic fa-lg me-3 fa-fw"></i>
                <label className="form-label" htmlFor="specialItem">
                  Your Business Special
                </label>
                <input
                  value={businessSpecialItem}
                  onChange={(e) =>
                    setBusinessSpecialItem(e.target.value.toLowerCase())
                  }
                  type="text"
                  className="form-control inputBtnEditProfile"
                  id="specialItem"
                  placeholder="Business Special Item"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <i className="fas fa-chair fa-lg me-3 fa-fw"></i>
                <label className="form-label" htmlFor="tables">
                  Total Number Of Tables
                </label>
                <input
                  value={businessTotalTables}
                  onChange={(e) => setBusinessTotalTables(e.target.value)}
                  type="number"
                  className="form-control inputBtnEditProfile"
                  id="tables"
                  placeholder="Total Tables"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <i className="fas fa-images fa-lg me-3 fa-fw"></i>
                <label className="form-label" htmlFor="pic1">
                  Upload Your Picture For Your Business
                </label>
                <input
                  onChange={(e) => setBusinessFilePic1(e.target.files[0])}
                  type="file"
                  id="pic1"
                  className="form-control inputBtnEditProfile"
                  accept=".jpeg,.jpg"
                  required
                />
                <div className="small text-muted mt-2">
                  Max Image size 10 MB and format supported are JPEG, JPG
                  <h2>uploaded done {`${progress} %`}</h2>
                </div>
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-md-6">
                <i className="fas fa-images fa-lg me-3 fa-fw"></i>
                <label className="form-label" htmlFor="pic2">
                  Upload Your Second Picture For Your Business
                </label>
                <input
                  onChange={(e) => setBusinessFilePic2(e.target.files[0])}
                  type="file"
                  id="pic2"
                  className="form-control inputBtnEditProfile"
                  accept=".jpeg,.jpg"
                  required
                />
                <div className="small text-muted mt-2">
                  Max file size 10 MB and format supported are JPEG, JPG
                  <h2>uploaded done {`${progress} %`}</h2>
                </div>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
            <Alert alertState={alertState} />
            <div className="mt-5 text-right">
              <button className="btn profile-button" type="submit">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
