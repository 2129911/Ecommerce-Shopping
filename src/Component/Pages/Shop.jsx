import React, { useEffect, useState } from "react";
import {
  mockElec,
  mockData,
  fasionData,
  womencollection,
  mencollection,
  beautyProducts,
  homekitchen
} from "../../assets/MockData";
import { setProduct } from "../redux/productSlice";
// import { addToCart } from "../redux/cartProduct";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Chatbox from "../../Chatbox/Chatbox";
import { supabase } from "../../supabase/supabaseClient";

const Shop = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getUser();
      setUser(user.data.user);  
    };

    fetchUser();
  }, []);


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
    
      const { data, error } = await supabase
      .from("cart_products")
      .insert([
        {
          user: userId, 
          products: [product.category], 
          quantity: 1, 
        },
      ]);
    

    
      if (error) {
        console.error("Error adding product to cart:", error);
        alert(`Error adding product to cart: ${error.message}`);
      } else {
        console.log("Product added successfully:", data);
        alert(`${product.name} added to cart successfully!`);
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
            <Link to={`/product/${item.category}`} key={item.category}>
              <div className="bg-white shadow-lg rounded-lg p-4 transition-all transform hover:scale-105 hover:shadow-xl hover:translate-y-2">
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
  onClick={() => handleClick(item)} 
  className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600 transition-all ease-in-out"
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
