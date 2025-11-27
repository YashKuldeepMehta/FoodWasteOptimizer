import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../pages/Sidebar";
import "../css/status-update.css";
import {toast} from 'react-toastify'

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [actions, setActions] = useState({}); 
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/admin/users`);
      setUsers(res.data);

    } catch (err) {
        console.log(err)
        toast.error("Error while fetching",{position:"top-center",autoClose:2000})
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (userId, value) => {
    setActions(prev => ({ ...prev, [userId]: value }));
  };

  const handleUpdate = async (user) => {
    const chosen = actions[user.id];
    if (!chosen) {
      toast.error("Select activate deactivate first",{position:"top-center",autoClose:1500})
      return;
    }

    const status = chosen === "activate" ? "active" : "inactive";

    try {
      await axios.put(`http://localhost:5000/admin/user/status`, {
        user_id: user.id,
        role: user.role,
        status
      });

      toast.success(`${user.name || user.email} set to ${status}`,{position:"top-center", autoClose:2000});
      await fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Update failed",{position:"top-center",autoClose:1500});
    } 
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-users-container">
      <Sidebar />

      <div className="admin-users-content">
        <h2>Manage Users</h2>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Choose</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name || "-"}</td>
                <td>{u.email}</td>
                <td className="role">{u.role}</td>
                <td className={u.status === "active" ? "status-active" : "status-inactive"}>
                  {u.status.charAt(0).toUpperCase()+ u.status.slice(1)}
                </td>

                <td>
                  <select
                    value={actions[u.id] || ""}
                    onChange={(e) => handleSelect(u.id, e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    <option value="activate">Activate</option>
                    <option value="deactivate">Deactivate</option>
                  </select>
                </td>

                <td>
                  <button className="update-btn" onClick={() => handleUpdate(u)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
