import React from "react";
import aboutus1 from "../assets/aboutus1.jpg";
import aboutus2 from "../assets/aboutus2.jpg";
import aboutus3 from "../assets/aboutus3.jpg";

const AboutUsSection1 = () => {
  return (
    <div className="flex flex-col font-poppins lg:flex-row justify-between gap-10 p-6 md:p-10 mt-28 md:mt-32 max-w-7xl mx-auto">
      {/* Images Section */}
      <div className="flex gap-4 w-full lg:w-1/2">
        {/* Left two stacked images */}
        <div className="flex flex-col gap-4 w-1/2">
          <img
            src={aboutus1}
            alt="farm1"
            className="w-full h-[150px] md:h-[180px] object-cover rounded-lg shadow-md"
          />
          <img
            src={aboutus2}
            alt="farm2"
            className="w-full h-[150px] md:h-[180px] object-cover rounded-lg shadow-md"
          />
        </div>
        {/* Right single tall image */}
        <div className="w-1/2">
          <img
            src={aboutus3}
            alt="farm3"
            className="w-full h-full min-h-[310px] md:min-h-[370px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-green-800">
          What is Prakrti Farms?
        </h1>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Prakrti Farms is our vision of a healthier, more natural lifestyle.
          We grow and deliver fresh, organic, and chemical-free food—just the
          way nature intended. From farm to home, we are committed to bringing
          you pure, natural, and wholesome products that nourish your body and
          support sustainable living.
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection1;
