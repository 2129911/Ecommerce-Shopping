import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { GoArrowLeft } from "react-icons/go";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "./redux/cartProduct";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const cart = useSelector((state) => state.product.product);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const selectedProduct = cart.find((product) => product.id === id);
    setProduct(selectedProduct);
  }, [id, cart]);

  if (!product) {
    return (
      <>
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4">
          <div className="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            <GoArrowLeft className="mr-2" /> Go Back
          </div>
        </button>
        <div className="flex justify-center items-center h-screen">
          <span className=" text-2xl font-semibold loadar"></span>
        </div>
      </>
    );
  }

  return (
    <div
    style={{ backgroundImage: `url(${product.image})` }}
    className="min-h-screen  bg-cover  bg-center opacity-100 z-0   flex justify-center items-center  p-4"
  >     
  <div className="opacity-100">
   <motion.div
        className="max-w-5xl  w-full bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        
      >
        <motion.img
          src={product.images}
          alt={product.name}
          className="w-full h-96 object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        <div className="p-6 flex  flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-red-600">${product.price}</p>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-center mb-6 space-x-2">
              <button
                onClick={() => dispatch(decreaseQuantity(product.id))}
                className="bg-gray-200 px-4 py-2 rounded-l round hover:bg-gray-300"
              >
                -
              </button>
              <span className="px-4 py-2 bg-gray-100 rounded">{product.quantity || 1}</span>
              <button
                onClick={() => dispatch(increaseQuantity(product.id))}
                className="bg-gray-200 px-4 py-2 rounded-r hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <motion.button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addToCart(product));
                alert(`${product.name} added to cart successfully!`);
              }}
              className="w-full rounded-full bg-red-600 text-white py-2  hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
          </div>

          <button onClick={() => navigate(-1)} className="mt-4">
            <div className="w-full bg-gray-800 text-white py-2 flex items-center justify-center rounded-full hover:bg-gray-900">
              <GoArrowLeft className="mr-2" /> Go Back
            </div>
          </button>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
