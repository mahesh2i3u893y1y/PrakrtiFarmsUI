import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUserDetails } from "../utils/userSlice";
import { APP_CONTANTS } from "./constants";

const LoginPopup = ({ onClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [form, setForm] = useState({ userName: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${APP_CONTANTS.API_FOR_WEBSITE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("data",data)
      if (res.ok) {
        // alert('Login Successful!');
        dispatch(setUserDetails(data.user))
        onClose();
        navigate("/portal/order-milk");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 p-5 z-[60]  pt-[30%] md:pt-0 flex items-start md:items-center justify-center bg-black/50 bg-opacity-50 font-poppins">
      <div className="bg-white py-10 w-[90%] sm:[80%] md:w-[450px] p-6 rounded-xl shadow-lg  relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col ">
          <label className="mb-1 font-semibold">Username:</label>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={form.userName}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md mb-2"
          />
          <label className="mb-1 font-semibold">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-[#31cc83] cursor-pointer text-white py-2 mt-4 rounded-md  transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
