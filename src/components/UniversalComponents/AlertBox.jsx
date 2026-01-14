import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

const AlertBox = ({ message, type = "success", duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss logic
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    // Delay calling parent onClose slightly to allow exit animation to finish
    setTimeout(() => {
      if (onClose) onClose();
    }, 400); 
  };

  // Theme Configuration
  const themes = {
    success: {
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-emerald-500",
      bg: "bg-emerald-500",
      border: "border-emerald-500",
      title: "Success",
    },
    error: {
      icon: <AlertCircle className="w-6 h-6" />,
      color: "text-red-500",
      bg: "bg-red-500",
      border: "border-red-500",
      title: "Error",
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "text-amber-500",
      bg: "bg-amber-500",
      border: "border-amber-500",
      title: "Warning",
    },
    info: {
      icon: <Info className="w-6 h-6" />,
      color: "text-blue-500",
      bg: "bg-blue-500",
      border: "border-blue-500",
      title: "Note",
    },
  };

  const theme = themes[type] || themes.info;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="fixed top-6 right-6 z-50 w-full max-w-sm"
        >
          <div className={`relative bg-white rounded-lg shadow-xl border-l-4 ${theme.border} overflow-hidden`}>
            
            <div className="p-4 flex items-start gap-4">
              {/* Icon */}
              <div className={`shrink-0 ${theme.color}`}>
                {theme.icon}
              </div>

              {/* Content */}
              <div className="flex-1 pt-0.5">
                <h3 className={`text-sm font-bold ${theme.color} mb-1`}>
                  {theme.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {message}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Progress Bar (Optional Visual Cue) */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className={`h-1 ${theme.bg} absolute bottom-0 left-0`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertBox;