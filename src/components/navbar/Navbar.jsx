import { 
  BookOpen, 
  Bot, 
  ChevronDown, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  User, 
  X 
} from "lucide-react";
import { useEffect, useState } from "react";
import ListItem from "./ListItem"; // Assuming you have this component

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [testPrepOpen, setTestPrepOpen] = useState(false); // 👈 New state for mobile dropdown
  const [scrolled, setScrolled] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;
  const isAdmin = user?.isAdmin === true;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 border-b border-white/5
        ${scrolled || isOpen ? "bg-black/90 backdrop-blur-md py-4 shadow-xl" : "bg-black/50 backdrop-blur-sm py-5"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-white">
        
        {/* ================= Logo ================= */}
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-900/50 transition-transform group-hover:scale-105">
            <span className="font-bold text-xl">A</span>
          </div>
          <span className="font-bold text-lg tracking-tight">
            ALIF-AKH<span className="text-emerald-500">ACADEMY</span>
          </span>
        </div>

        {/* ================= Desktop Menu ================= */}
        <div className="hidden md:flex items-center gap-6">
          <ListItem title="Home" href="/" />
          <ListItem title="Courses" href="/courses" />
          
          {/* AI Tutor Desktop */}
          <a href="/ai-tutor" className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-1 group">
             <Bot size={16} className="text-emerald-500 group-hover:animate-bounce" /> AI Tutor
          </a>

          <ListItem title="Teachers" href="/teachers" />
          <ListItem title="Contact" href="/contact" />
        
          {/* Test Prep Dropdown (Desktop) */}
          <div className="relative group py-2">
            <button className="flex items-center gap-1 font-medium text-sm text-gray-300 hover:text-emerald-400 transition-colors">
              Test Prep <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              <div className="bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden w-48 p-2">
                <a href="/take-test" className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-emerald-600/20 hover:text-emerald-400 rounded-lg transition-colors">Take Test</a>
                <a href="/prep-test" className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-emerald-600/20 hover:text-emerald-400 rounded-lg transition-colors">Preparation Test</a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Desktop Right Section ================= */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <a href="/login" className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors px-4 py-2">Login</a>
              <a href="/register">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 transform hover:-translate-y-0.5">
                  Register
                </button>
              </a>
            </>
          ) : (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all group">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold shadow-inner text-white">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium text-gray-200 pr-2 group-hover:text-emerald-400 transition-colors">
                  {user?.name?.split(" ")[0]}
                </span>
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 mt-3 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl py-2 z-20">
                    <div className="px-4 py-3 border-b border-white/10 mb-2">
                      <p className="text-sm text-white font-medium truncate">{user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">Student Account</p>
                    </div>
                    {isAdmin && <a href="/admin-dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-emerald-600/10 hover:text-emerald-400 mx-2 rounded-lg transition-colors"><LayoutDashboard size={16} /> Admin Dashboard</a>}
                    <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-emerald-600/10 hover:text-emerald-400 mx-2 rounded-lg transition-colors"><User size={16} /> My Profile</a>
                    <div className="border-t border-white/10 my-2"></div>
                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 mx-2 rounded-lg transition-colors"><LogOut size={16} /> Logout</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* ================= Mobile Menu Button ================= */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-300 hover:text-emerald-400 transition-colors">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ================= Mobile Dropdown ================= */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#0a0a0a] border-t border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col gap-1 p-6 h-[90vh] overflow-y-auto">
          
          <ListItem title="Home" href="/" />
          <ListItem className="text-emerald-400 color-white" title="Courses" href="/courses" />
          
          
          {/* 🤖 Mobile AI Tutor */}
          <div className="py-2">
             <a href="/ai-tutor" className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-900/20 px-4 py-3 rounded-xl border border-emerald-500/30">
                <Bot size={20} /> Ask AI Tutor
             </a>
          </div>

          <ListItem title="Teachers" href="/teachers" />
          <ListItem title="Contact" href="/contact" />

          {/* 📱 Mobile Test Prep Accordion */}
          <div className="border-t border-white/10 border-b py-2 mt-2">
             <button 
               onClick={() => setTestPrepOpen(!testPrepOpen)}
               className="flex w-full items-center justify-between text-gray-300 font-medium py-2 hover:text-emerald-400 transition-colors"
             >
                Test Prep 
                <ChevronDown size={16} className={`transition-transform duration-300 ${testPrepOpen ? "rotate-180 text-emerald-500" : ""}`} />
             </button>
             
             {/* Submenu */}
             <div className={`flex flex-col gap-2 pl-4 overflow-hidden transition-all duration-300 ${testPrepOpen ? "max-h-40 mt-2 pb-2" : "max-h-0"}`}>
                <a href="/take-test" className="text-sm text-gray-400 hover:text-emerald-400 py-1 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Take Test
                </a>
                <a href="/prep-test" className="text-sm text-gray-400 hover:text-emerald-400 py-1 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Preparation Test
                </a>
             </div>
          </div>
          
          {/* 📱 Mobile Auth Section */}
          <div className="mt-6 flex flex-col gap-3">
             {!isLoggedIn ? (
               <>
                 <a href="/login" className="w-full">
                   <button className="w-full border border-white/20 text-white py-3 rounded-xl hover:bg-white/5 transition-colors font-medium">
                     Login
                   </button>
                 </a>
                 <a href="/register" className="w-full">
                   <button className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium shadow-lg shadow-emerald-900/20">
                     Register
                   </button>
                 </a>
               </>
             ) : (
               <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  {/* User Info Card */}
                  <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                     <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0)}
                     </div>
                     <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                        <p className="text-xs text-emerald-400">Logged In</p>
                     </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col gap-2">
                     {isAdmin && (
                        <a href="/admin-dashboard" className="flex items-center gap-3 text-gray-300 hover:text-white px-2 py-2 rounded-lg hover:bg-white/5 transition-colors">
                           <LayoutDashboard size={18} /> Admin Panel
                        </a>
                     )}
                     <a href="/profile" className="flex items-center gap-3 text-gray-300 hover:text-white px-2 py-2 rounded-lg hover:bg-white/5 transition-colors">
                        <User size={18} /> My Profile
                     </a>
                     <a href="/my-courses" className="flex items-center gap-3 text-gray-300 hover:text-white px-2 py-2 rounded-lg hover:bg-white/5 transition-colors">
                        <BookOpen size={18} /> My Courses
                     </a>
                     
                     <button 
                       onClick={handleLogout} 
                       className="flex items-center gap-3 text-red-400 hover:text-red-300 px-2 py-2 rounded-lg hover:bg-red-500/10 transition-colors mt-2"
                     >
                        <LogOut size={18} /> Logout
                     </button>
                  </div>
               </div>
             )}
          </div>

        </div>
      </div>
    </nav>
  );
}