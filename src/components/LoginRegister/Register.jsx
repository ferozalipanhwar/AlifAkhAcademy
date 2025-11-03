import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    alert("Register button clicked (dummy)!");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4"
     style={{
        backgroundColor: "#e0f2fe",
      }}
    >
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          📖 Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500 transition-all duration-300">
            <FaUser className="text-green-600 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500 transition-all duration-300">
            <FaEnvelope className="text-green-600 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500 transition-all duration-300">
            <FaLock className="text-green-600 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500 transition-all duration-300">
            <FaLock className="text-green-600 mr-3" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-md"
          >
            ✨ Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a
            href="/AlifAkhAcademy/login"
            className="text-green-700 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
