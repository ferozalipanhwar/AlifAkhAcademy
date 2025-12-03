import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
const getMessageStyles = (type) => {
  switch (type) {
    case 'success':
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        borderColor: 'border-green-400',
      };
    case 'error':
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
        borderColor: 'border-red-400',
      };
    case 'info':
    default:
      return {
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-400',
      };
  }
};


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState('info'); 

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (formData.password !== formData.confirmPassword) {
      setMessageType('error');
      return setMessage("❌ Passwords do not match!");
    }

    setLoading(true);
    setMessage("");
    setMessageType('info'); // Set to 'info' while loading/processing

    try {
     
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
    
        setMessageType('success');
        setMessage("✅ Registration successful!");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" }); // Clear form on success
      } else {
       
        setMessageType('error');
        setMessage(`❌ ${data.message || "Something went wrong!"}`);
      }
    }
    catch (error) {

      console.error(error);
      setMessageType('error');
      setMessage("❌ Server error, please try again!");
    }

    setLoading(false);
  };

  const { bgColor, textColor, borderColor } = getMessageStyles(messageType);


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

        {message && (
          <p className={`text-center mb-4 font-semibold p-3 rounded-xl border-2 transition-all duration-300 ${borderColor} ${bgColor} ${textColor}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500 transition-all duration-300">
            {/* Switched FaUser to User */}
            <User className="text-green-600 mr-3 w-5 h-5" />
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
            {/* Switched FaEnvelope to Mail */}
            <Mail className="text-green-600 mr-3 w-5 h-5" />
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
            {/* Switched FaLock to Lock */}
            <Lock className="text-green-600 mr-3 w-5 h-5" />
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
            {/* Switched FaLock to Lock */}
            <Lock className="text-green-600 mr-3 w-5 h-5" />
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
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Registering..." : "✨ Register"}
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