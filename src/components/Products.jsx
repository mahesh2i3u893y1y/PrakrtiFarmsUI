import React from "react";
import { ShoppingCart, Star, Leaf } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Pure Cow Milk",
      price: "₹60/liter",
      image:
        "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      description: "Fresh, creamy milk from grass-fed cows",
      rating: 4.9,
      organic: true,
    },
    {
      id: 2,
      name: "Pure Honey",
      price: "₹350/kg",
      image:
        "https://cdn.pixabay.com/photo/2015/06/27/16/35/honey-823614_1280.jpg",
      description: "Raw, unprocessed honey from village apiaries",
      rating: 4.8,
      organic: true,
    },
    {
      id: 3,
      name: "Desi Ghee",
      price: "₹800/kg",
      image:
        "https://images.pexels.com/photos/4686818/pexels-photo-4686818.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      description: "Traditional clarified butter made from cow milk",
      rating: 4.9,
      organic: true,
    },
    {
      id: 4,
      name: "Fresh Paneer",
      price: "₹120/kg",
      image:
        "https://images.pexels.com/photos/6275079/pexels-photo-6275079.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      description: "Soft, homemade cottage cheese",
      rating: 4.7,
      organic: true,
    },
    {
      id: 5,
      name: "Cold Pressed Oil",
      price: "₹450/liter",
      image:
        "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      description: "Traditional wood-pressed cooking oil",
      rating: 4.6,
      organic: true,
    },
    {
      id: 6,
      name: "Organic Millets",
      price: "₹80/kg",
      image:
        "https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      description: "Nutritious ancient grains from organic farms",
      rating: 4.8,
      organic: true,
    },
    {
      id: 7,
      name: "Country Eggs",
      price: "₹8/piece",
      image:
        "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      description: "Free-range eggs from village chickens",
      rating: 4.9,
      organic: true,
    },
    {
      id: 8,
      name: "Fresh Mushrooms",
      price: "₹150/kg",
      image:
        "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      description: "Locally grown oyster and button mushrooms",
      rating: 4.5,
      organic: true,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 px-4 font-poppins mt-[20%] md:mt-[9%]">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Natural Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our range of pure, natural dairy products and organic
              farm produce, sourced directly from Indian villages and delivered
              fresh to your doorstep.
            </p>
          </div>

          {/* Village Scene */}
          <div className="relative mb-16 rounded-2xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3030405/pexels-photo-3030405.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop"
              alt="Indian Village"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Farm to Table
                </h2>
                <p className="text-lg md:text-xl">
                  Bringing you the authentic taste of rural India
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.organic && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Leaf className="h-4 w-4 mr-1" />
                      Organic
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-amber-600">
                      {product.price}
                    </div>
                    {/* <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full flex items-center transition-colors duration-200">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Need Custom Quantities?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We offer bulk orders for restaurants, hotels, and families.
              Contact us for special pricing and delivery options.
            </p>
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200">
              Contact for Bulk Orders
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Products;
