import { motion } from "framer-motion";
import { useState } from "react";
import { FaCheck, FaTimes, FaTrash, FaUserEdit, FaUserPlus } from "react-icons/fa";

const UsersList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Feroz Ali", email: "feroz@example.com", role: "Admin" },
    { id: 2, name: "Ali Raza", email: "ali@example.com", role: "User" },
    { id: 3, name: "Sara Khan", email: "sara@example.com", role: "User" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "User" });

  // 🧩 Handle Add/Edit Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill all fields");
      return;
    }

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...editingUser, ...formData } : u
        )
      );
      setEditingUser(null);
    } else {
      setUsers([...users, { id: Date.now(), ...formData }]);
    }

    setFormData({ name: "", email: "", role: "User" });
    setShowForm(false);
  };

  // 🧩 Delete User
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // 🧩 Edit User
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 flex items-center gap-2"
      >
        👥 Manage Users
      </motion.h1>

      {/* Add / Edit User Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          setShowForm(true);
          setEditingUser(null);
          setFormData({ name: "", email: "", role: "User" });
        }}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg mb-6"
      >
        <FaUserPlus /> Add New User
      </motion.button>

      {/* Add / Edit Form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 w-full max-w-3xl"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaCheck /> {editingUser ? "Save Changes" : "Add User"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingUser(null);
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </motion.form>
      )}

      {/* User Table */}
      <div className="w-full max-w-5xl overflow-x-auto">
        <table className="w-full border-collapse bg-gray-800 rounded-xl shadow-lg text-left">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-700 hover:bg-gray-750 transition-all"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-semibold text-blue-400">
                  {user.name}
                </td>
                <td className="py-3 px-4 text-gray-300">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.role === "Admin"
                        ? "bg-yellow-500 text-black"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-lg flex items-center gap-1 text-sm"
                  >
                    <FaUserEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg flex items-center gap-1 text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
