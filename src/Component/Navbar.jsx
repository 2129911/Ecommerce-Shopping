import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaStore } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const product = useSelector(state=> state.cart.product)
  console.log(product)
  return (
    <>
      <nav className="bg-gray-900  text-white   shadow-md">
        
        <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 text-lg font-bold">
            <FaStore className="text-red-500 text-2xl" />
            <Link
              to="/"
              className="text-red-500 hover:text-red-700 transition duration-300"
            >
              E-Shop
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 mx-4">
            <form className="relative">
              <input
                type="text"
                placeholder="Search Products"
                className="w-full border rounded-md py-2 px-4 focus:ring-2 focus:ring-red-300 focus:outline-none border-white transition-all duration-300 hover:border-red-500 focus:border-red-500"
              />
              <FaSearch className="absolute top-1/2 right-3 -translate-y-1/2 text-red-500" />
            </form>
          </div>

          {/* Icons and Buttons */}
          <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
  <FaShoppingCart className="text-lg hover:text-red-500 transition duration-300" />
  {product.length > 0 && (
    <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {product.length}
    </span>
  )}
</Link>

            <button className="hidden md:block text-sm font-semibold text-white hover:text-red-500">
              Login | Register
            </button>
            <button className="block md:hidden">
              <FaUser className="text-lg hover:text-red-500 transition duration-300" />
            </button>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex items-center justify-center  space-x-10 py-4 text-sm font-bold text-white ">
          <Link to="/" className="  hover:text-red-500">
            Home
          </Link>
          <Link to="/shop" className=" hover:text-red-500">
            Shop
          </Link>
          <Link to="/contact" className="hover:text-red-500">
            Contact
          </Link>
          <Link to="/about" className="hover:text-red-500">
            About
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
