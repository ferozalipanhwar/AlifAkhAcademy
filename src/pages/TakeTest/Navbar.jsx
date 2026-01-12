import { FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-200">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 tracking-tight leading-none">
                Alifakh Academy
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-green-600 font-semibold mt-0.5">
                Assessment Platform
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors relative">
              <FaBell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-700">Student Panel</p>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
              <FaUserCircle className="text-gray-300 hover:text-green-600 cursor-pointer transition-colors" size={36} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;