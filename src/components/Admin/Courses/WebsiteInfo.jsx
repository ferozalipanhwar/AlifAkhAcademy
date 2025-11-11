import { motion } from "framer-motion";
import { useState } from "react";

const WebsiteInfo = ({ activeSection }) => {
  const [data, setData] = useState("");

  const handleSave = () => {
    alert(`${activeSection} section updated successfully!`);
  };

  const placeholders = {
    education: "Write details about your education section...",
    description: "Add your website’s short description here...",
    about: "Write about your platform, mission, and goals...",
    features: "List and describe key features of your academy...",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-800 text-white p-6 rounded-2xl shadow-xl"
    >
      <h1 className="text-3xl font-bold mb-4">
        🌐 Edit {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
      </h1>

      <textarea
        placeholder={placeholders[activeSection]}
        className="w-full p-4 bg-gray-700 rounded-lg focus:outline-none h-48"
        value={data}
        onChange={(e) => setData(e.target.value)}
      ></textarea>

      <button
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
      >
        Save Changes
      </button>
    </motion.div>
  );
};

export default WebsiteInfo;
