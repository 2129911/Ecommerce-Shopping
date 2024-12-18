import React, { useEffect } from "react";
import { mockElec,mockData, fasionData, womencollection, mencollection,Categories,beautyProducts,fashion,homekitchen } from "../../assets/MockData";
import { setProduct } from "../redux/productSlice";
import { addToCart } from "../redux/cartProduct";
import { useSelector, useDispatch } from "react-redux";
import Electronics from "./HomeKitchen";
import { Link } from "react-router-dom";
import Chatbox from "../../Chatbox/Chatbox";

const Shop = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const handleClick = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product)); 
    alert(`${product.name} added to cart successfully!`); 
  };

  useEffect(() => {
    const combinedData = [...mockElec, ...mockData, ...fasionData, ...womencollection, ...mencollection ,...beautyProducts,...homekitchen];
    dispatch(setProduct(combinedData));
  }, [dispatch]);

  return (
    <>         <Chatbox />

      <div className="mt-10 mb-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        WELCOME THE PRODUCT WORLD
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.product.map((item) => (
           <Link to={`/product/${item.category}`}>
 
            <div
              key={item.category} 
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
      </div>


        
    </>
  );
};

export default Shop;
