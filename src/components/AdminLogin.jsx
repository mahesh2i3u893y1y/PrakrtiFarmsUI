import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { APP_CONTANTS } from './constants';

const AdminLogin = () => {
    const navigate = useNavigate()
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`${APP_CONTANTS.API_FOR_WEBSITE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminName, password }),
        credentials: 'include', // if you're using cookies for session
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Login successful!');
        navigate("/admin-portal/customers")
        // Redirect or set admin state here
      } else {
        setErrorMsg(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen font-poppins bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Name</label>
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
