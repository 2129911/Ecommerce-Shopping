import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import empty from "../../src/assets/Images/cart/empty.gif";
import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "./redux/cartProduct";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState("Naya Nangal");

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: cart_products, error } = await supabase
            .from("cart_products")
            .select("*")
            .eq("user", user.id);

          if (error) {
            setError(error.message);
          } else {
            setCartProducts(cart_products);
          }
        } else {
          setError("No user is logged in.");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, []);

  const handleChangeAddress = () => {
    const newAddress = prompt("Enter new shipping address:", address);
    if (newAddress) {
      setAddress(newAddress);
    }
  };

  const CheckoutPage = () => {
    navigate("/checkout");
  };

  const totalItems = cartProducts.reduce(
    (total, product) => total + product.products.reduce((sum, item) => sum + item.quantity, 0),
    0
  );
  const totalPrice = cartProducts.reduce(
    (total, product) =>
      total +
      product.products.reduce((sum, item) => sum + item.quantity * item.price, 0),
    0
  );
  console.log(increaseQuantity())
  console.log(decreaseQuantity())

  return (
    <div className="min-h-screen py-8 bg-white">
      {loading ? (
        <p className="text-center text-xl text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-xl text-red-600">Error: {error}</p>
      ) : cartProducts.length > 0 ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Section */}
          <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">SHOPPING CART</h3>

            <div className="grid grid-cols-5 gap-4 font-semibold text-gray-600 mb-4">
              <p>PRODUCT</p>
              <p className="text-center">PRICE</p>
              <p className="text-center">QUANTITY</p>
              <p className="text-center">SUBTOTAL</p>
              <p className="text-center">REMOVE</p>
            </div>
            <hr className="mb-4" />

            {cartProducts.map((cartProduct) =>
              cartProduct.products.map((item, index) => (
                <div
                  key={`${cartProduct.id}-${index}`}
                  className="grid grid-cols-5 text-center items-center gap-4 py-4 border-b hover:bg-gray-50 transition duration-300"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-20 object-cover rounded-lg shadow-md"
                    />
                    <h3 className="text-sm font-semibold text-gray-700">{item.name}</h3>
                  </div>
                  <p className="text-center text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.name))}
                      className="bg-gray-200 px-3 py-1 rounded-l-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <p className="px-4 py-1 bg-gray-100 rounded">{item.quantity}</p>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.name))}
                      className="bg-gray-200 px-3 py-1 rounded-r-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-center text-gray-600">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(cartProduct.id))}
                    className="text-red-500 hover:text-red-700 text-center"
                  >
                    <FaTrashAlt className="transition-transform duration-200 m-auto hover:scale-125" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Shipping Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">PROCEED TO SHIPPING</h3>
            <div className="mb-6">
              <p className="text-gray-600 font-semibold">Total Items:</p>
              <p className="text-xl font-bold">{totalItems}</p>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 font-semibold">Shipping Address:</p>
              <p className="text-xl font-bold">{address}</p>
              <button
                onClick={handleChangeAddress}
                className="mt-2 text-sm text-red-500 hover:underline"
              >
                Change Address
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 font-semibold">Total Price:</p>
              <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={CheckoutPage}
              className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-32">
          <img className="w-1/3 max-w-full" src={empty} alt="Empty Cart" />
          <p className="text-2xl font-semibold text-red-600 mt-4">Your cart is empty!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
