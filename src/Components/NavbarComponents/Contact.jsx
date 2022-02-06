import React, { useState } from "react";
import { ref, set } from "@firebase/database";
import { database } from "../../firebase";
import Alert from "../HomePage/Alert";
import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [textarea, setTextarea] = useState("");

  const [alertState, setAlertState] = useState(null);

  // SHOWALERT FUNCTION START
  const showAlert = (message, type) => {
    setAlertState({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlertState(null);
    }, 5000);
  };
  // SHOWALERT FUNCTION END

  const submitHandle = (event) => {
    event.preventDefault();

    event.target.className += " was-validated";

    // IF VALIDATION CONDITION START
    if (name && email && phone && textarea) {
      set(ref(database, `contact__us/${name}/`), {
        customer__name: name,
        customer__email: email,
        customer__phone: phone,
        customer__message: textarea,
      })
        .then(() => {
          showAlert(
            " Form Submitted, Our team will connect you soon",
            "success"
          );
          // RESET THE INPUT FIELDS TO FILL AGAIN
          document.getElementById("myForm").reset();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showAlert(" Please Fill All The Fields", "danger");
    }
  };

  return (
    <div className="contact">
      <NavBar />
      <Alert alertState={alertState} />
      <div className="containerFull">
        <div className="contact-box-1">
          <div className="leftContainer">
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  title="map"
                  className="gmap_iframe"
                  style={{ width: "100%", marginheight: "0", marginwidth: "0" }}
                  frameBorder="0"
                  allowFullScreen
                  scrolling="no"
                  src="https://maps.google.com/maps?width=600&height=400&hl=en&q=gyan ganga institute of technology and sciences jabalpur&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="rightContainer">
            <form
              id="myForm"
              className="needs-validation"
              noValidate
              onSubmit={submitHandle}
            >
              <h2 className="contactHeading">Contact Us</h2>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control inputField inputBtn"
                placeholder="Your Name"
              />
              <div className="valid-feedback">Looks good!</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="form-control inputField inputBtn"
                placeholder="Your Email"
              />
              <div className="valid-feedback">Looks good!</div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="form-control inputField inputBtn"
                placeholder="Phone"
              />
              <div className="valid-feedback">Looks good!</div>
              <textarea
                value={textarea}
                onChange={(e) => setTextarea(e.target.value)}
                placeholder="Message"
                className="form-control inputField inputBtn"
              ></textarea>
              <div className="valid-feedback">Looks good!</div>
              <button type="submit" className="sendBtn mb-4">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
