import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

// import UserPortal from "./components/HeroSection";
// import ProtectedRoute from './components/ProtectedRoute';
// import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Portal from "./components/Portal";
import MonthlyBills from "./components/MonthlyBills";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import useAuthInit from "./utils/useAuthInit";
import AdminLogin from "./components/AdminLogin";
import AdminPortal from "./components/AdminPortal";

import AdminMothlyBill from "./components/AdminMothlyBill";
import Accounts from "./components/Accounts";
import DeletedUsers from "./components/DeletedUsers";
import TodaysList from "./components/TodaysList";
import Customers from "./components/Customers";
import Register from "./components/Register";
import AboutUsMain from "./components/AboutUsMain";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Reviews from "./components/Reviews";

// import { Contact } from "lucide-react";
// import { Provider } from "react-redux";
// import store from "./utils/store";

const App = () => {
  useAuthInit();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/portal" element={<Portal />}>
          <Route index element={<Orders />} />
          <Route path="monthly-bill" element={<MonthlyBills />} />
          <Route path="order-milk" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/admin-portal" element={<AdminPortal />}>
          <Route index element={<Customers />} />
          <Route path="monthly-bill" element={<AdminMothlyBill />} />
          <Route path="todaylist" element={<TodaysList />} />
          <Route path="register" element={<Register />} />
          <Route path="customers" element={<Customers />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="deletedusers" element={<DeletedUsers />} />
        </Route>

        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/aboutus" element={<AboutUsMain/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path='/products' element={<Products/>} />
        <Route path="/reviews" element={<Reviews/>} />
        
      </Routes>
    </Router>
  );
};

export default App;
