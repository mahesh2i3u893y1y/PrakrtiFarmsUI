import React from "react";
import animals from "../assets/animals.png";
import testing from "../assets/milk-testing.jpg";
import feed from "../assets/feed.png";
import delivery from "../assets/delivery.png";

const Section2 = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between  p-4 md:p-6 w-full font-poppins">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h3 className="font-bold text-2xl md:text-3xl mt-4">How we deliver?</h3>

        <p className="text-base md:text-lg">
          We are starting a healthy and eco-friendly milk delivery service. We provide fresh,
          natural & organic milk in glass bottles directly to homes.
        </p>

        <p className="text-base md:text-lg">
          Our buffaloes are not given any harmful injections or hormones. This
          helps us give pure, nutritious, and tasty milk. Unlike regular milk
          sold in plastic packets, our milk is delivered in clean, reusable
          glass bottles to keep it safe and fresh. Using glass bottles is better
          for health and helps reduce plastic waste. It also keeps the milk cool
          and tasting fresh. We make sure the milk stays fresh from our farm
          until it reaches your home.
        </p>

        <p className="text-base md:text-lg">
          Our farms protect the environment, and bring healthy milk to families —
          all in a glass bottle.
        </p>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2 p-4 mt:p-6">
        <div className="flex w-full flex-col gap-3">
          {/* Top Row */}
          <div className="flex w-full gap-3 flex-wrap justify-between">
            <img
              src={animals}
              alt="Cow"
              className="w-[33%] sm:h-40 md:h-48 lg:h-56  object-cover rounded-md animate-slide-left"
            />
            <img
              src={feed}
              alt="Feed"
              className="w-[33%] sm:h-40 md:h-48 lg:h-50 lg:mt-5 lg:mr-3 object-cover rounded-md animate-slide-right"
            />
          </div>

          {/* Bottom Row */}
          <div className="flex gap-3 flex-wrap justify-between">
            <img
              src={testing}
              alt="Testing"
              className="w-[33%] sm:h-40 md:h-48 lg:h-56 lg:ml-10 object-cover rounded-md animate-slide-up"
            />
            <img
              src={delivery}
              alt="Delivery"
              className="w-[33%] sm:h-40 md:h-48 lg:h-70 lg:w-65 lg:mr-3 object-cover rounded-md animate-slide-down"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
