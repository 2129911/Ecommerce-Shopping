import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const CreditCardPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardNumber || !expiryDate || !cvv || !name) {
      alert("Please fill in all the required fields.");
      return;
    }

    alert("Credit Card Payment Successful!"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Enter Credit Card Details
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name as on card"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Card Number
            </label>
            <input
              type="text"
              maxLength={16}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1234 5678 9123 4567"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                CVV
              </label>
              <input
                type="password"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123"
                required
              />
            </div>
          </div>

          <button
            type="submit"

            onClick={() => {
              navigate('/ordersummary'); 
            }}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreditCardPayment;
