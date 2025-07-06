import React from "react";
import { useSelector } from "react-redux";
import {
  FaPhoneAlt,
  FaIdBadge,
  FaHome,
  FaBuilding,
  FaRoad,
  FaMapPin,
  FaMapSigns,
  FaCity,
  FaGlobeAsia,
  FaBarcode,
  FaRegAddressCard,
} from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";

const InfoLine = ({ icon: Icon, label }) => {
  if (!Icon) return null;
  return (
    <div className="flex items-center gap-2">
      <Icon className="text-emerald-600 shrink-0" />
      <span className="truncate text-sm sm:text-base">{label || "—"}</span>
    </div>
  );
};

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) return <LoadingSpinner />;

  const {
    address: {
      flatOrHouseNumber,
      apartmentOrBuildingName,
      street,
      landmark,
      area,
      cityOrTown,
      district,
      pincode,
      state,
    } = {},
  } = user;

  return (
    <div className="h-[80vh] flex font-poppins items-center justify-center px-4 py-10 mt-10">
      <div className="w-full max-w-4xl backdrop-blur-md mt-5  p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col items-center md:items-start md:w-1/3">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
              className="w-36 h-36 rounded-full shadow-lg ring-4 ring-emerald-400 mb-4"
            />
            <h2 className="text-3xl font-bold  mb-1">
              {user.name}
            </h2>
            <p className="text-emerald-600 dark:text-emerald-400 text-lg mb-2">
              @{user.userName}
            </p>
            <InfoLine icon={FaIdBadge} label={`User ID: ${user.userId}`} />
          </div>

          {/* Right side info */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Contact */}
            <section className="w-full rounded-2xl p-6 shadow-sm bg-white/90 dark:bg-white/10 border border-emerald-200 dark:border-emerald-700">
              <h3 className="text-xl font-semibold mb-4  border-b border-emerald-200 dark:border-emerald-600 pb-2">
                Contact
              </h3>
              <InfoLine icon={FaPhoneAlt} label={user.phone} />
            </section>

            {/* Address */}
            <section className="w-full rounded-2xl p-6 shadow-sm bg-white/90 dark:bg-white/10 border border-indigo-200 dark:border-indigo-700">
              <h3 className="text-xl font-semibold mb-4 border-b border-indigo-200 dark:border-indigo-600 pb-2">
                Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  ">
                <InfoLine icon={FaHome} label={flatOrHouseNumber} />
                <InfoLine icon={FaBuilding} label={apartmentOrBuildingName} />
                <InfoLine icon={FaRoad} label={street} />
                <InfoLine icon={FaMapPin} label={landmark} />
                <InfoLine icon={FaMapSigns} label={area} />
                <InfoLine icon={FaCity} label={cityOrTown} />
                <InfoLine icon={FaGlobeAsia} label={district} />
                <InfoLine icon={FaBarcode} label={pincode} />
                <InfoLine icon={FaRegAddressCard} label={state} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
