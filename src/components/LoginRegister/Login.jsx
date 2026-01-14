import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../apiHelper/api.js";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await API.post("/auth/login", formData);
      const data = res.data;

      if (data.token) localStorage.setItem("authToken", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      setStatus({ type: "success", message: "Successfully logged in!" });

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      console.error("Login Error:", error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* ================= LEFT SIDE: FORM ================= */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative"
        >
          {/* Logo / Brand (Optional) */}
          <div className="absolute top-8 left-12 flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold text-gray-800 tracking-tight">Alif-Akh</span>
          </div>

          <div className="mt-8 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>

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
                {status.type === 'error' ? '⚠️' : '✅'} {status.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-emerald-600 transition-colors w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-gray-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-8">
              Don't have an account?{" "}
              <Link to="/register" className="text-emerald-600 font-bold hover:underline">
                Register for free
              </Link>
            </p>
          </div>
        </motion.div>

        {/* ================= RIGHT SIDE: IMAGE/CONTENT ================= */}
        <div className="hidden md:flex w-1/2 bg-gray-900 relative overflow-hidden items-center justify-center p-12">
           {/* Background Image with Overlay */}
           <div 
             className="absolute inset-0 bg-cover bg-center opacity-40"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?q=80&w=1970&auto=format&fit=crop')" }}
           ></div>
           
           {/* Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 to-black/80"></div>

           {/* Content */}
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative z-10 text-center text-white space-y-6 max-w-md"
           >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto border border-white/20 mb-6">
                 <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                 </svg>
              </div>
              <h3 className="text-3xl font-bold leading-tight">Empowering Education for Everyone</h3>
              <p className="text-gray-300 leading-relaxed">
                Join our community of learners and educators. Access top-tier courses, track your progress, and achieve your goals with Alif-Akh Academy.
              </p>
              
              {/* Testimonial Snippet */}
              <div className="pt-8 border-t border-white/10 mt-8">
                 <div className="flex items-center justify-center gap-2 mb-2">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                 </div>
                 <p className="text-sm font-medium text-emerald-200">"The best platform for online learning!"</p>
              </div>
           </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Login;