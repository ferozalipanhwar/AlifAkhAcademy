import { Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
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


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState('info'); 

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    if (loading) return;

    setLoading(true);
    setMessage("");
    setMessageType('info'); 

    try {
      
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log("Login Response:", data);
if (res.ok) {
  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  setMessageType('success');
  setMessage("✅ Login successful! Redirecting to home page...");

  setTimeout(() => {
    window.location.href = '/';
  }, 1500);
}
 else {
        
        setMessageType('error');
        setMessage(`❌ ${data.message || "Invalid email or password. Please try again."}`);
      }
    }
    catch (error) {
      
      console.error("Fetch Error:", error);
      setMessageType('error');
      setMessage("❌ Network error or server unreachable. Please check your connection.");
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
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-md animate-fadeIn transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6 flex items-center justify-center">
          <LogIn className="mr-3 w-7 h-7" /> Welcome Back
        </h2>
        
      
        {message && (
          <p className={`text-center mb-4 font-semibold p-3 rounded-xl border-2 transition-all duration-300 ${borderColor} ${bgColor} ${textColor}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500 transition-all duration-300 shadow-sm">
            <Mail className="text-green-600 mr-3 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500 transition-all duration-300 shadow-sm">
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                </>
            ) : "🚀 Login"}
          </button>
        </form>

        {/* Footer Text */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a
            href="/AlifAkhAcademy/register"
            className="text-green-700 font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;