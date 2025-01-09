import React from "react";
import Chatbox from "../../Chatbox/Chatbox";

const Contact = () => {
  return (
    <div className="min-h-screen my-4 rounded-3xl  bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center px-4">
      
      <div className="bg-white my-6 shadow-2xl rounded-lg p-8 md:p-16 max-w-4xl w-full animate-fadeIn">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Get in Touch
        </h2>
        <p className="text-center text-gray-600 mb-8">
          We'd love to hear from you! Fill out the form below and we’ll get back
          to you as soon as possible.
        </p>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="mt-1 px-4 py-2 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 px-4 py-2 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <Chatbox />

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message..."
              className="mt-1 px-4 py-2 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-red-700 hover:scale-105 transform transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
