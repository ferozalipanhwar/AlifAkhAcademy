import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  XCircle
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../apiHelper/api.js";

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Client-side Validation
    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match!" });
      return;
    }
    if (formData.password.length < 6) {
      setStatus({ type: "error", message: "Password must be at least 6 characters." });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setStatus({ type: "success", message: "Account created successfully!" });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Register Error:", error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Registration failed. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if passwords match for visual feedback
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        
        {/* ================= LEFT SIDE: FORM ================= */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative"
        >
          {/* Logo */}
          <div className="absolute top-3 left-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 m-2 rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold text-gray-800 tracking-tight">Alif-Akh</span>
          </div>

          <div className="mt-8 md:mt-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-500 mb-8">Join us to start your learning journey.</p>

            {/* Status Message */}
            {status.message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg text-sm font-medium mb-6 flex items-center gap-2 border ${
                  status.type === 'error' 
                    ? 'bg-red-50 text-red-600 border-red-100' 
                    : 'bg-green-50 text-green-600 border-green-100'
                }`}
              >
                {status.type === 'error' ? <XCircle size={18}/> : <CheckCircle size={18}/>} 
                {status.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-emerald-600 transition-colors w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-emerald-600 transition-colors w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-emerald-600 transition-colors w-5 h-5" />
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-gray-700"
                    required
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 ml-1">Confirm Password</label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-3.5 transition-colors w-5 h-5 ${passwordsMatch ? "text-green-500" : "text-gray-400 group-focus-within:text-emerald-600"}`} />
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-4 outline-none transition-all font-medium text-gray-700 ${
                      passwordsMatch 
                      ? "border-green-300 focus:border-green-500 focus:ring-green-500/10" 
                      : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/10"
                    }`}
                    required
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Sign Up <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-600 font-bold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>

        {/* ================= RIGHT SIDE: IMAGE ================= */}
        <div className="hidden md:flex w-1/2 bg-gray-900 relative overflow-hidden items-center justify-center p-12">
           {/* Background Image  */}
           <div 
             className="absolute inset-0 bg-cover bg-center opacity-50"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')" }}
           ></div>
           
           {/* Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-bl from-emerald-900/90 to-black/70"></div>

           {/* Content */}
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative z-10 text-white space-y-6 max-w-md text-center"
           >
              <h3 className="text-3xl font-bold leading-tight">Start Your Future Today</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                "The beautiful thing about learning is that no one can take it away from you."
              </p>
              
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 mt-8">
                 <div className="text-center">
                    <h4 className="text-2xl font-bold text-emerald-400">10k+</h4>
                    <p className="text-xs text-gray-400">Students</p>
                 </div>
                 <div className="text-center border-l border-white/10">
                    <h4 className="text-2xl font-bold text-emerald-400">50+</h4>
                    <p className="text-xs text-gray-400">Courses</p>
                 </div>
                 <div className="text-center border-l border-white/10">
                    <h4 className="text-2xl font-bold text-emerald-400">4.9</h4>
                    <p className="text-xs text-gray-400">Rating</p>
                 </div>
              </div>
           </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Register;