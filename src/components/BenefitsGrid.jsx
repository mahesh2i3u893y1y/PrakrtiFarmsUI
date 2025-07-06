import React from "react";
import organic from "../assets/organic.png"
import chemistry from "../assets/chemistry.png"
import nongmo from "../assets/non-gmo.png"
import nopreservaties from "../assets/nopreservaties.png"

const features = [
  {
    icon: <img src={nongmo} alt="nongmo" className="w-10 h-10 text-green-700" />,
    title: "nonGMO",
    desc: "Non-GMO food means its DNA hasn’t been artificially changed in a lab to add traits that don’t occur naturally.",
  },
  {
    icon:  <img src={chemistry} className="w-10 h-10 text-green-700" />,
    title: "chemical free",
    desc: "People see “chemical-free” as safer for health and nature, so they prefer natural, organic, or non-toxic alternatives.",
  },
  {
    icon:  <img src={nopreservaties} className="w-10 h-10 text-green-700" />,
    title: "no antibiotics",
    desc: "Animals weren’t given medicines to prevent or treat illness, making the food more natural and healthier."
  },
  {
    icon: <img src={organic} className="w-10 h-10 text-green-700" />,
    title: "organic",
    desc: "Food is grown or made without synthetic chemicals, pesticides, or GMOs, using natural methods that support health and environment.",
  },
];

const BenefitsGrid = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-poppins">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-full shadow-md bg-white">{feature.icon}</div>
            <h3 className="text-lg font-semibold capitalize">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsGrid;
