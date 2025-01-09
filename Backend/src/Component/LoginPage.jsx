import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import video from "../assets/Video/bg2.mp4";
import icon from '../assets/icons/google.png'
import iconTwo from '../assets/icons/facebook.png'
import iconThree from '../assets/icons/twitter.png'

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

  async function handleTwitterLogin() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || "Google login failed!");
    }
  }

  async function handleFacebookLogin() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || "Google login failed!");
    }
  }

  async function handleGoogleLogin() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || "Google login failed!");
    }
  }

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      navigate("/");
    } else if (session) {
      navigate("/home");
    }
  });

  return (
    <>
      <video
        className="absolute inset-0 z-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="min-h-screen max-w-xl m-auto flex items-center">
        <div className="w-full z-10 backdrop-blur-md shadow-lg rounded-lg overflow-hidden">
          <div className="w-full p-6">
            <div className="flex mb-6">
              <button
                onClick={toggleForm}
                className={`w-1/2 py-2 rounded-l-lg text-center font-semibold transition-colors ${
                  isLogin
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={toggleForm}
                className={`w-1/2 py-2 text-center rounded-r-lg font-semibold transition-colors ${
                  !isLogin
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Register
              </button>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
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

            <div className="mt-6 flex">
              <div className="m-auto">
              <button
                onClick={handleGoogleLogin}
                className=" mr-10  "
              ><img src={icon} className="w-12 m-auto"  alt="" />
              </button>
              <button
                onClick={handleFacebookLogin}
                className=" mr-10 "
              ><img src={iconTwo} className="w-12 m-auto"  alt="" />
              </button>
              <button
                onClick={handleTwitterLogin}
                className=" "
              ><img src={iconThree} className="w-12 m-auto"  alt="" />
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
