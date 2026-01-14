import { AnimatePresence, motion } from "framer-motion";
import {
  Loader2,
  Mail,
  MessageSquare,
  Reply,
  Search,
  Trash2
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api.js";
// 👇 Import your custom AlertBox (Adjust path if necessary)
import AlertBox from "../../../components/UniversalComponents/AlertBox.jsx";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // 👇 New State for Alert
  const [alertInfo, setAlertInfo] = useState(null);

  // 🚀 Fetch Contacts
  const fetchContacts = async () => {
    try {
      const res = await API.get("/contact/all");
      const data = Array.isArray(res.data.contacts) ? res.data.contacts : [];
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      console.error(err);
      // Optional: Show alert on load failure
      setAlertInfo({ message: "Failed to load messages", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 🔍 Search Logic
  useEffect(() => {
    const results = contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(results);
  }, [searchTerm, contacts]);

  // 🗑 Delete Contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await API.delete(`/contact/${id}`);
      const updated = contacts.filter((msg) => msg._id !== id);
      setContacts(updated);
      setFilteredContacts(updated);

      // ✅ Trigger Success Alert
      setAlertInfo({ 
        message: "Message deleted successfully!", 
        type: "success" 
      });

    } catch (err) {
      console.error(err);
      // ❌ Trigger Error Alert
      setAlertInfo({ 
        message: err.response?.data?.message || "Failed to delete message.", 
        type: "error" 
      });
    }
  };

  return (
    <div className="space-y-6 relative">
      
      {/* 👇 Render AlertBox if alertInfo exists */}
      {alertInfo && (
        <AlertBox 
          message={alertInfo.message} 
          type={alertInfo.type} 
          onClose={() => setAlertInfo(null)} 
        />
      )}

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="text-emerald-500" /> Inbox
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Read and manage inquiries from students and visitors.
          </p>
        </div>

        <div className="flex items-center bg-[#1a1d21] border border-gray-700 rounded-lg px-3 py-2 w-full md:w-72 focus-within:border-emerald-500 transition-colors">
          <Search size={18} className="text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-300 w-full placeholder-gray-600"
          />
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex justify-center items-center h-64 text-emerald-500">
          <Loader2 size={40} className="animate-spin" />
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="bg-[#1a1d21] border border-white/5 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
            <Mail size={32} />
          </div>
          <h3 className="text-lg font-medium text-white">No messages found</h3>
          <p className="text-gray-400 text-sm">Your inbox is currently empty.</p>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredContacts.map((msg, index) => (
              <motion.div
                layout
                key={msg._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="bg-[#1a1d21] border border-white/5 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-emerald-500/30 transition-all group flex flex-col"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white font-bold border border-white/10 shadow-inner">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-200 text-sm">{msg.name}</h3>
                      <p className="text-xs text-emerald-500">{msg.email}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 bg-black/20 px-2 py-1 rounded">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Message Body */}
                <div className="bg-[#0f1115] p-4 rounded-xl border border-white/5 mb-4 flex-1">
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    "{msg.message}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 mt-auto border-t border-white/5">
                    <a 
                     href={`mailto:${msg.email}`}
                     className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      <Reply size={14} /> Reply via Email
                    </a>

                    <button
                     onClick={() => handleDelete(msg._id)}
                     className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                     title="Delete Message"
                    >
                      <Trash2 size={16} />
                    </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Contacts;