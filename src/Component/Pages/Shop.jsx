// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../../supabase/supabaseClient";

// const Shop = ({ session }) => {
//   const navigate = useNavigate();

  
//   // States
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [paymentOrder, setPaymentOrder] = useState([]);
//   const [visibleProducts, setVisibleProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   // Fetch Products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const { data, error } = await supabase.from("All_Products").select("*");
//       if (error) {
//         console.error("Error fetching products:", error.message);
//       } else {
//         setProducts(data);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Update visible products based on pagination
//   useEffect(() => {
//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//     setVisibleProducts(products.slice(indexOfFirstProduct, indexOfLastProduct));
//   }, [products, currentPage]);

//   // Handle adding to cart
//   const handleClick = async (product) => {
//     if (!session) {
//       alert("Please log in to add items to the cart.");
//       navigate("/login");
//       return;
//     }

//     // Check if product is already in the cart
//     const existingProduct = cart.find((item) => item.id === product.id);

//     if (existingProduct) {
//       alert("Item already in the cart!");
//       return;
//     }

//     // Add product to the cart
//     const newCart = [...cart, product];
//     setCart(newCart);

//     // Add product to payment order
//     const order = {
//       user_id: session.user.id,
//       product_id: product.id,
//       quantity: 1,
//     };
//     const { error } = await supabase.from("payment_order").insert(order);

//     if (error) {
//       alert("Failed to add item to order. Please try again.");
//       console.error("Error adding to payment order:", error.message);
//     } else {
//       alert("Item added to the cart and payment order!");
//       setPaymentOrder([...paymentOrder, order]);
//     }
//   };

//   return (
//     <div>
//       <h1>Shop</h1>
//       <div className="flex border flex-wrap">
//         {visibleProducts.map((product) => (
//           <div key={product.id} className="product-card">
//             {/* <img src={product.images} clas alt={product.name} /> */}
//             {/* <Link to={`/product/${item.category}`}> */}
// <img
//                   src={product.images}
//                   alt={product.name}
//                   className="w-full h-48 object-cover rounded-t-lg"
//                 />
// {/* </Link> */}
//             <h3>{product.name}</h3>

//             <p>{product.description}</p>
//             <p>${product.price}</p>
//             <button onClick={() => handleClick(product)}>Add to Cart</button>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className="pagination">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//         >
//           Previous
//         </button>
//         <button
//           disabled={currentPage === Math.ceil(products.length / productsPerPage)}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Shop;




import React, { useEffect, useState } from "react";


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
   const [products, setProducts] = useState([]); 

  async function getRequest() {
    try {
      const { data: All_Products, error } = await supabase
        .from("All_Products")
        .select("*");
  
      if (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products from Supabase.");
      } else {
        console.log("Fetched products:", All_Products); 
        setProducts(All_Products); 
        dispatch(setProduct(All_Products)); 
      }
    } catch (err) {
      console.error("Unexpected error in getRequest:", err);
      alert("Unexpected error fetching products.");
    }
  }
  
  useEffect(() => {
    getRequest();
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

      let updatedProducts = [];
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
            image: product.images,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: 1,
          });
        }
        updatedProducts = productsArray;

        const { error: updateError } = await supabase
          .from("cart_products")
          .update({ products: updatedProducts })
          .eq("id", existingCart.id);

        if (updateError) {
          console.error("Error updating cart:", updateError);
          alert(`Error updating cart: ${updateError.message}`);
          return;
        }
      } else {
        updatedProducts = [
          {
            category: product.category,
            image: product.images,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: 1,
          },
        ];

        const { error: insertError } = await supabase
          .from("cart_products")
          .insert([{ user: userId, products: updatedProducts }]);

        if (insertError) {
          console.error("Error adding product to cart:", insertError);
          alert(`Error adding product to cart: ${insertError.message}`);
          return;
        }
      }

      const totalQuantity = updatedProducts.reduce(
        (total, item) => total + item.quantity,
        0
      );

      const { data: existingPaymentOrder, error: paymentFetchError } = await supabase
        .from("Payment_Orders")
        .select("id, products, quantity")
        .eq("user", userId)
        .single();

      if (paymentFetchError && paymentFetchError.code !== "PGRST116") {
        console.error("Error fetching payment order:", paymentFetchError);
        alert("Error fetching payment order. Please try again.");
        return;
      }

      if (existingPaymentOrder) {
        const paymentProductsArray = existingPaymentOrder.products || [];
        updatedProducts.forEach((newProduct) => {
          const productIndex = paymentProductsArray.findIndex(
            (item) => item.name === newProduct.name
          );
          if (productIndex !== -1) {
            paymentProductsArray[productIndex].quantity += newProduct.quantity;
          } else {
            paymentProductsArray.push(newProduct);
          }
        });

        const updatedQuantity = paymentProductsArray.reduce(
          (total, item) => total + item.quantity,
          0
        );

        const { error: updatePaymentError } = await supabase
          .from("Payment_Orders")
          .update({
            products: paymentProductsArray,
            quantity: updatedQuantity,
          })
          .eq("id", existingPaymentOrder.id);

        if (updatePaymentError) {
          console.error("Error updating payment order:", updatePaymentError);
          alert(`Error updating payment order: ${updatePaymentError.message}`);
        } else {
          alert(`${product.name} added to Payment Order successfully!`);
        }
      } else {
       
        const { error: insertPaymentError } = await supabase
          .from("Payment_Orders")
          .insert([
            {
              user: userId,
              products: updatedProducts,
              payment: "Pending",
              quantity: totalQuantity,
            },
          ]);

        if (insertPaymentError) {
          console.error("Error inserting payment order:", insertPaymentError);
          alert(`Error inserting payment order: ${insertPaymentError.message}`);
        } else {
          alert(`${product.name} added to cart and Payment Order created successfully!`);
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
    if (product.product.length > 0) {
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
    } else {
      console.warn("No products found in Redux store.");
    }
  }, [product.product, currentPage]);

  // useEffect(() => {
  //   const indexOfLastProduct = currentPage * productsPerPage;
  //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  //   const currentProducts = product.product.slice(
  //     indexOfFirstProduct,
  //     indexOfLastProduct
  //   );

  //   let delay = 0;
  //   const animatedProducts = currentProducts.map((item, index) => ({
  //     ...item,
  //     animationDelay: `${(index + 1) * 200}ms`,
  //   }));

  //   setVisibleProducts(animatedProducts);
  // }, [product.product, currentPage]);

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
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          WELCOME TO THE PRODUCT WORLD
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg p-4 transition-all transform hover:scale-105 hover:shadow-xl hover:translate-y-2"
              style={{
                opacity: 0,
                animation: `fadeIn 1s ease-out ${item.animationDelay} forwards`,
              }}
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.images}
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



// const handleClick = async (product) => {
  //   try {
  //     const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  //     if (sessionError) {
  //       console.error("Error fetching session:", sessionError.message);
  //       alert("Unable to fetch session. Please log in again.");
  //       return;
  //     }

  //     const userId = sessionData?.session?.user?.id;
  //     if (!userId) {
  //       alert("User not logged in.");
  //       return;
  //     }

  //     const { data: existingCart, error: fetchError } = await supabase
  //       .from("cart_products")
  //       .select("id, products")
  //       .eq("user", userId)
  //       .single();

  //     if (fetchError && fetchError.code !== "PGRST116") {
  //       console.error("Error fetching cart:", fetchError);
  //       alert("Error fetching cart details. Please try again.");
  //       return;
  //     }

  //     if (existingCart) {
  //       const productsArray = existingCart.products || [];

  //       const productIndex = productsArray.findIndex(
  //         (item) => item.name === product.name
  //       );

  //       if (productIndex !== -1) {
  //         productsArray[productIndex].quantity += 1;
  //       } else {
  //         productsArray.push({
  //           category: product.category,
  //           image: product.image,
  //           name: product.name,
  //           description: product.description,
  //           price: product.price,
  //           quantity: 1,
  //         });
  //       }

  //       const { error: updateError } = await supabase
  //         .from("cart_products")
  //         .update({ products: productsArray })
  //         .eq("id", existingCart.id);

  //       if (updateError) {
  //         console.error("Error updating cart:", updateError);
  //         alert(`Error updating cart: ${updateError.message}`);
  //       } else {
  //         alert(`${product.name} added to cart successfully!`);
  //       }
  //     } else {
  //       const newProducts = [
  //         {
  //           category: product.category,
  //           image: product.image,
  //           name: product.name,
  //           description: product.description,
  //           price: product.price,
  //           quantity: 1,
  //         },
  //       ];
  //       const { error: insertError } = await supabase
  //         .from("cart_products")
  //         .insert([{
  //           user: userId,
  //           products: newProducts,
  //         }]);

  //       if (insertError) {
  //         console.error("Error adding product to cart:", insertError);
  //         alert(`Error adding product to cart: ${insertError.message}`);
  //       } else {
  //         alert(`${product.name} added to cart successfully!`);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };
  // const handleClick = async (product) => {
  //   try {
  //     const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  //     if (sessionError) {
  //       console.error("Error fetching session:", sessionError.message);
  //       alert("Unable to fetch session. Please log in again.");
  //       return;
  //     }

  //     const userId = sessionData?.session?.user?.id;
  //     if (!userId) {
  //       alert("User not logged in.");
  //       return;
  //     }

  //     const { data: existingCart, error: fetchError } = await supabase
  //       .from("cart_products")
  //       .select("id, products")
  //       .eq("user", userId)
  //       .single();

  //     if (fetchError && fetchError.code !== "PGRST116") {
  //       console.error("Error fetching cart:", fetchError);
  //       alert("Error fetching cart details. Please try again.");
  //       return;
  //     }

  //     let updatedProducts = [];
  //     if (existingCart) {
  //       const productsArray = existingCart.products || [];
  //       const productIndex = productsArray.findIndex(
  //         (item) => item.name === product.name
  //       );

  //       if (productIndex !== -1) {
  //         productsArray[productIndex].quantity += 1;
  //       } else {
  //         productsArray.push({
  //           category: product.category,
  //           image: product.image,
  //           name: product.name,
  //           description: product.description,
  //           price: product.price,
  //           quantity: 1,
  //         });
  //       }
  //       updatedProducts = productsArray;

  //       const { error: updateError } = await supabase
  //         .from("cart_products")
  //         .update({ products: updatedProducts })
  //         .eq("id", existingCart.id);

  //       if (updateError) {
  //         console.error("Error updating cart:", updateError);
  //         alert(`Error updating cart: ${updateError.message}`);
  //         return;
  //       }
  //     } else {
  //       updatedProducts = [
  //         {
  //           category: product.category,
  //           image: product.image,
  //           name: product.name,
  //           description: product.description,
  //           price: product.price,
  //           quantity: 1,
  //         },
  //       ];

  //       const { error: insertError } = await supabase
  //         .from("cart_products")
  //         .insert([{ user: userId, products: updatedProducts }]);

  //       if (insertError) {
  //         console.error("Error adding product to cart:", insertError);
  //         alert(`Error adding product to cart: ${insertError.message}`);
  //         return;
  //       }
  //     }
  //       const totalQuantity = updatedProducts.reduce((total, item) => total + item.quantity, 0);

  //     const { error: paymentError } = await supabase
  //       .from("Payment_Orders")
  //       .insert([
  //         {
  //           user: userId,
  //           products: updatedProducts,
  //           payment: "Pending",
  //           quantity: totalQuantity,
  //         },
  //       ]);

  //     if (paymentError) {
  //       console.error("Error inserting payment order:", paymentError);
  //       alert(`Error inserting payment order: ${paymentError.message}`);
  //     } else {
  //       alert(`${product.name} added to cart and Payment Order created successfully!`);
  //     }
  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };





// // import React, { useEffect, useState } from "react";
// // import { supabase } from "../../supabase/supabaseClient";

// // const Shop = () => {
// //   const [products, setProducts] = useState([]); 


  
// //   useEffect(() => {
// //     getRequest();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Shop</h1>
// //       <div className="flex flex-wrap justify-center" >
// //         {products.length > 0 ? (
// //           products.map((product) => (
// //             <div key={product.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
// //               <img src={product.images} alt={product.name} style={{ width: "250px", height: "200px", backgroundSize:"" }} />
// //               <h2>{product.name}</h2>
// //               <p>{product.description}</p>
// //               <p>Price: ${product.price}</p>
// //             </div>
// //           ))
// //         ) : (
// //           <p>Loading products...</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Shop;

