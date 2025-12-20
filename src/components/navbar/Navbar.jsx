import { LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";

const ListItem = ({ title, href }) => {
  return (
    <ul className="flex items-center gap-3">
      <li className="font-semibold">
        <a
          href={href || `#${title.replace(/\s+/g, "")}`}
          className="hover:border-b-2 hover:text-emerald-500 hover:pb-1 transition-all"
        >
          {title}
        </a>
      </li>
    </ul>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [testPrepOpen, setTestPrepOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;

  const isAdmin = user?.isAdmin === true;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="w-full fixed bg-black px-5 md:px-20 py-5 flex items-center justify-between text-white z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img className="size-10 shrink-0" src="./images/logo.svg" alt="logo" />
        <span className="font-semibold text-lg">
          ALIF-AKH<span className="text-emerald-500 ms-1">ACADEMY</span>
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-5 relative">
        <ListItem title="Home" />
        <ListItem title="Courses" />
        <ListItem title="Teachers" />
        <ListItem title="About Us" />
        <ListItem title="Contact" />

        {/* Test Prep Dropdown */}
        <div className="relative group">
          <button className="font-semibold hover:text-emerald-500 transition-all">
            Test Prep ▾
          </button>
          <div className="absolute top-full left-0 hidden group-hover:block bg-white text-black rounded-lg shadow-lg w-48 mt-0 z-50">
            <a href="/take-test" className="block px-4 py-2 hover:bg-gray-100">Take Test</a>
            <a href="/prep-test" className="block px-4 py-2 hover:bg-gray-100">Preparation Test</a>
        
          </div>
        </div>
      </div>

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center gap-5">
        {!isLoggedIn ? (
          <>
            <a href="/login">
              <button className="me-7 cursor-pointer hover:text-green-500">Login</button>
            </a>
            <a href="/register">
              <button className="bg-emerald-500 px-5 py-2 rounded-full hover:bg-emerald-600 duration-300">
                Register
              </button>
            </a>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 cursor-pointer hover:text-green-400"
            >
              <User className="w-6 h-6 text-emerald-500" />
              <span className="font-medium">{user?.name}</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 bg-white text-black rounded-xl shadow-lg w-48 py-3 z-50">
                {isAdmin && (
                  <a
                    href="/admin-dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    🛠️ Admin Dashboard
                  </a>
                )}
                <a href="profile" className="block px-4 py-2 hover:bg-gray-100">
                  👤 Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-red-100"
                >
                  <LogOut size={18} className="text-red-600" /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black flex flex-col items-center gap-5 py-5 md:hidden z-50">
          <ListItem title="Home" />
          <ListItem title="Courses" />
          <ListItem title="Teachers" />
          <ListItem title="About Us" />
          <ListItem title="Contact" />

          {/* Test Prep Mobile */}
          <div className="w-full px-10">
            <button
              onClick={() => setTestPrepOpen(!testPrepOpen)}
              className="w-full  py-2 rounded "
            >
              Test Prep ▾
            </button>
            
            {testPrepOpen && (
              <div className="flex flex-col text-center   mt-2 gap-2 px-4 text-white bg-gray-700 rounded-lg py-3 ">
                <a href="/take-test" className="hover:text-emerald-400"> Take Test</a>
                <a href="/prep-test" className="hover:text-emerald-400">Preparation Test</a>
              
              </div>
            )}
          </div>

          {/* Mobile login/register OR profile */}
          {!isLoggedIn ? (
            <div className="flex flex-col gap-3 w-full px-10">
              <a href="/login">
                <button className="w-full border py-2 rounded">Login</button>
              </a>
              <a href="/register">
                <button className="w-full bg-emerald-500 px-5 py-2 rounded-full hover:bg-emerald-600 duration-300">
                  Register
                </button>
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full px-10 text-white">
              {isAdmin && (
                <a href="/admin-dashboard">
                  <button className="w-full border py-2 rounded"> Admin Dashboard</button>
                </a>
              )}
              <a href="/profile">
                <button className="w-full border py-2 rounded">Profile</button>
              </a>
              <a href="/my-courses">
                <button className="w-full border py-2 rounded">My Courses</button>
              </a>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 py-2 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
