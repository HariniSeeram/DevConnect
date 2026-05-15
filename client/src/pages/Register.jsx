import { useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import { toast } from "react-toastify";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
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

      await API.post(
        "/auth/register",
        formData
      );

      toast.success(
        "Registration Successful"
      );

      window.location.href = "/login";

    } catch (error) {

      toast.error(
        "Registration Failed"
      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center px-5 bg-transparent">

      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-[40px] overflow-hidden glass shadow-2xl">

        <div className="hidden md:flex flex-col justify-center p-14 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700">

          <h1 className="text-6xl font-extrabold text-white leading-tight mb-6">

            Join DevConnect

          </h1>

          <p className="text-xl text-pink-100 leading-relaxed">

            Create your developer identity,
            showcase projects, upload portfolios,
            and stand out to recruiters.

          </p>

        </div>

        <div className="p-10 md:p-14 bg-[#111827]/90">

          <h2 className="text-4xl font-extrabold gradient-text mb-3">

            Create Account

          </h2>

          <p className="text-gray-400 mb-10">

            Start building your portfolio

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="block mb-2 text-sm text-gray-300">

                Full Name

              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="modern-input"
                required
              />

            </div>

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
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className="modern-input"
                required
              />

            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg hover:scale-[1.02] transition duration-300"
            >

              Register

            </button>

          </form>

          <p className="text-gray-400 mt-8 text-center">

            Already have an account?
            {" "}

            <Link
              to="/login"
              className="text-pink-400 font-semibold hover:text-purple-400"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Register;