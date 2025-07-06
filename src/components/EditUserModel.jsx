import React, { useState } from 'react';
import { APP_CONTANTS } from './constants';

const API = `${APP_CONTANTS.API_FOR_WEBSITE}/user`;

const  EditUserModal = ({ user, onClose, onSaved }) => {
  const [form, setForm] = useState({ ...user });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // nested address fields prefixed with "address."
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setForm((f) => ({ ...f, address: { ...f.address, [key]: value } }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API}/${user._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) onSaved();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    'w-full border px-2 py-1 rounded text-sm focus:outline-none focus:ring focus:border-blue-400';

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputCls}
              placeholder="Name"
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputCls}
              placeholder="Phone"
              required
            />
            <input
              name="userName"
              value={form.userName}
              onChange={handleChange}
              className={inputCls}
              placeholder="userName"
              required
            />
            <input
              name="userId"
              type="number"
              value={form.userId}
              onChange={handleChange}
              className={inputCls}
              placeholder="userId"
              required
            />
          </div>

          <fieldset className="border p-3 rounded">
            <legend className="text-sm font-medium px-1">Address</legend>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['flatOrHouseNumber', 'Flat/House'],
                ['apartmentOrBuildingName', 'Building'],
                ['area', 'Area'],
                ['street', 'Street'],
                ['landmark', 'Landmark'],
                ['pincode', 'Pincode'],
                ['cityOrTown', 'City/Town'],
                ['district', 'District'],
                ['state', 'State'],
              ].map(([key, placeholder]) => (
                <input
                  key={key}
                  name={`address.${key}`}
                  value={form.address[key] || ''}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder={placeholder}
                />
              ))}
            </div>
          </fieldset>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 cursor-pointer rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-1 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default EditUserModal