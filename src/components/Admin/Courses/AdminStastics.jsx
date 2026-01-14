import { motion } from "framer-motion";
import {
  Activity,
  BookOpen,
  DollarSign,
  FileCheck,
  GraduationCap,
  Layers,
  LogIn,
  TrendingUp,
  Users
} from "lucide-react";

const AdminStatistics = () => {
  const stats = [
    { 
      label: "Total Students", 
      value: "1,200", 
      icon: <Users size={22} />, 
      color: "text-blue-500", 
      bg: "bg-blue-500/10",
      trend: "+12%" 
    },
    { 
      label: "Total Teachers", 
      value: "45", 
      icon: <GraduationCap size={22} />, 
      color: "text-emerald-500", 
      bg: "bg-emerald-500/10",
      trend: "+2 New" 
    },
    { 
      label: "Active Courses", 
      value: "32", 
      icon: <BookOpen size={22} />, 
      color: "text-purple-500", 
      bg: "bg-purple-500/10",
      trend: "Stable" 
    },
    { 
      label: "Tests Conducted", 
      value: "210", 
      icon: <FileCheck size={22} />, 
      color: "text-orange-500", 
      bg: "bg-orange-500/10",
      trend: "+18%" 
    },
    { 
      label: "Active Batches", 
      value: "18", 
      icon: <Layers size={22} />, 
      color: "text-rose-500", 
      bg: "bg-rose-500/10",
      trend: "+3%" 
    },
    { 
      label: "Active Users", 
      value: "340", 
      icon: <Activity size={22} />, 
      color: "text-pink-500", 
      bg: "bg-pink-500/10",
      trend: "+8% Today" 
    },
    { 
      label: "Monthly Revenue", 
      value: "$12,500", 
      icon: <DollarSign size={22} />, 
      color: "text-yellow-500", 
      bg: "bg-yellow-500/10",
      trend: "+24%" 
    },
    { 
      label: "Today's Logins", 
      value: "520", 
      icon: <LogIn size={22} />, 
      color: "text-cyan-500", 
      bg: "bg-cyan-500/10",
      trend: "High Traffic" 
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
        <p className="text-gray-400 text-sm mt-1">Here is what's happening in your academy today.</p>
      </div>

      {/* Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#1a1d21] border border-white/5 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:border-white/10 transition-all cursor-default group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                {stat.icon}
              </div>
              
              {/* Fake Trend Indicator */}
              <div className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
                <TrendingUp size={12} />
                {stat.trend}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-400">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">{stat.value}</h3>
            </div>
            
            {/* Decorative bottom line */}
            <div className="w-full h-1 bg-gray-800 mt-4 rounded-full overflow-hidden">
               <div className={`h-full ${stat.bg.replace('/10', '')} w-2/3 rounded-full opacity-60`}></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminStatistics;