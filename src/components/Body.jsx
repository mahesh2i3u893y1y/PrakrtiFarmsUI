import React from "react";
import HeroSection from "./HeroSection";
import Deliver from "./Deliver";
import Navbar from "./Navbar";
import Section2 from "./Section2";
import Upcoming from "./Upcoming";
import Footer from "./Footer";
import BenefitsGrid from "./BenefitsGrid";

const Body = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Section2/>
      <Upcoming/>
      <Deliver />
      <BenefitsGrid/>
      <Footer/>
    </div>
  );
};

export default Body;
