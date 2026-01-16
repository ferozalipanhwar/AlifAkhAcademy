import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  ChevronRight,
  ClipboardList,
  FileQuestion,
  FileText,
  GraduationCap,
  Layers,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Search,
  Settings,
  Users,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import API from "../apiHelper/api";

// Professional Menu Configuration
const menuItems = [
  { id: "", name: "Overview", icon: <LayoutDashboard size={20} /> },
  // Test Engine Section
  { id: "manage-categories", name: "Test Categories", icon: <Layers size={20} /> },
  { id: "manage-tests", name: "Manage Tests", icon: <ClipboardList size={20} /> },
  { id: "manage-questions", name: "Question Bank", icon: <FileQuestion size={20} /> },
  { id: "courses", name: "Course Manager", icon: <BookOpen size={20} /> },
  { id: "teachers", name: "Teachers", icon: <Users size={20} /> },
  { id: "students", name: "Students", icon: <GraduationCap size={20} /> },
  { id: "course-enrollments", name: "Enrollments", icon: <FileText size={20} /> },
  { id: "users", name: "User Management", icon: <Users size={20} /> },
  {id: "manage-prep", name: "Prep Tests", icon: <BookOpen size={20} /> },
 
  { id: "contacts", name: "Messages", icon: <Mail size={20} /> },
  { id: "blogs", name: "Blog Posts", icon: <FileText size={20} /> },
  { id: "settings", name: "Settings", icon: <Settings size={20} /> },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For Mobile

  const user = JSON.parse(localStorage.getItem("user"));

  // Check Admin Status
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) throw new Error("No User");
        const res = await API.get(`/user/${user._id}`);
        if (!res.data?.isAdmin) {
          throw new Error("Not Admin");
        }
        setIsAdmin(true);
      } catch (error) {
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate, user?._id]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // Get current active path segment
  const currentPath = location.pathname.split("/").pop();
  const isDashboardRoot = location.pathname === "/admin-dashboard";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-[#0f1115] text-gray-100 font-sans">
      
      {/* ================= SIDEBAR (Desktop) ================= */}
      <aside className="hidden md:flex flex-col w-72 bg-[#15171b] border-r border-gray-800 fixed h-full z-20">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-900/50 mr-3">
            A
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Admin<span className="text-emerald-500">Panel</span>
          </span>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Menu</p>
          {menuItems.map((item) => {
            const isActive = item.id === "" ? isDashboardRoot : currentPath === item.id;
            return (
              <Link
                key={item.id}
                to={item.id === "" ? "/admin-dashboard" : `/admin-dashboard/${item.id}`}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-emerald-600/10 text-emerald-400 shadow-sm" 
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${isActive ? "text-emerald-500" : "text-gray-500 group-hover:text-gray-300"}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-emerald-500" />}
              </Link>
            );
          })}
        </div>

        {/* User Profile Snippet (Bottom Sidebar) */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center text-sm font-bold text-white">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-emerald-500">Administrator</p>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="h-16 bg-[#0f1115]/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-800 flex items-center justify-between px-4 md:px-8">
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>

          {/* Search Bar (Visual Only) */}
          <div className="hidden md:flex items-center bg-[#1a1d21] border border-gray-700 rounded-lg px-3 py-1.5 w-64 focus-within:border-emerald-500 transition-colors">
            <Search size={16} className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm text-gray-300 w-full placeholder-gray-600"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 relative text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#0f1115]"></span>
            </button>
            <Link to="/" className="text-sm font-medium text-gray-400 hover:text-emerald-400 transition-colors">
              View Website
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* ================= MOBILE SIDEBAR (Drawer) ================= */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-72 bg-[#15171b] z-50 shadow-2xl md:hidden flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
                <span className="font-bold text-lg text-white">Menu</span>
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {menuItems.map((item) => {
                  const isActive = item.id === "" ? isDashboardRoot : currentPath === item.id;
                  return (
                    <Link
                      key={item.id}
                      to={item.id === "" ? "/admin-dashboard" : `/admin-dashboard/${item.id}`}
                      onClick={() => setIsSidebarOpen(false)} // Close drawer on click
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive 
                          ? "bg-emerald-600 text-white shadow-md" 
                          : "text-gray-400 hover:bg-white/5 hover:text-gray-100"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="p-4 border-t border-gray-800">
                 <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-3 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                 >
                   <LogOut size={18} /> Logout
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;