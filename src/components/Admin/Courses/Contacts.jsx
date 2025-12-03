import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaEnvelopeOpenText, FaTrashAlt, FaUserCircle } from "react-icons/fa";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all contacts from API
  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact/all");
      setContacts(res.data.contacts);
      
    } catch (err) {
      console.error(err);
      setError("Failed to fetch contact messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete a contact by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setContacts(contacts.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete message.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading messages...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <motion.div
      className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-white w-full max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center gap-2">
        💬 Contact Messages
      </h2>

      {contacts.length === 0 ? (
        <p className="text-center text-gray-400 mt-6">No contact messages yet 📭</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Message</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((msg, index) => (
                <motion.tr
                  key={msg._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 flex items-center gap-2">
                    <FaUserCircle className="text-green-400 text-lg" />
                    {msg.name}
                  </td>
                  <td className="p-3 text-blue-400">{msg.email}</td>
                  <td className="p-3 flex items-start gap-2">
                    <FaEnvelopeOpenText className="text-yellow-400 mt-1" />
                    <span>{msg.message}</span>
                  </td>
                  <td className="p-3 text-gray-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default Contacts;
