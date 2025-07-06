import React from "react";
import deliveryboy from "../assets/deliveryboy2.png";

const Deliver = () => {
  return (
    <div className="w-full py-12 md:px-6 font-poppins relative overflow-visible">
      <div className=" md:h-[400px] bg-[#e0fbfc] shadow-lg md:rounded-2xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 md:px-14 py-10 relative z-10 overflow-visible">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-5 z-20">
          <h2 className="text-4xl md:text-5xl font-bold dancing-script  ">
            Fresh Milk Delivered Daily
          </h2>
          <p className="text-lg ">
            Contact us for morning or evening delivery
          </p>
          <p className="text-lg ">
            We'll set up your account and send you a Username & Password, so you
            can start placing orders.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center relative z-10 mt-10 md:mt-0">
          <img
            src={deliveryboy}
            alt="Delivery Boy"
            className="w-full max-w-[250px] md:max-w-[320px] object-contain md:translate-x-20 md:scale-110"
          />
        </div>

      </div>

      {/* Decorative Shadow/Extension for Image Out Effect */}
      {/* <div className="hidden md:block absolute top-1/2 right-0 transform translate-y-[-50%] translate-x-[60px] w-[350px] h-[350px] bg-[#EBC66E] rounded-full blur-3xl opacity-30 z-0"></div> */}
    </div>
  );
};

export default Deliver;
