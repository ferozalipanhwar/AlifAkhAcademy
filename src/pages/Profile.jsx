import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  Download,
  LayoutDashboard,
  Loader2,
  LogOut,
  ShieldCheck,
  User as UserIcon
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../apiHelper/api";
import { AuthContext } from "../context/AuthContext";
import Certificate from "./TakeTest/Certificate";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Data States
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("courses"); 
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // 1. Fetch Data (Courses & Certificates)
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        // Fetches enrolled courses (Note: Ensure backend populates courseId and teacherId)
        const [coursesRes, resultsRes] = await Promise.all([
          API.get(`/students/my-courses/${user._id}`),
          API.get("/tests/my-results")
        ]);

        setEnrolledCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);

        // Filter Results for Passed Certificates
        const allResults = Array.isArray(resultsRes.data) ? resultsRes.data : [];
        const passedTests = allResults.filter(
          (r) => r.isPassed || r.status === "PASS" || (r.score / r.totalMarks) >= 0.5
        );
        setCertificates(passedTests);

      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // 2. Access Denied UI
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full border border-gray-100">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
          <Link to="/login" className="block w-full py-3 bg-gray-900 text-white rounded-xl font-medium mt-6">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-20 font-sans">
      
      {/* Header Background */}
      <div className="h-64 bg-gradient-to-r from-emerald-800 to-teal-700 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100"
            >
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-100 overflow-hidden mx-auto mb-4">
                 <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-50 text-4xl font-bold text-emerald-600">
                    {user.name?.charAt(0).toUpperCase()}
                 </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500 mb-6">{user.email}</p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="bg-emerald-50 p-3 rounded-2xl text-center">
                  <span className="block text-xl font-bold text-emerald-700">{enrolledCourses.length}</span>
                  <span className="text-xs text-emerald-600 font-medium">Courses</span>
                </div>
                <div className="bg-yellow-50 p-3 rounded-2xl text-center">
                  <span className="block text-xl font-bold text-yellow-700">{certificates.length}</span>
                  <span className="text-xs text-yellow-600 font-medium">Certificates</span>
                </div>
              </div>

              <button onClick={logout} className="w-full py-2.5 flex items-center justify-center gap-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors font-medium text-sm">
                <LogOut size={16} /> Sign Out
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="bg-white rounded-3xl shadow-sm p-4 border border-gray-100 hidden lg:block">
               <nav className="space-y-1">
                 <NavButton active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} icon={<LayoutDashboard size={20}/>} label="My Learning" />
                 <NavButton active={activeTab === 'certificates'} onClick={() => setActiveTab('certificates')} icon={<Award size={20}/>} label="Certificates" />
               </nav>
            </div>
          </div>

          {/* ================= RIGHT MAIN CONTENT ================= */}
          <div className="lg:col-span-3">
             
             <div className="flex gap-2 mb-6 lg:hidden overflow-x-auto pb-2">
                <MobileTab active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} label="Courses" />
                <MobileTab active={activeTab === 'certificates'} onClick={() => setActiveTab('certificates')} label="Certificates" />
             </div>

             <AnimatePresence mode="wait">
                
                {/* --- COURSES TAB --- */}
                {activeTab === 'courses' && (
                  <motion.div 
                    key="courses"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Enrolled Courses</h2>
                      <Link to="/courses" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-lg">Browse More</Link>
                    </div>

                    {loading ? (
                       <div className="flex justify-center p-20"><Loader2 className="animate-spin text-emerald-600" size={32}/></div>
                    ) : enrolledCourses.length === 0 ? (
                       <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-gray-100">
                          <BookOpen size={40} className="mx-auto mb-4 text-gray-300"/>
                          <h3 className="text-lg font-bold text-gray-900">No courses yet</h3>
                          <Link to="/courses" className="text-emerald-600 font-bold mt-2 inline-block">Explore Courses</Link>
                       </div>
                    ) : (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {enrolledCourses.map((enrollment) => {
                             const course = enrollment.courseId;
                             if (!course) return null;
                             
                             return (
                               <div key={course._id} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group">
                                  
                                  {/* Course Image & Duration Badge */}
                                  <div className="h-48 rounded-2xl bg-gray-100 overflow-hidden mb-4 relative">
                                     <img 
                                       src={course.img || "https://via.placeholder.com/400x250"} 
                                       alt={course.title} 
                                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                     />
                                     <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                        <Clock size={10} /> {course.duration}
                                     </div>
                                  </div>

                                  {/* Course Details */}
                                  <div className="flex-1 flex flex-col px-1">
                                     <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                                        {course.title}
                                     </h3>
                                     
                                     {/* Instructor Details */}
                                     <p className="text-sm text-gray-500 mb-5 flex items-center gap-2">
                                        <span className="bg-emerald-100 text-emerald-700 p-1 rounded-full">
                                           <UserIcon size={12} />
                                        </span>
                                        Instructor: <span className="font-semibold text-gray-700">{course.teacherId?.fullname || "Verified Academy"}</span>
                                     </p>

                                     <Link 
                                        to={`/learning/${course._id}`} 
                                        className="mt-auto w-full text-center py-3 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                                     >
                                        Continue Learning
                                     </Link>
                                  </div>
                               </div>
                             );
                          })}
                       </div>
                    )}
                  </motion.div>
                )}

                {/* --- CERTIFICATES TAB --- */}
                {activeTab === 'certificates' && (
                  <motion.div
                    key="certificates"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                     <h2 className="text-2xl font-bold text-gray-900 mb-6">My Certificates</h2>
                     
                     {loading ? (
                        <div className="flex justify-center p-20"><Loader2 className="animate-spin text-emerald-600" size={32}/></div>
                     ) : certificates.length === 0 ? (
                        <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100">
                           <Award size={40} className="mx-auto mb-4 text-gray-300" />
                           <h3 className="text-xl font-bold text-gray-900 mb-2">No Certificates Yet</h3>
                           <p className="text-gray-500 mb-6 text-sm">Pass an evaluation to unlock your credentials.</p>
                        </div>
                     ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {certificates.map((cert) => (
                              <div key={cert._id} className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md border border-gray-100 flex flex-col relative overflow-hidden group">
                                 <div className="absolute top-0 left-0 w-2 h-full bg-yellow-400 group-hover:bg-emerald-500 transition-colors"></div>
                                 <div className="pl-4">
                                    <div className="flex justify-between items-start mb-3">
                                       <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                                          <Award size={20} />
                                       </div>
                                       <span className="text-[10px] font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-full uppercase tracking-wider border border-green-100">
                                          {cert.grade || "A"} GRADE
                                       </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{cert.testId?.title || "Test Achievement"}</h3>
                                    <p className="text-xs text-gray-400 mb-5 flex items-center gap-1">
                                       <Calendar size={12}/> {new Date(cert.createdAt).toLocaleDateString()}
                                    </p>
                                    <div className="bg-gray-50 rounded-2xl p-4 mb-5 grid grid-cols-2 gap-4 text-center">
                                       <div className="border-r border-gray-200">
                                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Score</p>
                                          <p className="font-bold text-gray-800">{cert.score}/{cert.totalMarks}</p>
                                       </div>
                                       <div>
                                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Result</p>
                                          <p className="font-bold text-emerald-600">{cert.percentage || Math.round((cert.score/cert.totalMarks)*100)}%</p>
                                       </div>
                                    </div>
                                    <button 
                                       onClick={() => setSelectedCertificate(cert)}
                                       className="w-full py-3 bg-gray-900 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-md"
                                    >
                                       <Download size={14} /> View & Download
                                    </button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- CERTIFICATE MODAL --- */}
      {selectedCertificate && (
         <Certificate 
            result={selectedCertificate} 
            onClose={() => setSelectedCertificate(null)} 
         />
      )}

    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${
      active ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100" : "text-gray-500 hover:bg-gray-50"
    }`}
  >
    <span className={active ? "text-emerald-600" : "text-gray-400"}>{icon}</span>
    {label}
  </button>
);

const MobileTab = ({ active, onClick, label }) => (
  <button onClick={onClick} className={`px-6 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all uppercase tracking-widest ${active ? "bg-emerald-600 text-white shadow-lg" : "bg-white text-gray-600 border border-gray-200"}`}>
    {label}
  </button>
);

export default Profile;