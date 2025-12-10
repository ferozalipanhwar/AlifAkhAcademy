import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaTrash, FaUserEdit, FaUserPlus } from "react-icons/fa";
import API from "../../../apiHelper/api.js";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    password: "",
  });

  // 📌 Fetch Users
  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/user/");
      setUsers(data);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 📌 Add + Update User
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        await API.put(`/user/${editingUser._id}`, formData);
      } else {
        await API.post("/user/add", formData);
      }

      fetchUsers();
      setShowForm(false);
      setEditingUser(null);
      setFormData({ name: "", email: "", role: "User", password: "" });

    } catch (err) {
      console.log("Add/Update Error:", err);
    }
  };

  // 📌 Delete User
  const handleDelete = async (id) => {
    try {
      await API.delete(`/user/${id}`);
      fetchUsers();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  // 📌 Edit User
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.isAdmin ? "Admin" : "User",
      password: "",
    });
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold mb-6"
      >
        👥 Manage Users
      </motion.h1>

      {/* Add User Button */}
      <button
        onClick={() => {
          setShowForm(true);
          setEditingUser(null);
          setFormData({ name: "", email: "", role: "User", password: "" });
        }}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg mb-6 flex items-center gap-2"
      >
        <FaUserPlus /> Add New User
      </button>

      {/* Form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg w-full max-w-3xl"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 bg-gray-700 rounded"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 bg-gray-700 rounded"
            />

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-2 bg-gray-700 rounded"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-2 mb-4 bg-gray-700 rounded"
          />

          <div className="flex justify-end gap-3">
            <button className="bg-green-600 px-4 py-2 rounded flex items-center gap-2">
              <FaCheck /> {editingUser ? "Save Changes" : "Add User"}
            </button>

            <button
              type="button"
              className="bg-red-600 px-4 py-2 rounded flex items-center gap-2"
              onClick={() => setShowForm(false)}
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </motion.form>
      )}

      {/* Users Table */}
      <div className="w-full max-w-5xl overflow-x-auto mt-6">
        <table className="w-full bg-gray-800 rounded-xl">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} className="border-b border-gray-700">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  {u.isAdmin ? "Admin" : "User"}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(u)}
                    className="bg-yellow-500 px-3 py-1 rounded"
                  >
                    <FaUserEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
