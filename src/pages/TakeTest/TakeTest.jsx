import { motion } from "framer-motion"; // Animation ke liye
import { Lock, LogIn, ShieldCheck, Sparkles } from "lucide-react"; // Icons
import { useContext, useState } from "react";
import { Link } from "react-router-dom"; // Login link ke liye
import { AuthContext } from "../../context/AuthContext";
import ResultScreen from "./ResultScreen";
import TestCategories from "./TestCategories";
import TestScreen from "./TestScreen";

const TakeTest = () => {
  const { user } = useContext(AuthContext);

  const [step, setStep] = useState("categories");
  const [selectedTest, setSelectedTest] = useState(null);
  const [result, setResult] = useState(null);

  const handleStartTest = (test) => {
    setSelectedTest(test);
    setStep("test");
  };

  const handleResult = (resultData) => {
    setResult(resultData);
    setStep("result");
  };

  // 🔒 ACCESS DENIED / LOGIN SCREEN
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col justify-center items-center p-6 font-sans">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center relative overflow-hidden"
        >
          {/* Decorative Background Blob */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

          {/* Icon Container */}
          <div className="relative mb-8 flex justify-center">
             <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
                <Lock className="text-white w-10 h-10" />
             </div>
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 w-24 h-24 border-2 border-dashed border-indigo-300 rounded-full"
             />
          </div>

          <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
            Student Access Only
          </h2>
          
          <p className="text-gray-500 mb-8 leading-relaxed">
            Unlock quizzes, track your progress, and earn certificates. Please log in to your account to start testing your skills.
          </p>

          {/* Features List (Optional decoration) */}
          <div className="flex justify-center gap-4 mb-8 text-xs text-gray-400 font-medium">
             <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-green-500"/> Secure Exam</span>
             <span className="flex items-center gap-1"><Sparkles size={14} className="text-yellow-500"/> Earn Points</span>
          </div>

          {/* Login Button */}
          <Link 
            to="/login" 
            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LogIn className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" aria-hidden="true" />
            </span>
            Log In to Continue
          </Link>
          
          <p className="mt-6 text-xs text-gray-400">
            Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline font-bold">Register here</Link>
          </p>

        </motion.div>
      </div>
    );
  }

  // --- MAIN APP CONTENT ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {step === "categories" && (
          <TestCategories onStart={handleStartTest} setStep={setStep} />
        )}
        {step === "test" && (
          <TestScreen test={selectedTest} onFinish={handleResult} />
        )}
        {step === "result" && (
          <ResultScreen result={result} />
        )}
      </div>
    </div>
  );
};

export default TakeTest;