import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Search,
  UserCheck,
  UserX
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api";

const CourseEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 🚀 Fetch Data
  const fetchEnrollments = async () => {
    try {
      const res = await API.get("/course-enrollment/all");
      const data = res.data.enrollments || [];
      setEnrollments(data);
      setFilteredEnrollments(data);
    } catch (error) {
      console.error("Failed to fetch enrollments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // 🔍 Search Logic
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = enrollments.filter(item => 
      item.fullname.toLowerCase().includes(lowerSearch) ||
      item.email.toLowerCase().includes(lowerSearch) ||
      (item.courseId?.title || "").toLowerCase().includes(lowerSearch)
    );
    setFilteredEnrollments(filtered);
  }, [searchTerm, enrollments]);

  return (
    <div className="space-y-6 p-4 md:p-0">
      
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="text-emerald-500" /> Course Enrollments
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Track student registrations and course interest.
          </p>
        </div>

        <div className="flex items-center bg-[#1a1d21] border border-gray-700 rounded-lg px-3 py-2 w-full lg:w-72 focus-within:border-emerald-500 transition-colors shadow-sm">
          <Search size={18} className="text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search student, email..." 
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
      ) : filteredEnrollments.length === 0 ? (
        <div className="bg-[#1a1d21] border border-white/5 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
            <FileText size={32} />
          </div>
          <h3 className="text-lg font-medium text-white">No enrollments found</h3>
          <p className="text-gray-400 text-sm">Waiting for new students to register.</p>
        </div>
      ) : (
        <>
          {/* --- DESKTOP VIEW (Table) --- */}
          <div className="hidden md:block bg-[#1a1d21] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0f1115] text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                    <th className="p-4 font-medium">Student Info</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Course Selected</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Enrolled Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-sm">
                  {filteredEnrollments.map((item, index) => (
                    <DesktopRow key={item._id} item={item} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- MOBILE VIEW (Cards) --- */}
          <div className="md:hidden space-y-4">
            {filteredEnrollments.map((item, index) => (
              <MobileCard key={item._id} item={item} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- Sub-component: Desktop Row ---
const DesktopRow = ({ item, index }) => (
  <motion.tr 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.05 }}
    className="hover:bg-white/5 transition-colors group"
  >
    <td className="p-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-emerald-500 font-bold border border-gray-700">
          {item.fullname.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-white">{item.fullname}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            {item.userId ? <UserCheck size={10} className="text-blue-400"/> : <UserX size={10}/>}
            {item.userId ? "Registered" : "Guest"}
          </p>
        </div>
      </div>
    </td>
    <td className="p-4 space-y-1">
      <div className="flex items-center gap-2 text-gray-300">
        <Mail size={14} className="text-gray-500" /> {item.email}
      </div>
      <div className="flex items-center gap-2 text-gray-400 text-xs">
        <Phone size={14} className="text-gray-500" /> {item.phoneNumber}
      </div>
    </td>
    <td className="p-4">
      <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md text-xs font-medium border border-emerald-500/20">
        {item.courseId?.title || "Unknown Course"}
      </span>
      {item.message && (
        <p className="text-xs text-gray-500 mt-1 italic max-w-[200px] truncate" title={item.message}>
          "{item.message}"
        </p>
      )}
    </td>
    <td className="p-4">
       <StatusBadge isRegistered={item.userId} />
    </td>
    <td className="p-4 text-gray-400 font-mono text-xs">
      <div className="flex items-center gap-2">
        <Calendar size={14} />
        {new Date(item.enrolledAt).toLocaleDateString()}
      </div>
    </td>
  </motion.tr>
);

// --- Sub-component: Mobile Card ---
const MobileCard = ({ item, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="bg-[#1a1d21] border border-white/10 rounded-xl p-5 shadow-lg relative overflow-hidden"
  >
     {/* Status Indicator Strip */}
     <div className={`absolute top-0 left-0 w-1 h-full ${item.userId ? 'bg-blue-500' : 'bg-orange-500'}`}></div>

     {/* Header: Name & Date */}
     <div className="flex justify-between items-start mb-4 pl-2">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-emerald-500 font-bold border border-gray-700 text-lg">
              {item.fullname.charAt(0).toUpperCase()}
           </div>
           <div>
              <h3 className="font-bold text-white text-lg">{item.fullname}</h3>
              <StatusBadge isRegistered={item.userId} />
           </div>
        </div>
        <span className="text-xs text-gray-500 font-mono flex items-center gap-1 bg-black/20 px-2 py-1 rounded">
           <Calendar size={12} /> {new Date(item.enrolledAt).toLocaleDateString()}
        </span>
     </div>

     {/* Details Grid */}
     <div className="grid grid-cols-1 gap-3 pl-2 mb-4">
        <div className="bg-black/20 p-3 rounded-lg border border-white/5">
           <p className="text-xs text-gray-500 uppercase font-bold mb-1">Course</p>
           <p className="text-emerald-400 font-medium text-sm flex items-center gap-2">
              <BookOpen size={14}/> {item.courseId?.title || "Unknown Course"}
           </p>
        </div>
        
        <div className="space-y-2 text-sm text-gray-300">
           <div className="flex items-center gap-2">
              <Mail size={14} className="text-gray-500"/> {item.email}
           </div>
           <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-500"/> {item.phoneNumber}
           </div>
        </div>
     </div>

     {/* Message Footer */}
     {item.message && (
        <div className="mt-3 pl-2 pt-3 border-t border-white/5">
           <p className="text-xs text-gray-500 flex gap-2">
              <MessageSquare size={14} className="shrink-0" />
              <span className="italic">"{item.message}"</span>
           </p>
        </div>
     )}
  </motion.div>
);

// --- Sub-component: Status Badge ---
const StatusBadge = ({ isRegistered }) => (
  isRegistered ? (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Registered
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Guest
    </span>
  )
);

export default CourseEnrollments;