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
    <><div className="bg-black">
      <div
        style={{ display: showDiv ? "none" : "block" }}
        className="w-10  md:w-36 z-10 chats"
      >
        <div className="bg-red-600 text-center text-white text-xs font-bold px-4 py-3 uppercase rounded-t-lg">
          Shop by Categories
        </div>
        <ul className="space-y-4 animate-fade-up  bg-gray-100 p-4 border rounded-b-lg">
          {Categories.map((category, index) => (
            <li
              key={index}
              className="  cursor-pointer text-sm font-medium text-gray-700 flex items-center space-x-3 hover:bg-red-500 hover:text-white hover:shadow-lg p-2 rounded-md transition-transform transform hover:scale-105"
              onClick={() => handleCategoryClick(category)}
            >
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div onClick={toggleDiv} className="chatBot absolute  ">
        <img className="w-36 h-auto rounded-full" src={gif} alt="Chatbot" />
      </div></div>
    </>
  );
};

export default Chatbox;
