import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  FileText,
  Filter,
  LayoutDashboard,
  Loader2,
  Mail,
  ShieldAlert,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api"; // Your API Helper

const TeacherApplication = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("pending"); // pending, approved, rejected, all

  // ===================== FETCH DATA =====================
  const fetchApplications = async () => {
    try {
      const res = await API.get("/admin-tests/applications");
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ===================== FILTER LOGIC =====================
  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredApps(applications);
    } else {
      setFilteredApps(applications.filter(app => app.status === filterStatus));
    }
  }, [applications, filterStatus]);

  // ===================== UPDATE STATUS =====================
  const handleStatusUpdate = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus} this application?`)) return;

    // Optimistic Update (UI updates immediately)
    const originalApps = [...applications];
    setApplications(prev => prev.map(app => 
        app._id === id ? { ...app, status: newStatus } : app
    ));

    try {
      await API.put(`/admin-tests/applications/${id}`, { status: newStatus });
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update status.");
      setApplications(originalApps); // Revert on error
    }
  };

  // ===================== STATS CALCULATION =====================
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    approved: applications.filter(a => a.status === "approved").length,
  };

  return (
    <div className="space-y-8 p-2 min-h-screen bg-[#0f1115]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <LayoutDashboard className="text-emerald-500" size={32} /> Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-2">Overview of instructor applications and platform stats.</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex bg-[#1a1d21] p-1 rounded-xl border border-white/5">
           {['pending', 'approved', 'rejected', 'all'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  filterStatus === status 
                  ? "bg-emerald-600 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white"
                }`}
              >
                {status}
              </button>
           ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <StatsCard title="Total Applications" count={stats.total} icon={<FileText size={24}/>} color="bg-blue-500/10 text-blue-500" />
         <StatsCard title="Pending Review" count={stats.pending} icon={<Clock size={24}/>} color="bg-yellow-500/10 text-yellow-500" />
         <StatsCard title="Approved Teachers" count={stats.approved} icon={<CheckCircle size={24}/>} color="bg-emerald-500/10 text-emerald-500" />
      </div>

      {/* Applications Grid */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
           <Filter size={20} className="text-emerald-500" /> 
           <span className="capitalize">{filterStatus}</span> Applications
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-emerald-500">
            <Loader2 size={40} className="animate-spin" />
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="bg-[#1a1d21] border border-white/5 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
               <ShieldAlert size={32} className="text-gray-500" />
            </div>
            <p className="text-gray-400 text-lg">No applications found in this category.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredApps.map((app, index) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#1a1d21] border border-white/5 p-6 rounded-2xl shadow-xl hover:border-emerald-500/30 transition-all flex flex-col h-full group"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                         {app.fullname.charAt(0).toUpperCase()}
                      </div>
                      <div>
                         <h3 className="font-bold text-white text-lg">{app.fullname}</h3>
                         <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Mail size={12} /> {app.email}
                         </div>
                      </div>
                   </div>
                   <StatusBadge status={app.status} />
                </div>

                {/* Card Body */}
                <div className="space-y-3 mb-6 flex-1">
                   <InfoRow label="Subject" value={app.subject} />
                   <InfoRow label="Experience" value={`${app.experience} Years`} />
                   <InfoRow label="Qualification" value={app.qualification} />
                   
                   <div className="bg-[#0f1115] p-3 rounded-xl border border-white/5 mt-3">
                      <p className="text-xs text-gray-500 mb-1 uppercase font-bold tracking-wider">Bio / Motivation</p>
                      <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
                         "{app.bio}"
                      </p>
                   </div>
                   
                   {app.portfolio && (
                      <a href={app.portfolio} target="_blank" rel="noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline block mt-2">
                         View Portfolio / LinkedIn &rarr;
                      </a>
                   )}
                </div>

                {/* Card Actions (Only for Pending) */}
                {app.status === 'pending' && (
                   <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                      <button 
                        onClick={() => handleStatusUpdate(app._id, 'approved')}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white font-semibold text-sm transition-all"
                      >
                         <CheckCircle size={16} /> Approve
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(app._id, 'rejected')}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-semibold text-sm transition-all"
                      >
                         <XCircle size={16} /> Reject
                      </button>
                   </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Helper Components ---

const StatsCard = ({ title, count, icon, color }) => (
   <div className="bg-[#1a1d21] border border-white/5 p-5 rounded-2xl flex items-center justify-between">
      <div>
         <p className="text-gray-400 text-sm font-medium">{title}</p>
         <h3 className="text-3xl font-bold text-white mt-1">{count}</h3>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
         {icon}
      </div>
   </div>
);

const InfoRow = ({ label, value }) => (
   <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}:</span>
      <span className="text-gray-200 font-medium">{value}</span>
   </div>
);

const StatusBadge = ({ status }) => {
   const styles = {
      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      rejected: "bg-red-500/10 text-red-500 border-red-500/20",
   };
   
   return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
         {status}
      </span>
   );
};

export default TeacherApplication;