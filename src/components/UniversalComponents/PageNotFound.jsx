import { motion } from "framer-motion";
import { Ghost, Home, MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background Decoration (Giant 404) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        <h1 className="text-[20rem] md:text-[30rem] font-black text-gray-900">
          404
        </h1>
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        
        {/* Animated Icon */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: -20 }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 2, 
            ease: "easeInOut" 
          }}
          className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600 shadow-lg shadow-emerald-100"
        >
          <Ghost size={48} />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Whoops! This page vanished.
          </h2>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            The page you are looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-white hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MoveLeft size={18} />
              Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 transition-all flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
      
    </div>
  );
};

export default PageNotFound;