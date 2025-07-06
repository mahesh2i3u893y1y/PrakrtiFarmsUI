import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"
import bottle from "../assets/bottle.png"
import { APP_CONTANTS } from './constants';

const Login = () => {
  const [form, setForm] = useState({ userName: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userName || !form.password) {
      setError('Please provide both username and password');
      return;
    }

    try {
      const res = await fetch(`${APP_CONTANTS.API_FOR_WEBSITE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/portal');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err,'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen  flex flex-col lg:flex-row font-poppins">
      {/* Left image on large screens */}
      <div className="hidden lg:flex w-full lg:w-1/2 h-screen items-center justify-center bg-[#378AB7]">
        <img
          src={bottle}
          alt="Login visual"
          className="max-w-full  max-h-full object-contain"
        />
      </div>

      {/* Right form */}
      <div className="w-full h-[100vh] lg:w-1/2 flex  justify-center px-6 pt-0 bg-[#378AB7]">
        <div className="w-full max-w-md">
            <img src={logo} alt='logo' className='' /> 
          <h2 className="text-3xl font-semibold mb-6 text-center text-white">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white">Username</label>
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                autoComplete="username"
                required
                className="mt-1 outline-none block w-full border rounded-md px-3 py-2 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="mt-1 outline-none block w-full border rounded-md px-3 py-2 bg-white"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#002147] text-white py-2 rounded-md cursor-pointer transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
