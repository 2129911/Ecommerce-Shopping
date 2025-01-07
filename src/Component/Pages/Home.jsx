import React, { useEffect } from "react";
import { Categories, mockData } from "../../assets/MockData";
import Heroimage from "../../assets/Images/Hero-Image.png";
const InfoSection = React.lazy(()=>import("../InfoSection"));
import CategorieSection from "../CategorieSection";
import { setProduct } from "../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartProduct";
import video from "../../assets/Video/one.mp4";
import Chatbox from "../../Chatbox/Chatbox";
import { Suspense } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const navigate = useNavigate();
  const handleClick = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product));
    alert(`${product.name} added to cart successfully!`);
  };
  useEffect(() => {
    dispatch(setProduct(mockData));
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    const formattedCategory = category.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/${formattedCategory}`);
  };

  return (
    <div className=" mx-auto px-4 md:px-16 lg:px-24">
      {/* Main Container */}
      <div className="container mx-auto py-8 flex flex-col md:flex-row gap-6">
        {/* Categories Section */}

        <div className="w-full md:w-3/12">
          <div className="bg-red-600 text-white text-xs font-bold px-4 py-3 uppercase rounded-t-lg">
            Shop by Categories
          </div>
          <ul className="space-y-4 bg-gray-100 p-4 border rounded-b-lg">
            {Categories.map((category, index) => (
              <li
                key={index}
                className="cursor-pointer text-sm font-medium text-gray-700 flex items-center space-x-3 hover:bg-red-500 hover:text-white hover:shadow-lg p-2 rounded-md transition-transform transform hover:scale-105"
                onClick={() => handleCategoryClick(category)}
              >
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>{category.name}</span>
              </li>
            ))}
          </ul>
        </div>
        

        {/* Hero Section */}

        <div className="flex-1  relative rounded-lg shadow-lg overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
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
<Suspense fallback={<div className="loader"></div>}>
      <InfoSection />
      </Suspense>
      <CategorieSection />
      <Chatbox />
      {/* Product Section */}

      <div className="mt-10 block">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Featured Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.product.slice(0, 4).map((item, index) => (
























            <Link to={`/product/${item.category}`}>
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                  <p className="text-lg font-bold text-red-600 mt-2">
                    ${item.price}
                  </p>
                  <button
                    onClick={(e) => handleClick(e, item)}
                    className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div class="container max-w-full">
    <div class=" flex flex-wrap content-center justify-evenly">
        <div class="relative inline-flex group">
            <div
                className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
            </div>
            <button
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-red-400 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 rounded-xl"
                >View All</button>
        </div>
    </div>
</div>

    
</div>
        </div>
      
    
  );
};

export default Home;
