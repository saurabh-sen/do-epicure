import React from "react";
import "./Advantages.css";
import pic from "../../images/pic_3_2.jpg";

function Advantages() {
  return (
    <div className="advantages">
      <h4 className="advantages_title">Highlighted Features</h4>
      <div className="advantages_container">
        <div className="advantages_item">
          <ul className="ul">
            <li className="li">Search Top Rated Cafe's And Restaurants.</li>
            <li className="li">Less Time And More Work, Time Efficient.</li>
            <li className="li">Reduce Work Load On Cafe's And Restaurants.</li>
            <li className="li">
              Reduces The Cost Of Attendants, Less Attendants But More
              Efficience.
            </li>
            <li className="li">
              View Live Table Vaccancy And Occupancy Status.
            </li>
            <li className="li">
              Get Your Table Book Or Change The Table At The Cafe's By Just
              Scanning QR Code
            </li>
            <li className="li">
              Digital Interactive And Gratifying Menu Card, No More Unhygienic
              Menu Cards.
            </li>
            <li className="li">Get Your Order In Minutes.</li>
            <li className="li">Pay Online Using Online Payment Gatways.</li>
          </ul>
        </div>
        <div className="advantages_img">
          <img src={pic} alt="Advantages" className="advantages_image" />
        </div>
      </div>
    </div>
  );
}

export default Advantages;
