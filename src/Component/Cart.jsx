import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import empty from "../../src/assets/Images/cart/empty.gif";
import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "./redux/cartProduct";
   import { useNavigate } from 'react-router-dom';
 
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("Naya Nangal");

  const handleChangeAddress = () => {
    const newAddress = prompt("Enter new shipping address:", address);
    if (newAddress) {
      setAddress(newAddress);
    }
  };
  function CheckoutPage() {
    navigate('/checkout'); 

  }

  return (
    <div className="min-h-screen py-8 bg-white">
      {cart.product.length > 0 ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Section */}
          <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 transition-transform duration-500 hover:scale-105">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              SHOPPING CART
            </h3>

            <div className="grid grid-cols-5 gap-4 font-semibold text-gray-600 mb-4">
              <p>PRODUCT</p>
              <p className="text-center">PRICE</p>
              <p className="text-center">QUANTITY</p>
              <p className="text-center">SUBTOTAL</p>
              <p className="text-center">REMOVE</p>
            </div>
            <hr className="mb-4" />

            <div>
              {cart.product.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-5 items-center gap-4 py-4 border-b hover:bg-gray-50 transition duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                    <h3 className="text-lg font-semibold text-gray-700">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-center text-gray-600">
                    ${(product.price || 0).toFixed(2)}
                  </p>

                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(product.id))}
                      className="bg-gray-200 px-3 py-1 rounded-l-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <p className="px-4 py-1 bg-gray-100 rounded">
                      {product.quantity}
                    </p>
                    <button
                      onClick={() => dispatch(increaseQuantity(product.id))}
                      className="bg-gray-200 px-3 py-1 rounded-r-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-center text-gray-600">
                    ${(product.quantity * product.price || 0).toFixed(2)}
                  </p>

                  <button
                    onClick={() => dispatch(removeFromCart(product.id))}
                    className="text-red-500 hover:text-red-700 text-center"
                  >
                    <FaTrashAlt className="transition-transform duration-200 hover:scale-125" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-500 hover:scale-105">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              PROCEED TO SHIPPING
            </h3>

            <div className="mb-6">
              <p className="text-gray-600 font-semibold">Total Items:</p>
              <p className="text-xl font-bold">{cart.totalQuantity}</p>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 font-semibold">Shipping Address:</p>
              <p className="text-xl font-bold">{address}</p>
              <button
                onClick={handleChangeAddress}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                Change Address
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 font-semibold">Total Price:</p>
              <p className="text-xl font-bold">
                ${(cart.totalPrice || 0).toFixed(2)}
              </p>
            </div>

            <button onClick={CheckoutPage} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-32">
          <img
            className="w-1/3 max-w-full animate-pulse"
            src={empty}
            alt="Empty Cart"
          />
          <p className="text-2xl font-semibold text-red-600 mt-4">
            Your cart is empty!
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
