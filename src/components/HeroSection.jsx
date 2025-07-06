import React from "react";
import { GiMilkCarton, GiChemicalDrop, GiWaterDrop } from "react-icons/gi";
import { MdOutlineFactory } from "react-icons/md";
// import portalImg from "../assets/bottleglass.png";
import backgroundImg from "../assets/village.jpg";

// Dummy background image
// const backgroundImg = "https://via.placeholder.com/800x600?text=Glass+Milk+BG";

const HeroSection = () => {
  return (
    <div className="relative font-poppins mt-26 md:mt-34 md:rounded-3xl h-[80vh] md:h-[80vh] w-full md:w-[90%] mx-auto  ">
      {/* Background image with glass effect */}
      <div
        className="absolute inset-0 bg-cover bg-center md:rounded-3xl "
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      ></div>

      {/* Overlay blur/glassy effect layer */}
      {/* <div className="absolute   z-10"></div> */}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col  max-w-7xl mx-auto px-6 h-full">
        {/* Text section */}

        <h2 className="text-3xl md:text-5xl font-bold mt-5 dancing-script">
          Pure Natural & Organic Milk
        </h2>
        <p className="text-[16px] md:text-[18px] mt-4 md:w-[60%]">
          Our milk is 100% pure and natural — free from preservatives,
          unprocessed, chemical-free, and additive-free. It is delivered in its
          most authentic form, without any artificial hormones, synthetic
          flavors, or harmful additives, ensuring that you and your family enjoy
          fresh, wholesome milk just as nature intended.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
