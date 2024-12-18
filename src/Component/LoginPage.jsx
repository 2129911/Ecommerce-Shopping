import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import svg from "../assets/svg/svg.png";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  function handleChange(e) {
    const { id, value } = e.target;

    setUser((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const { email, password } = user;

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        console.log(data);
        navigate("/home");

        alert("Login Successful!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        alert("Registration Successful! Please check your email.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Image Section */}
        <div className="relative hidden md:block">
          <img src={svg} alt="Illustration" className="w-full h-full object-cover" />
        </div>

        {/* Form Section */}
        <div className="w-full p-6">
          <div className="flex mb-6">
            <button
              onClick={toggleForm}
              className={`w-1/2 py-2 text-center font-semibold transition-colors ${
                isLogin ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={toggleForm}
              className={`w-1/2 py-2 text-center font-semibold transition-colors ${
                !isLogin ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Register
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isLogin ? "Login" : "Register"}
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={user.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
