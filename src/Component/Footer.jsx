import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900  text-gray-300 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">About Us</h3>
            <p className="text-sm leading-relaxed">
              Welcome to our E-Shop! Discover amazing deals and a wide variety
              of products to meet all your needs. Your satisfaction is our top
              priority!
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="hover:text-red-500 transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  className="hover:text-red-500 transition-colors duration-200"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-red-500 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-red-500 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Newsletter</h3>
            <p className="text-sm leading-relaxed mb-4">
              Subscribe to our newsletter to receive updates on new arrivals and
              exclusive offers.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">&copy; 2024 E-Shop. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
