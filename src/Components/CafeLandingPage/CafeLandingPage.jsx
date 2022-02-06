import React from "react";
import { useParams } from "react-router-dom";

import { get, ref } from "@firebase/database";

import "./CafeLandingPage.css";
import LiveTableRow from "./LiveTableRow";
import { database } from "../../firebase.js";

function CafeLandingPage() {
  let params = useParams();

  get(ref(database, `verified__business__profile/${params.cafe__id}`))
    .then((snapshot) => {
      console.log(snapshot.val());
      let business_name = snapshot.child("verified__business__name").val();

      let business_description = snapshot
        .child("verified__business__description")
        .val();

      let business_phone = snapshot
        .child("verified__business__contact__number")
        .val();

      let business_email = snapshot.child("verified__business__email").val();

      document.getElementById(`business_name`).innerHTML = business_name;
      document.getElementById(`business_description`).innerHTML =
        business_description;
      document.getElementById(`business_phone`).innerHTML = business_phone;
      document.getElementById(`business_email`).innerHTML = business_email;
    })
    .catch((error) => console.log(error));
  // CHECKING USER IS BUSINESS RELATED OR NOT END

  return (
    <div className="cafe__landing">
      <div className="cafe__landing__page">
        <div className="cafe__landing__page__container__2">
          <div id="business_name" className="cafe__landing__page__cafe__name">
            CHAI SHAI BAR
          </div>
          <div
            id="business_description"
            className="cafe__landing__page__cafe__description"
          >
            hello friends aao or chai shai to pike jao bhau
          </div>
          <div className="cafe__landing__page__cafe__contact__info">
            <div className="cafe__landing__page__cafe__contact__info__phone__container">
              <i className="fas fa-mobile"></i>
              <p
                id="business_phone"
                className="cafe__landing__page__cafe__contact__info__phone__text"
              >
                phone no.
              </p>
            </div>
            <div className="cafe__landing__page__cafe__contact__info__email__container">
              <i className="fas fa-envelope"></i>
              <p
                id="business_email"
                className="cafe__landing__page__cafe__contact__info__email__text"
              >
                email address
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="cafe__landing__page__live__table__status">
        <div
          className="live__table"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(137 152 170 / 22%)",
            paddingBottom: "5rem",
          }}
        >
          <div className="live__table__container" style={{ color: "white" }}>
            <div
              className="live__table__container__heading"
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "2.5rem",
                marginTop: "5rem",
              }}
            >
              <i className="fas fa-table" style={{ marginRight: "1.5rem" }}></i>
              LIVE TABLE STATUS
            </div>
            <div
              className="live__table__container__table"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "75vw",
              }}
            >
              <table className="table" style={{ color: "white" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #de3446" }}>
                    <th scope="col">S.No.</th>
                    <th scope="col">Table No.</th>
                    <th scope="col">Book Table</th>
                  </tr>
                </thead>
                <LiveTableRow id={params.cafe__id} />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CafeLandingPage;
