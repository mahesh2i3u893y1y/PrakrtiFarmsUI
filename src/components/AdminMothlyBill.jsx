import React, { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { APP_CONTANTS } from "./constants";

function strToDate(ydm) {
  const [y, d, m] = ydm.split("-");
  return new Date(`${y}-${m}-${d}`); // turn YYYY-DD-MM ➜ Date
}

/* ─── Build dropdown of last N months ─── */
const monthsBack = 12;
function buildMonthList() {
  const out = [];
  const d = new Date();
  d.setDate(1);
  for (let i = 0; i < monthsBack; i++) {
    out.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleString("default", { month: "long", year: "numeric" }),
    });
    d.setMonth(d.getMonth() - 1);
  }
  return out;
}
const monthList = buildMonthList();

/* ─────────────────────────────────────────────────────────── */
const AdminMonthlyBills = () => {
  const [selectedMonth, setSelectedMonth] = useState(monthList[0].key);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [expandedUser, setExpandedUser] = useState();
  const [search, setSearch] = useState("");

  /* ─── Fetch when month changes ─── */
  useEffect(() => {
    const ctl = new AbortController();
    (async () => {
      setLoading(true);
      setError(undefined);
      try {
        // adjust base URL to your proxy /env as needed
        const res = await fetch(`${APP_CONTANTS.API_FOR_WEBSITE}/${selectedMonth}`, {
          signal: ctl.signal,
        });
        if (!res.ok) throw new Error(`API ${res.status}`);
        setRecords(await res.json());
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
    return () => ctl.abort();
  }, [selectedMonth]);

  /* ─── Patch payment status ─── */
  const togglePaymentStatus = async (billId, current) => {
    const next = current === "paid" ? "unpaid" : "paid";
    window.confirm("Change payment stauts")
    try {
      const r = await fetch(`${APP_CONTANTS.API_FOR_WEBSITE}/bills/${billId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!r.ok) throw new Error("patch failed");
      setRecords((prev) =>
        prev.map((rec) =>
          rec.bill._id === billId
            ? { ...rec, bill: { ...rec.bill, status: next } }
            : rec
        )
      );
    } catch (e) {
      console.error(e);
      alert("Unable to update status");
    }
  };

  /* ─── Filter & enrich for UI ─── */
  const view = useMemo(() => {
    const term = search.trim().toLowerCase();
    return records
      .filter((rec) => {
        if (!term) return true;
        const { user } = rec;
        return (
          String(user.userId ?? "")
            .toLowerCase()
            .includes(term) ||
          user._id.toLowerCase().includes(term) ||
          user.name.toLowerCase().includes(term) ||
          user.phone.toLowerCase().includes(term)
        );
      })
      .map((rec) => {
        const byDay = rec.dailyOrders.reduce((acc, o) => {
          (acc[o.date] ??= { morning: null, evening: null })[o.shift] = o;
          return acc;
        }, {});
        const dayKeys = Object.keys(byDay).sort(
          (a, b) => strToDate(a) - strToDate(b)
        );
        return { ...rec, byDay, dayKeys };
      });
  }, [records, search]);

  {
    !loading && !error && view.length === 0 && (
      <p className="text-center">No orders in this month.</p>
    );
  }

  /* ─── Download PDF with jspdf‑autotable ─── */
  const downloadPdf = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const head = [
      ["User ID", "Customer", "Phone", "Litres", "Amount (₹)", "Status"],
    ];
    const body = view.map(({ user, bill }) => [
      user.userId ?? user._id,
      user.name,
      user.phone,
      bill.totalLiters,
      bill.amount,
      bill.status,
    ]);
    autoTable(doc, { head, body, startY: 20 });
    doc.save(`bills-${selectedMonth}.pdf`);
  };

  /* ─── UI ─── */
  return (
    <div className="p-6 font-poppins mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Milk Bills</h2>

      {/* controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          <label className="font-medium">Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border p-2 rounded"
          >
            {monthList.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Search name, phone, ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[200px]"
        />
        <button
          onClick={downloadPdf}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      {loading && <p className="text-center">Loading…</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && view.length === 0 && (
        <p className="text-center">No orders in this month.</p>
      )}

      {!loading && !error && view.length > 0 && (
        <div className="overflow-x-auto">
          <table id="admin-bill-table" className="min-w-full text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">User&nbsp;ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Litres</th>
                <th className="p-3">Amount (₹)</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {view.map((row) => {
                const open = expandedUser === row.user._id;
                const { user, bill, byDay, dayKeys } = row;
                return (
                  <React.Fragment key={user._id}>
                    <tr className="border-b">
                      <td className="p-3 text-xs break-all">
                        {user.userId ?? user._id}
                      </td>
                      <td className="p-3 whitespace-nowrap font-medium">
                        {user.name}
                        <br />
                        <span className="text-xs text-gray-500">
                          {user.phone}
                        </span>
                      </td>
                      <td className="p-3">{bill.totalLiters}</td>
                      <td className="p-3">₹{Number(bill.amount).toFixed(2)}</td>
                      <td className="p-3">
                        <button
                          onClick={() =>
                            togglePaymentStatus(bill._id, bill.status)
                          }
                          className={`px-3 py-1 rounded text-white ${
                            bill.status === "paid"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {bill.status === "paid" ? "Paid" : "Pending"}
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() =>
                            setExpandedUser(open ? undefined : user._id)
                          }
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          {open ? "Hide Details" : "View Details"}
                        </button>
                      </td>
                    </tr>
                    {open && (
                      <tr>
                        <td colSpan={6} className="p-4">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {dayKeys.map((date) => {
                              const day = byDay[date];
                              const morning = day.morning;
                              const evening = day.evening;
                              let bg = "bg-red-200";
                              if (morning && evening) bg = "bg-green-200";
                              else if (morning || evening) bg = "bg-orange-200";
                              return (
                                <div
                                  key={date}
                                  className={`rounded-lg shadow-md p-4 text-sm ${bg}`}
                                >
                                  <p className="font-bold mb-1">{date}</p>
                                  <p>
                                    Morning:&nbsp;
                                    {morning
                                      ? `${morning.quantity}L`
                                      : "Skipped"}
                                  </p>
                                  <p>
                                    Evening:&nbsp;
                                    {evening
                                      ? `${evening.quantity}L`
                                      : "Skipped"}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMonthlyBills;
