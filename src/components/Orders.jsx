import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Switch from "react-switch";
import LoadingSpinner from "./LoadingSpinner";

import cattel from "../assets/cattel.jpg"
import { APP_CONTANTS } from "./constants";

const Orders = () => {
  const userDetails = useSelector((state) => state.user.user);

  /* ─── local state ─── */
  const [milkPreference, setMilkPreference] = useState({
    morning: { isActive: false, quantity: 0 },
    evening: { isActive: false, quantity: 0 },
  });
  const [loading, setLoading] = useState(false);

  /*  will be true only after the first user-initiated edit  */
  const dirtyRef = useRef(false);

  /* ─── load prefs from Redux once ─── */
  useEffect(() => {
    if (userDetails?.milkPreference) {
      setMilkPreference(userDetails.milkPreference);
      // do NOT set dirtyRef here – this is just hydration
    }
  }, [userDetails]);

  /* ─── handlers ─── */
  const handleToggle = (time) => {
    setMilkPreference((prev) => {
      const qty = prev[time].quantity;
      /* disallow ON if quantity is 0 */
      if (!prev[time].isActive && qty === 0) return prev;

      dirtyRef.current = true;
      return {
        ...prev,
        [time]: { ...prev[time], isActive: !prev[time].isActive },
      };
    });
  };

  const handleQuantityChange = (time, val) => {
    const q = parseFloat(val);
    if (isNaN(q) || q < 0) return;

    setMilkPreference((prev) => {
      dirtyRef.current = true;
      return {
        ...prev,
        [time]: { ...prev[time], quantity: q },
      };
    });
  };

  /* ─── POST only when dirtyRef says it’s a user change ─── */
  useEffect(() => {
    if (!dirtyRef.current) return; // skip first (hydration) run

    const sendUpdate = async () => {
      try {
        setLoading(true);
        await fetch(`${APP_CONTANTS.API_FOR_WEBSITE}milk-preference`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ milkPreference }),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    sendUpdate();
  }, [milkPreference]);

  /* ─── UI ─── */
  if (!userDetails) return <LoadingSpinner />;

  return (
    <div
      className="h-[90vh] w-full flex p-6 flex-col items-center justify-center  font-poppins relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${cattel})`, // replace with actual image path
      }}
    >
      {/* Optional overlay for readability */}
      <div className="absolute inset-0   z-0"></div>

      {/* Main Card */}
      <div className="bg-white/80  backdrop-blur-md shadow-2xl rounded-xl p-6 w-full max-w-md space-y-6 z-10">
        <h2 className="text-3xl font-bold text-center text-green-800">
          Milk Preferences
        </h2>

        {["morning", "evening"].map((time) => (
          <div key={time} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="capitalize font-medium text-gray-700">
                {time} delivery
              </span>
              <Switch
                onChange={() => handleToggle(time)}
                checked={milkPreference[time].isActive}
                offColor="#ccc"
                onColor="#22c55e"
                uncheckedIcon={false}
                checkedIcon={false}
                height={22}
                width={48}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">
                Quantity (litres):
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={milkPreference[time].quantity}
                onChange={(e) => handleQuantityChange(time, e.target.value)}
                disabled={milkPreference[time].isActive}
                className={`border px-3 py-1 rounded-md w-24 text-sm focus:outline-none ${
                  milkPreference[time].isActive
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-white focus:ring-2 focus:ring-green-400"
                }`}
              />
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-center text-sm text-blue-600 font-medium animate-pulse">
            Updating preferences...
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
