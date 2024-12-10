import React, { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../redux/productSlice";
import { addToCart } from "../redux/cartProduct";
import { fasionData } from "../../assets/MockData";
import video from '../../assets/Video/five.mp4'
import { useNavigate } from "react-router";
import MenCollections from "./MenCollection";


const Electronics = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(setProduct(fasionData)); 
  }, [dispatch]);

  
  const handleClick = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product));
    alert(`${product.name} added to cart successfully!`);
  };

  return (
    
    <div className="container mx-auto px-4  bg-transparent py-6">
      <div className="flex-1 relative rounded-lg shadow-lg overflow-hidden">
  <video 
    className="absolute inset-0 w-full h-full object-cover" 
    autoPlay 
    loop 
    muted
  >
    <source src={video} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="relative z-10 bg-black bg-opacity-50 h-96 flex flex-col items-center justify-center text-center px-4 py-8">
    
    <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-white leading-tight">
      Welcome to{" "}
      <span className="text-red-500 animated-title">Fashion World</span>
    </h2>
    <p className="text-xs sm:text-sm md:text-lg text-gray-200 mt-2">
      Discover over{" "}
      <span className="font-bold text-white">Millions+</span> of
      products at unbeatable prices.
    </p>
   
  </div>
</div>

      <div className="grid grid-cols-1 mt-5 md:grid-cols-2 m-auto lg:grid-cols-2 gap-6">
        {product.product.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 "
          > 
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-60 object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-bold mt-2">{item.title}</h3>
        <button
      onClick={() => {
        navigate(`${item?.link}`);
      }} className="w-full mt-3 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
Go to page {item.title}            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
