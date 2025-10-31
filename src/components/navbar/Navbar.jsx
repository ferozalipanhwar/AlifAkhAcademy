import { Menu, X } from "lucide-react"; // icons
import { useState } from "react";
import ListItem from "./ListItem";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed bg-black px-5 md:px-20 py-5 flex items-center justify-between text-white z-40">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img className="size-10 shrink-0" src="./images/logo.svg" alt="logo" />
        <span className="font-semibold text-lg">
          ALIF-AKH<span className="text-emerald-500 ms-1">ACADEMY</span>
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-5">
        <ListItem  title="Home" />
        <ListItem  title="Courses" />
        <ListItem title="Teachers" />
        <ListItem title="Programs" />
        <ListItem title="About Us" />
        <ListItem title="Contact" />
      </div>

      {/* Buttons */}
      <div className="hidden md:flex items-center">
        <button className="me-7 cursor-pointer hover:text-green-500">Login</button>
        <button className="bg-emerald-500 px-5 py-2 cursor-pointer hover:bg-transparent border-1 rounded-full hover:bg-emerald-600 duration-300">
          Register
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black flex flex-col items-center gap-5 py-5 md:hidden">
          <ListItem title="Home" />
          <ListItem title="Course's" />
          <ListItem title="Teacher" />
          <ListItem title="Program's" />
          <ListItem title="About Us" />
          <ListItem title="Contact Us" />

          <div className="flex flex-col gap-3 w-full px-10">
            <button className="w-full border py-2 rounded">Login</button>
            <button className="w-full bg-emerald-500 px-5 py-2 rounded-full hover:bg-emerald-600 duration-300">
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
