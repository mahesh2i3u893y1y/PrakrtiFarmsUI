import React, { useEffect, useState } from 'react';
import { APP_CONTANTS } from './constants';

/* ——— API endpoints ——— */
const GET_DELETED_API = `${APP_CONTANTS.API_FOR_WEBSITE}/getalldeletedusers`;
const RESTORE_API     = `${APP_CONTANTS.API_FOR_WEBSITE}/user/restore`; // POST /:id

/* ——— Andhra Pradesh districts (2024) ——— */
const AP_DISTRICTS = [
  'Alluri Sitharama Raju','Anakapalli','Anantapur','Annamayya','Bapatla',
  'Chittoor','Dr. B.R.Ambedkar Konaseema','East Godavari','Eluru','Guntur',
  'Kakinada','Krishna','Kurnool','Manyam','Nandyal','Nellore','NTR','Palnadu',
  'Prakasam','Srikakulam','Tirupati','Visakhapatnam','Vizianagaram',
  'West Godavari','YSR Kadapa'
];

const  DeletedUsersTable = () => {
  /* master list + filtered list */
  const [allUsers, setAllUsers] = useState([]);
  const [users,    setUsers]    = useState([]);
  const [loading,  setLoading]  = useState(true);

  /* filters */
  const [searchTerm, setSearchTerm] = useState('');
  const [district,   setDistrict]   = useState('');

  /* ——— fetch once ——— */
  const fetchDeleted = async () => {
    setLoading(true);
    try {
      const res  = await fetch(GET_DELETED_API);
      const data = await res.json();
      setAllUsers(data);
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchDeleted(); }, []);

  /* ——— client-side filtering ——— */
  useEffect(() => {
    let filtered = allUsers;

    if (district) {
      filtered = filtered.filter(
        u => u.address?.district?.toLowerCase() === district.toLowerCase()
      );
    }
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      filtered = filtered.filter(
        u =>
          u.name.toLowerCase().includes(q) ||
          u.phone?.includes(q) ||
          String(u.userId).includes(q)
      );
    }
    setUsers(filtered);
  }, [searchTerm, district, allUsers]);

  /* ——— restore user ——— */
  const handleRestore = async (id, name) => {
    if (!window.confirm(`Add ${name} back to active users?`)) return;
    try {
      await fetch(`${RESTORE_API}/${id}`, { method: 'POST' });
      fetchDeleted(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  /* ——— UI ——— */
  return (
    <div className="p-4 font-poppins mt-7">
      <h1 className="text-xl font-bold mb-4">Deleted Users</h1>

      {/* filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Name / Phone / userId"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-1/2 focus:outline-none focus:ring focus:border-blue-400"
        />
        <select
          value={district}
          onChange={e => setDistrict(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-56 focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="">All Districts</option>
          {AP_DISTRICTS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {(searchTerm || district) && (
          <button
            onClick={() => { setSearchTerm(''); setDistrict(''); }}
            className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
        )}
      </div>

      {/* table */}
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
                <th className="px-3 py-2">userId</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">userName</th>
                <th className="px-3 py-2">Address</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No deleted users
                  </td>
                </tr>
              )}
              {users.map((u, idx) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">{idx + 1}</td>
                  <td className="px-3 py-2">{u.userId}</td>
                  <td className="px-3 py-2">{u.name}</td>
                  <td className="px-3 py-2">{u.phone}</td>
                  <td className="px-3 py-2">{u.userName}</td>
                  <td className="px-3 py-2 max-w-xs">
                    <div className="overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
                      {[
                        u.address.flatOrHouseNumber,
                        u.address.apartmentOrBuildingName,
                        u.address.area,
                        u.address.street,
                        u.address.landmark,
                        u.address.cityOrTown,
                        u.address.district,
                        u.address.state,
                        u.address.pincode,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </div>
                  </td>
                  <td className="px-3 py-2 flex justify-center">
                    <button
                      onClick={() => handleRestore(u._id, u.name)}
                      className="px-3 py-1 cursor-pointer bg-green-600 text-white text-xs rounded hover:bg-green-700"
                    >
                      Add&nbsp;Back
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

 
export default DeletedUsersTable