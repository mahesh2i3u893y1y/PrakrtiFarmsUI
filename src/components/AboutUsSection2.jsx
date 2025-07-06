import React from "react";
import greenhouse from "../assets/greenhouse.jpg";
import research from "../assets/research.jpg";

const AboutUsSection2 = () => {
  return (
    <div className="flex flex-col lg:flex-row font-poppins justify-between md:my-10  bg-green-100  w-full px-4 md:px-10 py-10 max-w-7xl mx-auto">
      {/* Images Section */}
      <div className="w-full lg:w-[30%] flex flex-col gap-3">
        <div className="h-[200px] md:h-[250px] lg:h-[220px] ">
          <img
            src={greenhouse}
            alt="greenhouse"
            className="w-full h-full object-cover rounded-md "
          />
        </div>
        <div className="h-[200px] md:h-[250px] lg:h-[220px]">
          <img
            src={research}
            alt="research"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-[70%]  p-6 md:p-10  flex flex-col justify-center">
        <h1 className="text-4xl md:text-4xl font-bold text-green-800 mb-4 dancing-script">
          Research & Development
        </h1>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          At Prakrti Farms, we continuously invest in research and development
          to improve the quality of our products and farming practices. From
          studying natural farming techniques to enhancing nutrition in every
          drop, our R&D ensures that you receive food that’s not only pure but
          also backed by science and care.
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection2;
