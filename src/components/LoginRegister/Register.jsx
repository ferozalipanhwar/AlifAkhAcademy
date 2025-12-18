import { Lock, Mail, User, UserPlus } from "lucide-react";
import { useState } from "react";
import API from "../../apiHelper/api.js"; // ✅ axios instance

const getMessageStyles = (type) => {
  switch (type) {
    case "success":
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-700",
        borderColor: "border-green-400",
      };
    case "error":
      return {
        bgColor: "bg-red-100",
        textColor: "text-red-700",
        borderColor: "border-red-400",
      };
    default:
      return {
        bgColor: "bg-blue-100",
        textColor: "text-blue-700",
        borderColor: "border-blue-400",
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
  const [messageType, setMessageType] = useState("info");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (formData.password !== formData.confirmPassword) {
      setMessageType("error");
      return setMessage("❌ Passwords do not match!");
    }

    setLoading(true);
    setMessage("");
    setMessageType("info");

    try {
      await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setMessageType("success");
      setMessage("✅ Account created! Redirecting to login...");

      setTimeout(() => {
        window.location.href = "/AlifAkhAcademy/login";
      }, 1500);
    } catch (error) {
      setMessageType("error");
      setMessage(
        `❌ ${error.response?.data?.message || "Registration failed"}`
      );
    }

    setLoading(false);
  };

  const { bgColor, textColor, borderColor } = getMessageStyles(messageType);

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-sky-100">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6 flex justify-center items-center">
          <UserPlus className="mr-3 w-7 h-7" />
          Create Account
        </h2>

        {message && (
          <p
            className={`text-center mb-4 font-semibold p-3 rounded-xl border-2 ${borderColor} ${bgColor} ${textColor}`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <Input icon={User} name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          {/* Email */}
          <Input icon={Mail} name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          {/* Password */}
          <Input icon={Lock} name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          {/* Confirm */}
          <Input icon={Lock} name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "⏳ Registering..." : "✨ Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/AlifAkhAcademy/login" className="text-green-700 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

const Input = ({ icon: Icon, ...props }) => (
  <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500 shadow-sm">
    <Icon className="text-green-600 mr-3 w-5 h-5" />
    <input {...props} className="w-full bg-transparent outline-none" required />
  </div>
);

export default Register;
