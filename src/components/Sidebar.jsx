import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { APP_CONTANTS } from "./constants";

const Sidebar = ({ isOpen, closeSidebar,userName }) => {
  const location = useLocation();
  const navigate = useNavigate()
  const currentPath = location.pathname;


const handleLogOut = async () => {
  try {

    const res = await fetch(`${APP_CONTANTS.API_FOR_WEBSITE}/logout`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
    })

    if(res.ok){
      navigate("/")
    }
    if(!res) throw new Error 

    const data =  await res.json()
    console.log(data)
    

  }catch(err){
    console.log(err)
  }
}
  



  return (
    <div
      className={`fixed top-0 md:top-0 ${
        isOpen ? "right-0" : "-right-64"
      } h-[100vh] md:right-auto md:left-0  w-64 md:pt-30 bg-green-100 font-poppins p-6 transition-all duration-300 ease-in-out z-30 shadow-lg md:translate-x-0`}
    >
      {/* Close button for mobile */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={closeSidebar}
          className="text-gray-600 text-xl font-bold cursor-pointer"
        >
          ✕
        </button>
      </div>

      <p className="ml-3 font-semibold md:hidden">{userName}</p>

      <nav className="flex flex-col gap-4 font-medium text-gray-800 pt-6">
        <NavLink
          to="/portal/order-milk"
          onClick={closeSidebar}
          className={`px-4 py-2 rounded transition ${
            currentPath.includes("order-milk")
              ? "bg-green-600 text-white"
              : "hover:bg-green-300"
          }`}
        >
          Order Milk
        </NavLink>

        <NavLink
          to="/portal/monthly-bill"
          onClick={closeSidebar}
          className={`px-4 py-2 rounded transition ${
            currentPath.includes("monthly-bill")
              ? "bg-green-600 text-white"
              : "hover:bg-green-300"
          }`}
        >
          Monthly Bill
        </NavLink>

        <NavLink
          to="/portal/profile"
          onClick={closeSidebar}
          className={`px-4 py-2 rounded transition ${
            currentPath.includes("profile")
              ? "bg-green-600 text-white"
              : "hover:bg-green-300"
          }`}
        >
          Profile
        </NavLink>

        <button onClick={handleLogOut} className="text-start cursor-pointer font-bold pl-4 hover:bg-green-600 px-4 py-2 rounded transition hover:text-white">
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
