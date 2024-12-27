import React, { useEffect, useState } from "react";
import {
  mockElec,
  mockData,
  fasionData,
  womencollection,
  mencollection,
  beautyProducts,
  homekitchen,
} from "../../assets/MockData";
import { setProduct } from "../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Chatbox from "../../Chatbox/Chatbox";
import { supabase } from "../../supabase/supabaseClient";

const Shop = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [visibleProducts, setVisibleProducts] = useState([]);

  const handleClick = async (product) => {
    // Existing handleClick code remains unchanged
    // ...
  };

  useEffect(() => {
    const combinedData = [
      ...mockElec,
      ...mockData,
      ...fasionData,
      ...womencollection,
      ...mencollection,
      ...beautyProducts,
      ...homekitchen,
    ];
    dispatch(setProduct(combinedData));
  }, [dispatch]);

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = product.product.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    let delay = 0;
    const animatedProducts = currentProducts.map((item, index) => ({
      ...item,
      animationDelay: `${(index + 1) * 200}ms`, 
    }));

    setVisibleProducts(animatedProducts);
  }, [product.product, currentPage]);

  const nextPage = () => {
    if (currentPage < Math.ceil(product.product.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Chatbox />
      <div className="mt-10 mb-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          WELCOME TO THE PRODUCT WORLD
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleProducts.map((item) => (
            <div
              key={item.category}
              className="bg-white shadow-lg rounded-lg p-4 transition-all transform hover:scale-105 hover:shadow-xl hover:translate-y-2"
              style={{
                opacity: 0,
                animation: `fadeIn 1s ease-out ${item.animationDelay} forwards`,
              }}
            >
              <Link to={`/product/${item.category}`}>
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
                </div>
              </Link>
              <button
                onClick={() => handleClick(item)}
                className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600 transition-all ease-in-out"
              >
                Add to Cart
              </button>
              <Link to={`/product/${item.category}`}>
                <button className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600 transition-all ease-in-out">
                  Buy now
                </button>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={prevPage}
            className="bg-gray-300 text-gray-800 px-4 py-2 mx-2 rounded-md hover:bg-gray-400 transition"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            className="bg-gray-300 text-gray-800 px-4 py-2 mx-2 rounded-md hover:bg-gray-400 transition"
            disabled={currentPage === Math.ceil(product.product.length / productsPerPage)}
          >
            Next
          </button>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Shop;
