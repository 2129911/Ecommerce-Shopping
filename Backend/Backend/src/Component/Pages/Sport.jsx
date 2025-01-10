import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../redux/productSlice";
import { addToCart } from "../redux/cartProduct";
import { fashion } from "../../assets/MockData";
import video from '../../assets/Video/six.mp4'
import Chatbox from "../../Chatbox/Chatbox";
import { supabase } from "../../supabase/supabaseClient";

const Electronics = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(setProduct(fashion)); 
  }, [dispatch]);

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
      <span className="text-red-500 animated-title">Sports World</span>
    </h2>
    <p className="text-xs sm:text-sm md:text-lg text-gray-200 mt-2">
      Discover over{" "}
      <span className="font-bold text-white">Millions+</span> of
      products at unbeatable prices.
    </p>
   
  </div>
</div>
<Chatbox />

      <div className="grid grid-cols-1 mt-5 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product.product.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-xl"
            />
            <h3 className="text-lg font-bold mt-2">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-lg text-red-500 font-bold">${item.price}</p>
            <button
              onClick={() => handleClick(item)}
              className="w-full mt-3 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
