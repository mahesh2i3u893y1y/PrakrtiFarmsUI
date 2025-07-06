import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { APP_CONTANTS } from "./constants";

const API_BASE = `${APP_CONTANTS.API_FOR_WEBSITE}/orders`; // /morning or /evening

export default function TodaysList() {
  const [shift, setShift] = useState("morning");
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState({ totalLiters: 0, literBottles: 0, halfLiterBottles: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async (sh = shift) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${sh}`);
      const json = await res.json();
      setRows(json.users || []);
      setSummary(json.grandTotals || { totalLiters: 0, literBottles: 0, halfLiterBottles: 0 });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData(shift);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shift]);

  /* ---- PDF generation with jsPDF + autoTable ---- */
  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    /* header */
    doc.setFontSize(14);
    doc.text(`Today's ${shift.charAt(0).toUpperCase() + shift.slice(1)} Orders`, 40, 40);

    /* table */
    const body = rows.map((u, idx) => [
      idx + 1,
      u.userId,
      u.name,
      u.phone,
      u.totalQuantity,
      u.literBottles,
      u.halfLiterBottles,
      [
        u.address?.flatOrHouseNumber,
        u.address?.apartmentOrBuildingName,
        u.address?.area,
        u.address?.street,
        u.address?.landmark,
        u.address?.cityOrTown,
        u.address?.district,
        u.address?.state,
        u.address?.pincode,
      ]
        .filter(Boolean)
        .join(", ")
    ]);

    autoTable(doc, {
      startY: 60,
      head: [["S/N", "User ID", "Name", "Phone", "Qty (L)", "1L Bottles", "0.5L Bottles", "Address"]],
      body,
      styles: { fontSize: 8, cellPadding: 3, overflow: "linebreak" },
      headStyles: { fillColor: [241, 245, 249], textColor: 30, halign: "center" },
      columnStyles: {
        4: { halign: "right" },
        5: { halign: "right" },
        6: { halign: "right" },
      },
    });

    /* summary */
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text("Totals:", 40, finalY);
    doc.text(`Liters: ${summary.totalLiters}`, 120, finalY);
    doc.text(`1L Bottles: ${summary.literBottles}`, 220, finalY);
    doc.text(`0.5L Bottles: ${summary.halfLiterBottles}`, 350, finalY);

    doc.save(`orders_${shift}.pdf`);
  };

  return (
    <div className="p-4 font-poppins mt-7">
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <h1 className="text-xl font-bold">Today's Orders</h1>
        <select
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
        </select>
        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      {loading ? (
        <div className="h-60 flex items-center justify-center">
          <span className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border divide-y divide-gray-200">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="px-3 py-2">S/N</th>
                <th className="px-3 py-2">User ID</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">Qty (L)</th>
                <th className="px-3 py-2">1L Bottles</th>
                <th className="px-3 py-2">0.5L Bottles</th>
                <th className="px-3 py-2">Address</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500">
                    No orders
                  </td>
                </tr>
              )}
              {rows.map((u, idx) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">{idx + 1}</td>
                  <td className="px-3 py-2">{u.userId}</td>
                  <td className="px-3 py-2">{u.name}</td>
                  <td className="px-3 py-2">{u.phone}</td>
                  <td className="px-3 py-2 text-center">{u.totalQuantity}</td>
                  <td className="px-3 py-2 text-center">{u.literBottles}</td>
                  <td className="px-3 py-2 text-center">{u.halfLiterBottles}</td>
                  <td className="px-3 py-2 max-w-xs whitespace-pre-wrap">
                    {[u.address?.flatOrHouseNumber, u.address?.apartmentOrBuildingName, u.address?.area, u.address?.street, u.address?.landmark, u.address?.cityOrTown, u.address?.district, u.address?.state, u.address?.pincode].filter(Boolean).join(", ")}
                  </td>
                </tr>
              ))}
              {rows.length > 0 && (
                <tr className="font-semibold bg-gray-50 ">
                  <td colSpan={4} className="px-3 py-2 text-right">Totals</td>
                  <td className="px-3 py-2 text-center">{summary.totalLiters}</td>
                  <td className="px-3 py-2 text-center">{summary.literBottles}</td>
                  <td className="px-3 py-2 text-center">{summary.halfLiterBottles}</td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
