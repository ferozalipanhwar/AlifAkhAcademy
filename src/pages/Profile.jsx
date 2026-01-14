import { motion } from "framer-motion";
import {
  Award,
  BarChart2,
  BookOpen,
  ChevronRight,
  Clock,
  LogOut,
  PlusCircle,
  Settings,
  ShieldCheck
} from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  // 1. Unauthorized State (Modernized)
  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 to-pink-500"></div>
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 shadow-sm">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-500 mb-8">
            You must be logged in to view your learning dashboard and track your progress.
          </p>
          <Link
            to="/login"
            className="block w-full py-3.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Log In to Continue
          </Link>
        </div>
      </div>
    );
  }

  // Demo Data injection (Ensure safe fallback)
  const enrolledCourses = user.enrolledCourses?.length ? user.enrolledCourses : [
    {
      _id: "demo_1",
      title: "Full Stack Web Development",
      duration: "3 Months",
      img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      progress: 65,
      totalLessons: 40,
      completedLessons: 26
    },
    {
      _id: "demo_2",
      title: "UI/UX Design Fundamentals",
      duration: "6 Weeks",
      img: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      progress: 12,
      totalLessons: 24,
      completedLessons: 3
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 pb-20"
    >
      
      {/* ================= HEADER SECTION ================= */}
      <div className="bg-white border-b border-gray-200">
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-emerald-600 to-teal-500 relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        {/* Profile Info Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-20 pb-6 flex flex-col md:flex-row items-center md:items-end gap-6">
            
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden flex items-center justify-center">
                {user.img ? (
                   <img src={user.img} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                   <div className="text-4xl font-bold text-emerald-600 bg-emerald-50 w-full h-full flex items-center justify-center">
                     {user.name?.charAt(0)}
                   </div>
                )}
              </div>
              {/* Online Indicator */}
              <div className="absolute bottom-4 right-4 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
            </div>

            {/* User Text Info */}
            <div className="flex-1 text-center md:text-left mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500 font-medium mb-2">{user.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase rounded-full tracking-wide">
                   Student
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded-full tracking-wide">
                   Pro Member
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-xl font-medium transition-colors mb-2"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT GRID ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Stats & Quick Actions */}
          <div className="space-y-8">
            
            {/* Learning Stats Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                 <BarChart2 className="text-emerald-500" size={20} /> Learning Stats
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                     <div className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</div>
                     <div className="text-xs text-gray-500 font-medium uppercase mt-1">Active Courses</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                     <div className="text-2xl font-bold text-gray-900">85%</div>
                     <div className="text-xs text-gray-500 font-medium uppercase mt-1">Avg Score</div>
                  </div>
               </div>
            </div>

            {/* Quick Menu */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
               <MenuLink to="/courses" icon={<PlusCircle size={20} />} label="Browse Courses" color="text-blue-500" bg="bg-blue-50" />
               <MenuLink to="/my-courses" icon={<BookOpen size={20} />} label="My Learning" color="text-purple-500" bg="bg-purple-50" />
               <MenuLink to="/view-certificate" icon={<Award size={20} />} label="Certificates" color="text-yellow-600" bg="bg-yellow-50" />
               <MenuLink to="/settings" icon={<Settings size={20} />} label="Account Settings" color="text-gray-500" bg="bg-gray-50" />
            </div>
          </div>

          {/* RIGHT COLUMN: Courses List */}
          <div className="lg:col-span-2">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
                <Link to="/my-courses" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  View All <ChevronRight size={16} />
                </Link>
             </div>

             <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course._id} className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                     
                     {/* Course Image */}
                     <div className="w-full sm:w-32 h-32 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     </div>

                     {/* Course Details */}
                     <div className="flex-1 w-full">
                        <div className="flex justify-between items-start">
                           <div>
                              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mb-2 inline-block">
                                {course.duration}
                              </span>
                              <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1">
                                {course.title}
                              </h3>
                           </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-3">
                           <div className="flex justify-between text-xs font-medium text-gray-500 mb-1.5">
                              <span className="flex items-center gap-1"><Clock size={12} /> In Progress</span>
                              <span>{course.progress}%</span>
                           </div>
                           <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-emerald-500 rounded-full relative" 
                                style={{ width: `${course.progress}%` }}
                              >
                                 <div className="absolute top-0 right-0 bottom-0 w-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Action Button */}
                     <div className="w-full sm:w-auto">
                        <Link 
                          to={`/course/${course._id}`}
                          className="flex items-center justify-center w-full sm:w-10 sm:h-10 rounded-full bg-gray-50 text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300"
                        >
                           <ChevronRight size={20} />
                        </Link>
                     </div>

                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

// Reusable Menu Item Component
const MenuLink = ({ to, icon, label, color, bg }) => (
  <Link 
    to={to} 
    className="flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-xl transition-colors group"
  >
    <div className="flex items-center gap-4">
       <div className={`p-2.5 rounded-lg ${bg} ${color} group-hover:scale-110 transition-transform`}>
         {icon}
       </div>
       <span className="font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
    </div>
    <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500" />
  </Link>
);

export default Profile;