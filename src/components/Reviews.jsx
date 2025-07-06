import React from 'react';
import { Star, Quote, User, MapPin } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai, Maharashtra',
      rating: 5,
      review: 'The milk quality is exceptional! My children love it and I can taste the difference. Pure Dairy has become our family\'s trusted choice for all dairy needs.',
      product: 'Pure Cow Milk',
      date: '2 weeks ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Delhi, NCR',
      rating: 5,
      review: 'The desi ghee is amazing! It reminds me of my grandmother\'s homemade ghee. The aroma and taste are authentic. Highly recommended for traditional cooking.',
      product: 'Desi Ghee',
      date: '1 month ago',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 3,
      name: 'Meera Patel',
      location: 'Bangalore, Karnataka',
      rating: 5,
      review: 'I\'ve been buying their honey for 6 months now. It\'s pure, natural, and has helped improve my family\'s immunity. The packaging is also very good.',
      product: 'Pure Honey',
      date: '3 weeks ago',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 4,
      name: 'Amit Singh',
      location: 'Pune, Maharashtra',
      rating: 5,
      review: 'The paneer is so fresh and soft! Perfect for making paneer tikka and curries. The taste is much better than store-bought paneer.',
      product: 'Fresh Paneer',
      date: '1 week ago',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 5,
      name: 'Kavita Joshi',
      location: 'Hyderabad, Telangana',
      rating: 5,
      review: 'Their cold-pressed oil is excellent! I can taste the difference in my cooking. It\'s healthy and adds a wonderful flavor to all dishes.',
      product: 'Cold Pressed Oil',
      date: '2 months ago',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 6,
      name: 'Suresh Reddy',
      location: 'Chennai, Tamil Nadu',
      rating: 5,
      review: 'The country eggs are fantastic! They have that authentic village taste. My kids love them and they\'re perfect for baking and cooking.',
      product: 'Country Eggs',
      date: '3 days ago',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
  ];

  const stats = [
    { label: 'Happy Customers', value: '25,000+' },
    { label: 'Products Delivered', value: '100,000+' },
    { label: 'Cities Served', value: '50+' },
    { label: 'Average Rating', value: '4.9/5' },
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen py-12 px-4 mt-[20%] md:mt-[9%] font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
            What Our Customers Say
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Read authentic reviews from families across India who trust Pure Dairy 
            for their daily nutrition needs.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-xl md:text-2xl font-bold text-amber-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Village Scene */}
        <div className="relative mb-16 rounded-2xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3030405/pexels-photo-3030405.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop"
            alt="Happy Village Family"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Trusted by Families</h2>
              <p className="text-lg md:text-xl">Since 2015, serving pure happiness</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold text-gray-800">{review.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {review.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">{review.date}</span>
              </div>

              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-amber-200" />
                <p className="text-gray-700 leading-relaxed pl-6">{review.review}</p>
              </div>

              <div className="bg-amber-50 rounded-lg p-3">
                <span className="text-sm font-medium text-amber-800">Product: {review.product}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Join Thousands of Happy Customers
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the purity and taste that has made us India's trusted dairy brand. 
            Your satisfaction is our guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200">
              Order Now
            </button>
            <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200">
              Share Your Review
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Reviews;