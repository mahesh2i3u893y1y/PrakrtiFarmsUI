import React from "react";
import vegetables from "../assets/vegetables.png";
import mushroom from "../assets/mushrooms.png";
import honey from "../assets/honey.png";
import eggs from "../assets/eggs.png";
import panner from "../assets/paneer.png";
import ghee from "../assets/ghee.png";
import oil from "../assets/oil.png";
import grains from "../assets/grains-removebg-preview.png";

const products = [
  { name: "Honey", image: honey },
  { name: "Millets", image: grains },
  { name: "Mushroom", image: mushroom },
  { name: "Vegetables", image: vegetables },
  { name: "Cooking Oil", image: oil },
  { name: "Paneer", image: panner },
  { name: "Ghee", image: ghee },
  { name: "Country Eggs", image: eggs },
];

const Upcoming = () => {
  return (
    <div className="p-4 md:p-6 font-poppins">
      {/* Heading & Description */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Upcoming from Prakrti Farms
        </h1>
        <p className="text-base md:text-lg">
          Naturally Expanding, Organically Evolving. We’re just getting started.
          While we currently offer pure, organic milk, our vision reaches
          further. Soon, Prakrti Farms will bring you a wholesome range of
          natural products — all crafted with purity, health, and sustainability
          in mind.
        </p>
      </div>

      {/* Product Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 
               w-[80%] mx-auto sm:w-full"
          >
            <div className="relative bg-white flex items-center justify-center h-40 sm:h-48 md:h-52 lg:h-56">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-2"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow">
                Organic
              </div>
            </div>
            <div className="p-3 text-center">
              <h3 className="text-base sm:text-lg font-semibold">
                {product.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
