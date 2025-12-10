import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBlog, FaBook, FaChalkboardTeacher, FaEnvelope, FaUser, FaUserGraduate } from "react-icons/fa";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import API from "../apiHelper/api";

const menuItems = [
  { id: "courses", name: "Courses", icon: <FaBook />, emoji: "📚" },
  { id: "teachers", name: "Teachers", icon: <FaChalkboardTeacher />, emoji: "👨‍🏫" },
  { id: "students", name: "Students", icon: <FaUserGraduate />, emoji: "🎓" },
  { id: "users", name: "Users", icon: <FaUser />, emoji: "👥" },
  { id: "contacts", name: "Contacts", icon: <FaEnvelope />, emoji: "💬" },
  { id: "blogs", name: "Blogs", icon: <FaBlog />, emoji: "📝" },
  { id: "settings", name: "Settings", icon: <FaUser />, emoji: "⚙️" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);     
  const [isAdmin, setIsAdmin] = useState(false);    

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await API.get(`/user/${user?._id}`);
        const updatedUser = res.data;

        if (!updatedUser?.isAdmin) {
          navigate("/", { replace: true });
          return;
        }

        setIsAdmin(true);
        setLoading(false);
      } catch (error) {
        navigate("/", { replace: true });
      }
    };

    if (!user) {
      navigate("/", { replace: true });
      return;
    }

    fetchUserData();
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });  
  };

  const active = location.pathname.split("/").pop();

 
  if (loading || !isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="w-full bg-gray-800 px-5 py-4 flex items-center text-white fixed top-0 z-50 shadow-md">
        <h1 className="text-2xl font-bold">Alif Akh Academy</h1>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/" className="text-xl hover:text-blue-400">🏠</Link>
          <span className="text-xl">👤</span>
          <span className="text-sm text-gray-400">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-1 bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-64 bg-gray-800 p-4 hidden md:flex flex-col justify-between shadow-lg"
      >
        <ul className="space-y-4 mt-16">
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

        <p className="text-center text-gray-400 text-sm">
          © 2025 Feroz Admin Dashboard
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6 mt-16 overflow-y-auto">
        <Outlet />
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 flex justify-around p-3 shadow-lg">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={`/admin-dashboard/${item.id}`}
            className={`flex flex-col items-center text-sm ${
              active === item.id ? "text-blue-400" : "text-gray-400"
            }`}
          >
            <span className="text-2xl">{item.emoji}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
