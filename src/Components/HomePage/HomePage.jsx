import React from "react";

import Advantages from "./Advantages";
import Footer from "./Footer";
import HomePageSection from "./HomePageSection";
import NavBar from "./NavBar";

function HomePage() {
  return (
    <>
      <NavBar />
      <HomePageSection />
      <Advantages />
      <Footer />
    </>
  );
}

export default HomePage;
