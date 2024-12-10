import React from "react";
import img1 from '../../assets/Images/me.png'
import img2 from '../../assets/Images/mukul.jpg'
import img3 from '../../assets/Images/uditSir.png'

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-red-600 to-red-800 text-white">
      <div
        className="absolute inset-0 bg-cover bg-fixed opacity-30"
        style={{
          backgroundImage:
            img1,
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-8 py-20 text-center space-y-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide uppercase animate-fadeInDown">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto animate-fadeInUp">
          We are a dynamic team dedicated to bringing the best products and
          services to our customers. Our mission is to innovate, inspire, and
          create a community of excellence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:scale-105 transition-transform">
            <img
              src={img1}
              alt="Team Member 1"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h3 className="text-xl font-bold mt-4">Deepanshu</h3>
            <p className="text-sm text-gray-300">CEO & Founder</p>
            <p className="text-gray-400 text-sm mt-2">
              Visionary leader passionate about innovation and excellence.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:scale-105 transition-transform">
            <img
              src={img2}
              alt="Team Member 2"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h3 className="text-xl font-bold mt-4">Mukul</h3>
            <p className="text-sm text-gray-300">Chief Designer</p>
            <p className="text-gray-400 text-sm mt-2">
              Creating innovative designs that inspire and engage.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:scale-105 transition-transform">
            <img
              src={img3}
              alt="Team Member 3"
              className="w-32 h-24 mx-auto rounded-full"
            />
            <h3 className="text-xl font-bold mt-4">Udit Sir</h3>
            <p className="text-sm text-gray-300">Lead Developer</p>
            <p className="text-gray-400 text-sm mt-2">
              Building robust solutions that drive success.
            </p>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default About;
