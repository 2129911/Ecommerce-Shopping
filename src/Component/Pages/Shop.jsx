import React, { useEffect } from "react";
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
  const handleClick = async (product) => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
      if (sessionError) {
        console.error("Error fetching session:", sessionError.message);
        alert("Unable to fetch session. Please log in again.");
        return;
      }
  
      const userId = sessionData?.session?.user?.id;
      if (!userId) {
        alert("User not logged in.");
        return;
      }
  
      const { data: existingCart, error: fetchError } = await supabase
        .from("cart_products")
        .select("id, products")
        .eq("user", userId)
        .single();
  
      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching cart:", fetchError);
        alert("Error fetching cart details. Please try again.");
        return;
      }
  
      if (existingCart) {
        const productsArray = existingCart.products || [];
  
        const productIndex = productsArray.findIndex(
          (item) => item.name === product.name
        );
  
        if (productIndex !== -1) {
          productsArray[productIndex].quantity += 1;
        } else {
          productsArray.push({
            category: product.category,
            image: product.image,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: 1,
          });
        }
  
        const { error: updateError } = await supabase
          .from("cart_products")
          .update({ products: productsArray })
          .eq("id", existingCart.id);
  
        if (updateError) {
          console.error("Error updating cart:", updateError);
          alert(`Error updating cart: ${updateError.message}`);
        } else {
          alert(`${product.name} added to cart successfully!`);
        }
      } else {
        const newProducts = [
          {
            category: product.category,
            image: product.image,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: 1,
          },
        ];
        const { error: insertError } = await supabase
          .from("cart_products")
          .insert([{
            user: userId,
            products: newProducts,
          }]);
  
        if (insertError) {
          console.error("Error adding product to cart:", insertError);
          alert(`Error adding product to cart: ${insertError.message}`);
        } else {
          alert(`${product.name} added to cart successfully!`);
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong. Please try again.");
    }
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

  return (
    <>
      <Chatbox />
      <div className="mt-10 mb-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          WELCOME TO THE PRODUCT WORLD
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.product.map((item) => (
            <div key={item.category} className="bg-white shadow-lg rounded-lg p-4 transition-all transform hover:scale-105 hover:shadow-xl hover:translate-y-2">
              <Link to={`/product/${item.category}`}>
                <img loading="lazy"
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
              <button
                className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600 transition-all ease-in-out"
              >
                Buy now
                </button>
                </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
