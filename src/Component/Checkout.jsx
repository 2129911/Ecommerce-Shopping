import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!email || !address) {
      alert("Please fill in all fields.");
      return;
    }

    if (paymentMethod === "Credit Card") {
      navigate("/creditcard"); 
    } else {
    }

    if (paymentMethod === "Dredit Card") {
      navigate("/debitcard"); 
    } else {
    }
  };
  

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Checkout Form */}
        <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h3>
          <form onSubmit={handleCheckout}>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Shipping Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your shipping address"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 font-semibold mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Cash on Delivery</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-3 bg-red-500 text-white py-2 rounded-md hover:bg-red-60 transition-colors duration-300"
            >
              Confirm and Pay
            </button>
          </form>
        </div>

        {/* Right Section: Order Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Order Summary</h3>
          <div>
            {cart.product.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center py-4 border-b"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      ${product.price.toFixed(2)} x {product.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-800">
                  ${(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-gray-600 mb-2">
              <p>Subtotal</p>
              <p>${cart.totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <p>Shipping</p>
              <p>$5.00</p>
            </div>
            <div className="flex justify-between text-gray-800 font-bold text-xl">
              <p>Total</p>
              <p>${(cart.totalPrice + 5).toFixed(2)}</p>
            </div>
            <button
            onClick={ () => {
              navigate('/cart'); 
            }}
            
              type="submit"
              className="w-full mt-3 bg-red-500 text-white py-2 rounded-md hover:bg-red-60 transition-colors duration-300"
            >
              Go to Cart
            </button>          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
