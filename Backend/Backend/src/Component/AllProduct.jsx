import React, { useEffect } from "react";
import {mockData } from "../../assets/MockData";

import { setProduct } from "../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./redux/cartProduct";
import { Link } from "react-router-dom";

const Allproduct = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
let handleClick=(e,product)=>{
e.stopPropagation;
e.preventDefault;
dispatch(addToCart(product))
alert('product edit successfully')
}
  useEffect(() => {
    dispatch(setProduct(mockData));
  }, [dispatch]);

  return (
    <Link to={`/product/${product.id}`}>
    <div className="bg-white mt-2 mx-auto px-4 md:px-16 lg:px-24">
    

      {/* Product Section */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Featured Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.product.slice(0, 8).map((item, index) => ( 
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
                <button onClick={(e,product)=>handleClick(e,)} className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600 transition">
                  
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
    </Link>
  );
};

export default Allproduct ;
