import React, { useEffect, useState } from "react";
import { APP_CONTANTS } from "./constants";
const monthsBack = 12; // How many months to show in dropdown

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

const Accounts = () => {
  const monthOptions = buildMonthList();
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noBills, setNoBills] = useState(false);



  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setNoBills(false);
      try {
        const res = await fetch(
          `${APP_CONTANTS.API_FOR_WEBSITE}/monthlybills/summary/${selectedMonth}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        // console.log("data",data)
        if (data.message === "No bills this month") {
          setSummary(null);
          setNoBills(true);
        } else {
          setSummary(data);
        }
      } catch (err) {
        console.error("Error fetching summary:", err);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [selectedMonth]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 font-poppins mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Monthly Account Summary
      </h1>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="mb-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {monthOptions.map((month) => (
          <option key={month} value={month}>
            {new Date(month + "-01").toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </option>
        ))}
      </select>

      {loading ? (
        <div className="text-gray-500 text-lg mt-4">Loading...</div>
      ) : noBills ? (
        <div className="text-red-500 font-medium text-lg">
          No bills this month
        </div>
      ) : summary ? (
        <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Total Liters:</span>
            <span className="font-semibold">{summary.totalLiters}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Total Bills:</span>
            <span className="font-semibold">{summary.totalBills}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600 font-medium">Paid Bills:</span>
            <span className="font-semibold">{summary.paidCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-600 font-medium">Unpaid Bills:</span>
            <span className="font-semibold">{summary.unpaidCount}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-gray-600 font-medium">Total Amount:</span>
            <span className="font-semibold">₹{summary.totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600 font-medium">
              Amount Collected:
            </span>
            <span className="font-semibold">₹{summary.collectedAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-600 font-medium">Amount Pending:</span>
            <span className="font-semibold">₹{summary.pendingAmount}</span>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-lg">No data available</div>
      )}
    </div>
  );
};

export default Accounts;
