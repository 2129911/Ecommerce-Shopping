import React, { useEffect, useState } from "react";
import gif from "../assets/Video/robot.gif";
import { Categories, mockData } from "../assets/MockData";
import { useDispatch } from "react-redux";
import { setProduct } from "../Component/redux/productSlice";
import { useNavigate } from "react-router-dom";

const Chatbox = () => {
  const [showDiv, setShowDiv] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    const formattedCategory = category.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/${formattedCategory}`);
  };

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  useEffect(() => {
    dispatch(setProduct(mockData));
  }, [dispatch]);

  return (
    <div className="relative bg-black">
      {/* Category Dropdown */}
      <div
        style={{ display: showDiv ? "none" : "block" }}
        className="w-11/12 sm:w-64 md:w-72 lg:w-80 z-10 chats fixed bottom-24 sm:bottom-28 right-4"
      >
        <div className="bg-red-600 text-center text-white text-xs font-bold px-4 py-3 uppercase rounded-t-lg">
          Shop by Categories
        </div>
        <ul className="space-y-4 animate-fade-up bg-gray-100 p-4 border rounded-b-lg shadow-lg">
          {Categories.map((category, index) => (
            <li
              key={index}
              className="cursor-pointer text-sm font-medium text-gray-700 flex items-center space-x-3 hover:bg-red-500 hover:text-white hover:shadow-lg p-2 rounded-md transition-transform transform hover:scale-105"
              onClick={() => handleCategoryClick(category)}
            >
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chatbot Button */}
      <div onClick={toggleDiv} className="chatBot fixed bottom-4 right-4">
        <img
          className="w-20 h-auto sm:w-24 md:w-28 lg:w-36 rounded-full cursor-pointer transition-transform transform hover:scale-105"
          src={gif}
          alt="Chatbot Assistant"
        />
      </div>
    </div>
  );
};

export default Chatbox;
