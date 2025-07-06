// UserSignupForm.jsx
import React, { useState } from "react";
import { APP_CONTANTS } from "./constants";

const initialForm = {
  name: "",
  phone: "",
  userName: "",
  address: {
    flatOrHouseNumber: "",
    apartmentOrBuildingName: "",
    area: "",
    street: "",
    landmark: "",
    pincode: "",
    cityOrTown: "",
    state: "",
    district: "",
  },
};

const Register = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  /* ------------ helpers ------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // top-level field
    if (!name.startsWith("address.")) {
      setForm((f) => ({ ...f, [name]: value }));
      return;
    }

    // nested address field
    const key = name.split(".")[1];
    setForm((f) => ({
      ...f,
      address: { ...f.address, [key]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      const res = await fetch(`${APP_CONTANTS.API_FOR_WEBSITE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          userId: Number(form.userId), 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }
      console.log("daata", data)
      setMsg({ type: "success", text: "User created ✅" });
      setForm(initialForm);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  /* ------------ UI ------------ */
  const inputCls =
    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-3xl mt-5 font-poppins mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create New User
      </h2>

      {msg.text && (
        <p
          className={`mb-4 text-center ${
            msg.type === "success" ? "text-green-600" : "text-red-500"
          }`}
        >
          {msg.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ─── Basic Info ─── */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelCls}>Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputCls}
              required
            />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputCls}
              required
            />
          </div>
          <div>
            <label className={labelCls}>Username</label>
            <input
              name="userName"
              value={form.userName}
              onChange={handleChange}
              className={inputCls}
              required
            />
          </div>
        </div>

        {/* ─── Address ─── */}
        <fieldset className="border rounded-md p-4">
          <legend className="px-2 text-sm font-semibold text-gray-600">
            Address
          </legend>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Flat / House No."
              name="address.flatOrHouseNumber"
              value={form.address.flatOrHouseNumber}
              onChange={handleChange}
              className={inputCls}
            />
            <input
              placeholder="Apartment / Building"
              name="address.apartmentOrBuildingName"
              value={form.address.apartmentOrBuildingName}
              onChange={handleChange}
              className={inputCls}
            />
            <input
              placeholder="Area"
              name="address.area"
              value={form.address.area}
              onChange={handleChange}
              className={inputCls}
            />
            <input
              placeholder="Street"
              name="address.street"
              value={form.address.street}
              onChange={handleChange}
              className={inputCls}
            />
            <input
              placeholder="Landmark"
              name="address.landmark"
              value={form.address.landmark}
              onChange={handleChange}
              className={inputCls}
            />
            <input
              placeholder="Pincode"
              name="address.pincode"
              value={form.address.pincode}
              onChange={handleChange}
              className={inputCls}
            />
            <input
              placeholder="City / Town"
              name="address.cityOrTown"
              value={form.address.cityOrTown}
              onChange={handleChange}
              className={inputCls}
            />
            <input
              placeholder="State"
              name="address.state"
              value={form.address.state}
              onChange={handleChange}
              className={inputCls}
            />
            <input
              placeholder="District"
              name="address.district"
              value={form.address.district}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting…" : "Create User"}
        </button>
      </form>
    </div>
  );
}


export default Register