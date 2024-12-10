import React, { useState } from "react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Slider */}
        <div className="flex">
          <button
            onClick={toggleForm}
            className={`w-1/2 py-2 text-center font-semibold transition-colors ${
              isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={toggleForm}
            className={`w-1/2 py-2 text-center font-semibold transition-colors ${
              !isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {isLogin ? (
            // Login Form
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-gray-600 mb-2"
                    htmlFor="loginEmail"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-600 mb-2"
                    htmlFor="loginPassword"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Login
                </button>
              </form>
            </div>
          ) : (
            // Register Form
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-gray-600 mb-2"
                    htmlFor="registerName"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="registerName"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-600 mb-2"
                    htmlFor="registerEmail"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="registerEmail"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-600 mb-2"
                    htmlFor="registerPassword"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="registerPassword"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Register
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
