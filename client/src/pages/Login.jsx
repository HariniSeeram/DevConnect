import { useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import { toast } from "react-toastify";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success("Login Successful");

      window.location.href = "/dashboard";

    } catch (error) {

      toast.error("Login Failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center px-5 bg-transparent">

      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-[40px] overflow-hidden glass shadow-2xl">

        <div className="hidden md:flex flex-col justify-center p-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">

          <h1 className="text-6xl font-extrabold text-white leading-tight mb-6">

            DevConnect

          </h1>

          <p className="text-xl text-blue-100 leading-relaxed">

            Build your developer portfolio,
            manage projects, showcase skills,
            and create a professional online presence.

          </p>

        </div>

        <div className="p-10 md:p-14 bg-[#111827]/90">

          <h2 className="text-4xl font-extrabold gradient-text mb-3">

            Welcome Back

          </h2>

          <p className="text-gray-400 mb-10">

            Login to continue your journey

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="block mb-2 text-sm text-gray-300">

                Email Address

              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="modern-input"
                required
              />

            </div>

            <div>

              <label className="block mb-2 text-sm text-gray-300">

                Password

              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="modern-input"
                required
              />

            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg hover:scale-[1.02] transition duration-300"
            >

              Login

            </button>

          </form>

          <p className="text-gray-400 mt-8 text-center">

            Don’t have an account?
            {" "}

            <Link
              to="/register"
              className="text-blue-400 font-semibold hover:text-purple-400"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;