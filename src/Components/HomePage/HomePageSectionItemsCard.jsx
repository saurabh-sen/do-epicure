import React from "react";
import "./HomePageSectionItemsCard.css";

function HomePageSectionItemsCard({ image, heading, description }) {
  return (
    <div className="HomePageSection_1_items_card">
      <img src={image} alt={heading} className="item_thumbnail" />
      <div className="item_info">
        <div className="item_heading">{heading}</div>
        <div className="item_description">{description}</div>
      </div>
    </div>
  );
}

export default HomePageSectionItemsCard;
