import { motion } from "framer-motion";
import { FaBlog, FaBook, FaChalkboardTeacher, FaEnvelope, FaUserGraduate } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";

const menuItems = [
  { id: "courses", name: "Courses", icon: <FaBook />, emoji: "📚" },
  { id: "teachers", name: "Teachers", icon: <FaChalkboardTeacher />, emoji: "👨‍🏫" },
  { id: "students", name: "Students", icon: <FaUserGraduate />, emoji: "🎓" },
  { id: "contacts", name: "Contacts", icon: <FaEnvelope />, emoji: "💬" },
  { id: "blogs", name: "Blogs", icon: <FaBlog />, emoji: "📝" },
];

const AdminDashboard = () => {
  const location = useLocation();
  const active = location.pathname.split("/").pop();

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-64 bg-gray-800 p-4 hidden md:flex flex-col justify-between shadow-lg"
      >
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">🌟 Admin Panel</h2>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/admin-dashboard/${item.id}`}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                    active === item.id ? "bg-blue-600" : "hover:bg-gray-700"
                  }`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-center text-gray-400 text-sm">
          © 2025 Feroz Admin Dashboard
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* 👈 Nested routes content renders here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
