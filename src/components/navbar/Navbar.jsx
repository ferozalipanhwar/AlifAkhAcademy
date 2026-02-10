import {
  BookOpen,
  Bot,
  ChevronDown,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [testPrepOpen, setTestPrepOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;
  const isAdmin = user?.isAdmin === true;

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // Smart Navigation Helper
  // Agar Home page par ho to Scroll karega, nahi to redirect karega
  const handleNavigation = (id) => {
    setIsOpen(false); // Close menu
    
    if (window.location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 border-b border-white/5
          ${scrolled || isOpen ? "bg-black/90 backdrop-blur-md py-4 shadow-xl" : "bg-black/50 backdrop-blur-sm py-5"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-white">
          
          {/* ================= Logo ================= */}
          <div className="flex items-center gap-2 group cursor-pointer z-50 relative" onClick={() => window.location.href = '/'}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-900/50 transition-transform group-hover:scale-105 border border-white/10">
              <span className="font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-lg tracking-tight ">
              ALIF-AKH<span className="text-emerald-500">ACADEMY</span>
            </span>
          </div>

          {/* ================= Desktop Menu ================= */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => handleNavigation('home')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</button>
            <button onClick={() => handleNavigation('courses')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Courses</button>
            
            {/* AI Tutor */}
            <a href="/ai-tutor" className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-1 group">
               <Bot size={16} className="text-emerald-500 group-hover:animate-bounce" /> AI Tutor
            </a>

            <button onClick={() => handleNavigation('teachers')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Teachers</button>
            <button onClick={() => handleNavigation('contact')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</button>

            {/* Test Prep Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 font-medium text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                Test Prep <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="bg-[#0F0F0F]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden w-52 p-2">
                  <a href="/take-test" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Take Test
                  </a>
                  <a href="/prep-test" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Preparation Test
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ================= Desktop Auth Section ================= */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <a href="/login" className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2 transition-colors">Login</a>
                <a href="/register">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 transform hover:-translate-y-0.5">
                    Register
                  </button>
                </a>
              </>
            ) : (
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold shadow-inner text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-200 pr-2 group-hover:text-emerald-400 transition-colors">
                    {user?.name?.split(" ")[0]}
                  </span>
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-3 w-60 bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl py-2 z-20">
                      <div className="px-5 py-4 border-b border-white/5 mb-2">
                        <p className="text-sm text-white font-bold truncate">{user?.name}</p>
                        <p className="text-xs text-emerald-500 font-medium">Student Account</p>
                      </div>
                      {isAdmin && <a href="/admin-dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white mx-2 rounded-xl transition-colors"><LayoutDashboard size={16} /> Admin Dashboard</a>}
                      <a href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white mx-2 rounded-xl transition-colors"><User size={16} /> My Profile</a>
                      <div className="border-t border-white/5 my-2"></div>
                      <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 mx-2 rounded-xl transition-colors"><LogOut size={16} /> Logout</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* ================= Mobile Menu Button ================= */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(true)} 
              className="p-2 text-gray-300 hover:text-white transition-colors bg-white/5 rounded-lg border border-white/5 active:scale-95"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= PREMIUM MOBILE DRAWER ================= */}
      
      {/* 1. Backdrop Blur */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[60] transition-opacity duration-500 md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* 2. Slide-over Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-[85%] max-w-[320px] bg-[#0A0A0A] border-l border-white/10 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) z-[70] md:hidden flex flex-col h-full ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
             <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-green-700 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md border border-white/10">
                A
             </div>
              <span className="font-bold text-lg tracking-tight text-white">
              ALIF-AKH<span className="text-emerald-500">ACADEMY</span>
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/5"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 no-scrollbar">
          
          {/* Links List */}
          <div className="flex flex-col gap-2">
            <button onClick={() => handleNavigation('home')} className="flex items-center gap-3 w-full p-3 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium">
               <Home size={20} className="text-emerald-500"/> Home
            </button>
            <button onClick={() => handleNavigation('courses')} className="flex items-center gap-3 w-full p-3 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium">
               <BookOpen size={20} className="text-emerald-500"/> Courses
            </button>
            
            {/* AI Tutor Special Button */}
            <a href="/ai-tutor" onClick={() => setIsOpen(false)} className="flex items-center gap-3 w-full p-3 bg-gradient-to-r from-emerald-900/30 to-emerald-800/10 border border-emerald-500/20 rounded-xl group transition-all mt-2">
               <Bot size={20} className="text-emerald-400"/> 
               <div className="flex flex-col">
                  <span className="text-emerald-400 font-bold leading-none">AI Tutor</span>
                  <span className="text-[10px] text-emerald-500/60 mt-1">Ask doubts instantly</span>
               </div>
               <Sparkles size={16} className="ml-auto text-emerald-500/40" />
            </a>

            <button onClick={() => handleNavigation('teachers')} className="flex items-center gap-3 w-full p-3 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium">
               <Users size={20} className="text-emerald-500"/> Teachers
            </button>
            <button onClick={() => handleNavigation('contact')} className="flex items-center gap-3 w-full p-3 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium">
               <Phone size={20} className="text-emerald-500"/> Contact
            </button>
          </div>

          {/* Test Prep Accordion */}
          <div className="border border-white/5 rounded-2xl bg-white/[0.02] overflow-hidden mt-2">
             <button 
               onClick={() => setTestPrepOpen(!testPrepOpen)}
               className="flex w-full items-center justify-between p-4 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
             >
               <span className="flex items-center gap-3 font-medium">
                  <ShieldCheck size={20} className="text-emerald-500/80" /> Test Prep
               </span>
               <ChevronDown size={18} className={`transition-transform duration-300 ${testPrepOpen ? "rotate-180 text-emerald-500" : "text-gray-600"}`} />
             </button>
             
             <div className={`flex flex-col bg-black/20 transition-all duration-300 origin-top ${testPrepOpen ? "max-h-40 py-2 opacity-100" : "max-h-0 opacity-0"}`}>
                <a href="/take-test" onClick={() => setIsOpen(false)} className="pl-12 pr-5 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-3 border-l-2 border-transparent hover:border-emerald-500 ml-5">
                   Take Test
                </a>
                <a href="/prep-test" onClick={() => setIsOpen(false)} className="pl-12 pr-5 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-3 border-l-2 border-transparent hover:border-emerald-500 ml-5">
                   Preparation
                </a>
             </div>
          </div>

          {/* Bottom Spacer for fixed footer */}
          <div className="h-24"></div>
        </div>

        {/* Fixed Footer (Profile/Auth) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#0A0A0A] border-t border-white/10 backdrop-blur-xl shrink-0">
          {!isLoggedIn ? (
            <div className="grid grid-cols-2 gap-4">
              <a href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-3.5 rounded-xl border border-white/10 text-white text-sm font-semibold hover:bg-white/5 transition-colors">
                Log In
              </a>
              <a href="/register" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-3.5 rounded-xl bg-emerald-600 text-white text-sm font-bold shadow-lg shadow-emerald-900/30 hover:bg-emerald-700 transition-colors">
                Register
              </a>
            </div>
          ) : (
             <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-inner ring-2 ring-black">
                      {user?.name?.charAt(0).toUpperCase()}
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm truncate">{user?.name}</p>
                      <p className="text-emerald-500 text-xs font-medium truncate">Student Account</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                   {isAdmin && (
                      <a href="/admin-dashboard" onClick={() => setIsOpen(false)} className="col-span-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-medium text-emerald-400 transition-colors border border-emerald-500/20">
                         <LayoutDashboard size={14} /> Admin
                      </a>
                   )}
                   <a href="/profile" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 text-xs font-medium text-gray-300 transition-colors">
                      <User size={14} /> Profile
                   </a>
                   <button 
                     onClick={() => { handleLogout(); setIsOpen(false); }} 
                     className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-colors border border-red-500/10"
                   >
                      <LogOut size={14} /> Logout
                   </button>
                </div>
             </div>
          )}
        </div>

      </div>
    </>
  );
}