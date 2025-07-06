import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import { APP_CONTANTS } from "./constants";

// const MILK_RATE = 90;
// const userId = "6845c3aa5a0102269b49f98a"; 
const monthsBack = 12;

function buildMonthList() {
  const list = [];
  const today = new Date();
  for (let i = 0; i < monthsBack; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    list.push(`${year}-${month}`);
  }
  return list;
}

const MonthlyBills = () => {
   const userDetails = useSelector((state) => state.user.user);
  const monthOptions = useMemo(buildMonthList, []);
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const userId = userDetails._id

  useEffect(() => {
    const fetchBillData = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const res = await fetch(`${APP_CONTANTS.API_FOR_WEBSITE}/${userId}/${selectedMonth}`);
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          throw new Error("Invalid JSON response");
        }
        const data = await res.json();

        console.log("dataUser",data)

        if (!data.dailyOrders || data.dailyOrders.length === 0) {
          setBillData(null);
          setErrorMsg("No orders this month.");
        } else {
          setBillData(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setErrorMsg("Failed to fetch bill data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBillData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  const dailySummary = useMemo(() => {
    if (!billData?.dailyOrders) return {};

    const grouped = billData.dailyOrders.reduce((acc, order) => {
      const { date, shift, quantity, isActive } = order;
      (acc[date] ??= { morning: null, evening: null })[shift] = {
        quantity,
        isActive,
      };
      return acc;
    }, {});

    return grouped;
  }, [billData]);

   if (!userDetails) return <LoadingSpinner/>;

  return (
    <div className="p-6 font-poppins min-h-screen mt-10 lg:ml-50">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Monthly Milk Bill Summary
      </h2>

      <div className="mb-6 text-center">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {monthOptions.map((month) => (
            <option key={month} value={month}>
              {new Date(`${month}-01`).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading...</div>
      ) : errorMsg ? (
        <div className="text-center text-red-500 font-medium">{errorMsg}</div>
      ) : (
        billData && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-gray-600 font-medium">Total Litres</p>
                  <p className="font-bold">{billData.bill.totalLiters}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Total Amount</p>
                  <p className="font-bold">₹{billData.bill.amount}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Payment Status</p>
                  <p
                    className={`font-bold ${
                      billData.bill.status === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {billData.bill.status.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Daily Orders</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.keys(dailySummary)
                  .sort()
                  .map((date) => {
                    const day = dailySummary[date];
                    const morning = day.morning || {
                      quantity: 0,
                      isActive: false,
                    };
                    const evening = day.evening || {
                      quantity: 0,
                      isActive: false,
                    };

                    let bg = "bg-red-200";
                    if (morning.isActive && evening.isActive)
                      bg = "bg-green-200";
                    else if (morning.isActive || evening.isActive)
                      bg = "bg-orange-200";

                    return (
                      <div
                        key={date}
                        className={`rounded-lg p-4 shadow ${bg}`}
                      >
                        <p className="font-bold mb-1">{date}</p>
                        <p>
                          Morning:{" "}
                          {morning.isActive
                            ? `Ordered – ${morning.quantity}L`
                            : "Skipped – 0L"}
                        </p>
                        <p>
                          Evening:{" "}
                          {evening.isActive
                            ? `Ordered – ${evening.quantity}L`
                            : "Skipped – 0L"}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MonthlyBills;
