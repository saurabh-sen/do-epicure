import React from "react";
import HomePageSectionItemsCard from "./HomePageSectionItemsCard";
import "./HomePageSection.css";
import no_minimum_order from "../../images/no_minimum_order.png";
import live_table from "../../images/live_table.png";
import digital_menu_card from "../../images/digital_menu_card.png";

function HomePageSection() {
  return (
    <div className="homepagesection_1">
      <div className="homepagesection_1_items">
        <HomePageSectionItemsCard
          image={no_minimum_order}
          heading="No Minimum Orders"
          description="Order in for yourself or for the group with no restrictions on order value"
        />
        <HomePageSectionItemsCard
          image={live_table}
          heading="Live Table Status"
          description="Know which table suitable for you at all times of the cafe from your pocket"
        />
        <HomePageSectionItemsCard
          image={digital_menu_card}
          heading="Digital Menu Card"
          description="Experience epicure's hygienic food delivery at your table on time "
        />
      </div>
    </div>
  );
}

export default HomePageSection;
