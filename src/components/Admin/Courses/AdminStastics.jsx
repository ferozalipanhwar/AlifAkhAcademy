// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Activity, BookOpen, DollarSign, FileCheck, GraduationCap, Layers, LogIn, Users } from "lucide-react";

const AdminStatistics = () => {
  const stats = [
    { label: "Total Students", value: 1200, icon: <Users size={32} />, color: "text-blue-600" },
    { label: "Total Teachers", value: 45, icon: <GraduationCap size={32} />, color: "text-green-600" },
    { label: "Active Courses", value: 32, icon: <BookOpen size={32} />, color: "text-purple-600" },
    { label: "Total Tests Conducted", value: 210, icon: <FileCheck size={32} />, color: "text-orange-600" },
    { label: "Active Batches", value: 18, icon: <Layers size={32} />, color: "text-red-600" },
    { label: "Active Users Today", value: 340, icon: <Activity size={32} />, color: "text-pink-600" },
    { label: "Monthly Revenue", value: "$12,500", icon: <DollarSign size={32} />, color: "text-yellow-600" },
    { label: "Today's Logins", value: 520, icon: <LogIn size={32} />, color: "text-teal-600" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Statistics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-xl rounded-xl p-6 text-center border hover:shadow-2xl cursor-pointer transition"
          >
            <div className={`flex justify-center mb-3 ${item.color}`}>
              {item.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-600">
              {item.label}
            </h3>

            <p className="text-3xl font-bold mt-2 text-black">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminStatistics;
