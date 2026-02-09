import {
  Bot,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User
} from "lucide-react";
import { useEffect, useState } from "react";

// Helper to scroll to a section ID
const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    // If not found (on another page), redirect to homepage with hash
    window.location.href = `/#${sectionId}`;
  }
};

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 border-b border-white/5
          ${scrolled || isOpen ? "bg-black/90 backdrop-blur-md py-4 shadow-xl" : "bg-black/50 backdrop-blur-sm py-5"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-white">
          
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer z-50 relative" onClick={() => window.location.href = '/'}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-900/50 transition-transform group-hover:scale-105 border border-white/10">
              <span className="font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-lg tracking-tight">
              ALIF-AKH<span className="text-emerald-500">ACADEMY</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection("home")} className="text-gray-300 hover:text-emerald-400 transition-colors">Home</button>
            <button onClick={() => scrollToSection("courses")} className="text-gray-300 hover:text-emerald-400 transition-colors">Courses</button>

            <a href="/ai-tutor" className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-1 group">
               <Bot size={16} className="text-emerald-500 group-hover:animate-bounce" /> AI Tutor
            </a>

            <button onClick={() => scrollToSection("teachers")} className="text-gray-300 hover:text-emerald-400 transition-colors">Teachers</button>
            <button onClick={() => scrollToSection("contact")} className="text-gray-300 hover:text-emerald-400 transition-colors">Contact</button>
          
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

          {/* Desktop Auth */}
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)} className="p-2 text-gray-300 hover:text-white transition-colors bg-white/5 rounded-lg border border-white/5 active:scale-95">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[60] transition-opacity duration-500 md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsOpen(false)} />
      <div className={`fixed inset-y-0 right-0 w-[85%] max-w-[320px] bg-[#0A0A0A] border-l border-white/10 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) z-[70] md:hidden flex flex-col h-full ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Mobile content can also use scrollToSection */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 no-scrollbar">
          <button onClick={() => { scrollToSection("home"); handleLinkClick(); }} className="text-lg font-medium">Home</button>
          <button onClick={() => { scrollToSection("courses"); handleLinkClick(); }} className="text-lg font-medium">Courses</button>
          <button onClick={() => { scrollToSection("teachers"); handleLinkClick(); }} className="text-lg font-medium">Teachers</button>
          <button onClick={() => { scrollToSection("contact"); handleLinkClick(); }} className="text-lg font-medium">Contact</button>
        </div>
      </div>
    </>
  );
}
