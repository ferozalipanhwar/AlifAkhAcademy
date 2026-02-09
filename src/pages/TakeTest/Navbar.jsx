import { FaArrowLeft, FaBell, FaClipboardList, FaGraduationCap, FaHeadset, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    // FIX: "fixed top-0 left-0 right-0" add kiya taake yeh sabse upar chipak jaye
    <div className="fixed top-0 left-0 right-0 z-[100] w-full font-sans shadow-md bg-white">
      
      {/* --- LEVEL 1: TOP GREEN BAR --- */}
      <div className="w-full bg-emerald-700 text-white py-2.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-800/50 hover:bg-emerald-600 text-emerald-100 hover:text-white transition-all focus:outline-none"
              title="Go Back"
            >
              <FaArrowLeft size={14} />
            </button>
            <div className="h-5 w-px bg-emerald-500/30 hidden sm:block"></div>
            <h1 className="text-lg font-bold tracking-wide text-white flex items-center gap-2">
              AlifAkhAcademy
              <span className="text-[10px] bg-emerald-900/40 px-1.5 py-0.5 rounded text-emerald-200 border border-emerald-500/20 tracking-wider">PRO</span>
            </h1>
          </div>

          <div>
             <button className="flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm transform hover:-translate-y-0.5 border border-transparent hover:border-emerald-200">
                <FaGraduationCap size={14} />
                <span>Enroll Courses</span>
             </button>
          </div>

        </div>
      </div>

      {/* --- LEVEL 2: CONTEXT BAR --- */}
      <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm border border-emerald-100">
                  <FaClipboardList size={20} />
               </div>
               <div>
                  <h2 className="text-gray-800 font-bold text-base leading-tight">Assessment Platform</h2>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest">Student Dashboard</p>
               </div>
            </div>

            <div className="flex-1"></div>

            <div className="flex items-center gap-4 sm:gap-6">
              <button className="hidden lg:flex items-center gap-1.5 text-gray-500 hover:text-emerald-600 transition-colors text-xs font-bold uppercase tracking-wide">
                <FaHeadset size={16} /> 
                <span>Help</span>
              </button>
              <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
              <button className="relative p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all">
                <FaBell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <div className="flex items-center gap-3 pl-2 sm:border-l border-gray-100 sm:ml-2 group cursor-pointer">
                <div className="hidden sm:block text-right leading-tight">
                  <p className="text-sm font-bold text-gray-700 group-hover:text-emerald-700 transition-colors">Sikandar</p>
                  <p className="text-[10px] text-emerald-600 font-bold">Student</p>
                </div>
                <FaUserCircle className="text-gray-300 group-hover:text-emerald-600 transition-colors shadow-sm rounded-full" size={40} />
              </div>
            </div>
          </div>
        </div>
      </nav>
      
    </div>
  );
};

export default Navbar;