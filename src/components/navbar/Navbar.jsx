import { LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import ListItem from "./ListItem";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
      <div className="hidden md:flex items-center gap-5">
        <ListItem title="Home" />
        <ListItem title="Courses" />
        <ListItem title="Teachers" />
        <ListItem title="About Us" />
        <ListItem title="Contact" />
      </div>

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center gap-5">
        {!isLoggedIn ? (
          <>
            <a href="/AlifAkhAcademy/login">
              <button className="me-7 cursor-pointer hover:text-green-500">
                Login
              </button>
            </a>

            <a href="/AlifAkhAcademy/register">
              <button className="bg-emerald-500 px-5 py-2 rounded-full hover:bg-emerald-600 duration-300">
                Register
              </button>
            </a>
          </>
        ) : (
          <div className="relative">
            {/* User Icon */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 cursor-pointer hover:text-green-400"
            >
              <User className="w-6 h-6 text-emerald-500" />
              <span className="font-medium">{user?.name}</span>
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 bg-white text-black rounded-xl shadow-lg w-48 py-3">

                {isAdmin && (
                  <a
                    href="/AlifAkhAcademy/admin-dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    🛠️ Admin Dashboard
                  </a>
                )}
                <a
                  href="profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
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
        <div className="absolute top-16 left-0 w-full bg-black flex flex-col items-center gap-5 py-5 md:hidden">
          <ListItem title="Home" />
          <ListItem title="Courses" />
          <ListItem title="Teachers" />
          <ListItem title="About Us" />
          <ListItem title="Contact" />

          {/* Mobile login/register OR profile */}
          {!isLoggedIn ? (
            <div className="flex flex-col gap-3 w-full px-10">
              <a href="/AlifAkhAcademy/login">
                <button className="w-full border py-2 rounded">Login</button>
              </a>

              <a href="/AlifAkhAcademy/register">
                <button className="w-full bg-emerald-500 px-5 py-2 rounded-full hover:bg-emerald-600 duration-300">
                  Register
                </button>
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full px-10 text-white">
              {isAdmin && (
                  <a
                    href="/AlifAkhAcademy/admin-dashboard"
                   
                  >
                    <button className="w-full border py-2 rounded"> Admin Dashboard</button>
                
                  </a>
              )}

              <a href="profile">
                <button className="w-full border py-2 rounded">Profile</button>
              </a>

              <a href="/my-courses">
                <button className="w-full border py-2 rounded">
                  My Courses
                </button>
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
