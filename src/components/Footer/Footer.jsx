
const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Left Side */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📘</span>
          <span className="font-semibold text-lg">EDUCATION</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-sm">
          <li><a href="#" className="hover:text-green-400">Home</a></li>
          <li><a href="#AboutUs" className="hover:text-green-400">About Us</a></li>
          <li><a href="#Courses" className="hover:text-green-400">Courses</a></li>
          <li><a href="#Teachers" className="hover:text-green-400">Teachers</a></li>
          <li><a href="#Programs" className="hover:text-green-400">Programs</a></li>
          <li><a href="#Contact" className="hover:text-green-400">Contact </a></li>
        </ul>
      </div>
      <div className="text-center text-sm mt-4 text-gray-400">
        &copy; {new Date().getFullYear()} Alif-Akh Academy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
