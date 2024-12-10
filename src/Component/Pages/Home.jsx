import React, { useEffect, useState } from "react";
import video from '../../assets/Video/one.mp4';

const Home = () => {
  const [isIphone, setIsIphone] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setIsIphone(true);
    }
  }, []);

  const handleVideoClick = () => {
    if (isIphone) {
      // Show popup for iPhone users
      alert("Playing video in a popup on iPhone.");
      // You can enhance this to display a modal with the video
    }
  };

  return (
    <div className="bg-white mt-2 mx-auto px-4 md:px-16 lg:px-24">
      {/* Main Container */}
      <div className="container mx-auto py-8 flex flex-col md:flex-row gap-6">
        {/* Hero Section */}
        <div 
          className={`flex-1 relative rounded-lg shadow-lg overflow-hidden ${isIphone ? 'cursor-pointer' : ''}`}
          onClick={isIphone ? handleVideoClick : undefined}
        >
          <video
            className={`absolute inset-0 w-full h-full object-cover ${isIphone ? 'hidden' : ''}`}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="relative z-10 bg-black bg-opacity-50 h-full flex flex-col items-center justify-center text-center px-4 py-8">
            <p className="text-xs sm:text-sm font-medium text-white animate-fadeIn">
              Code with Deepanshu
            </p>
            <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-white leading-tight">
              Welcome to{" "}
              <span className="text-red-500 animated-title">E-Shop</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-lg text-gray-200 mt-2">
              Discover over{" "}
              <span className="font-bold text-white">Millions+</span> of
              products at unbeatable prices.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 text-sm font-semibold rounded-md shadow-md hover:bg-red-700 transition mt-4"
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
