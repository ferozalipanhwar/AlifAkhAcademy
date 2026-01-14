import { motion } from "framer-motion";
import {
  Edit2,
  Loader2,
  Mail,
  Plus,
  Search,
  Shield,
  Trash2,
  User,
  Users,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api.js";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
      setFilteredUsers(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔍 Search Logic
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const results = users.filter(u => 
      u.name.toLowerCase().includes(lowerTerm) || 
      u.email.toLowerCase().includes(lowerTerm)
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  // 📌 Add / Update User
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingUser) {
        await API.put(`/user/${editingUser._id}`, formData);
      } else {
        await API.post("/user/add", formData);
      }

      const { data } = await API.get("/user/");
      setUsers(data);
      resetForm();
    } catch (err) {
      console.error("Add/Update Error:", err);
      alert("Failed to save user.");
    } finally {
      setSubmitting(false);
    }
  };

  // 📌 Delete User
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/user/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // 📌 Edit Setup
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.isAdmin ? "Admin" : "User",
      password: "", // Password usually kept empty for security unless changing
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "User", password: "" });
  };

  return (
    <div className="space-y-8 p-2">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="text-emerald-500" /> User Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage system users, roles, and access.</p>
        </div>
        
        <div className="flex items-center bg-[#1a1d21] border border-gray-700 rounded-lg px-3 py-2 w-full md:w-72 focus-within:border-emerald-500 transition-colors">
          <Search size={18} className="text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-300 w-full placeholder-gray-600"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* ================= LEFT: FORM ================= */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-[#1a1d21] border border-white/5 p-6 rounded-2xl sticky top-24 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                {editingUser ? <Edit2 size={18} className="text-yellow-500" /> : <Plus size={18} className="text-emerald-500" />}
                {editingUser ? "Edit User" : "Add New User"}
              </span>
              {editingUser && (
                <button onClick={resetForm} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                  <X size={14} /> Cancel
                </button>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Full Name</label>
                <div className="relative mt-1">
                  <User size={14} className="absolute left-3 top-3.5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-9 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Email Address</label>
                <div className="relative mt-1">
                  <Mail size={14} className="absolute left-3 top-3.5 text-gray-500" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full pl-9 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                   <label className="text-xs text-gray-500 font-medium ml-1">Role</label>
                   <div className="relative mt-1">
                     <Shield size={14} className="absolute left-3 top-3.5 text-gray-500" />
                     <select
                      className="w-full pl-9 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm appearance-none"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                   </div>
                </div>
                <div>
                   <label className="text-xs text-gray-500 font-medium ml-1">Password</label>
                   <input
                    type="password"
                    placeholder={editingUser ? "(Unchanged)" : "********"}
                    className="w-full mt-1 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 mt-4
                  ${editingUser 
                    ? "bg-yellow-600 hover:bg-yellow-700 shadow-yellow-900/20" 
                    : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20"
                  } disabled:opacity-50`}
              >
                {submitting ? <Loader2 className="animate-spin" size={18} /> : (editingUser ? "Update User" : "Create User")}
              </button>
            </form>
          </div>
        </motion.div>

        {/* ================= RIGHT: USER LIST ================= */}
        <div className="lg:col-span-2">
           {loading ? (
             <div className="flex justify-center items-center h-64 text-emerald-500">
               <Loader2 size={40} className="animate-spin" />
             </div>
           ) : filteredUsers.length === 0 ? (
             <div className="bg-[#1a1d21] border border-white/5 rounded-2xl p-10 text-center">
               <p className="text-gray-400">No users found.</p>
             </div>
           ) : (
             <div className="grid sm:grid-cols-2 gap-4">
               {filteredUsers.map((u, index) => (
                 <motion.div
                   key={u._id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.05 }}
                   className="bg-[#1a1d21] border border-white/5 p-5 rounded-2xl shadow-md hover:border-emerald-500/30 transition-all flex items-center justify-between group"
                 >
                   <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner ${u.isAdmin ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                       {u.name.charAt(0).toUpperCase()}
                     </div>
                     <div>
                       <h3 className="font-bold text-white text-sm flex items-center gap-2">
                         {u.name}
                         {u.isAdmin ? (
                           <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">ADMIN</span>
                         ) : (
                           <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">USER</span>
                         )}
                       </h3>
                       <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                         <Mail size={10} /> {u.email}
                       </p>
                     </div>
                   </div>

                   <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(u)}
                        className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(u._id)}
                        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                   </div>
                 </motion.div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;