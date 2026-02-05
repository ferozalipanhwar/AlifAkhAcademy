// components/LectureComponents.jsx
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock, Edit2,
  Loader2,
  MonitorPlay, Trash2,
  X,
  Youtube
} from "lucide-react";
import { memo } from "react";

// --- Helper Function ---
export const getEmbedUrl = (url) => {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) 
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` 
    : url;
};

// --- 1. Video Player Component (Prevents re-render when list updates) ---
export const VideoPlayer = memo(({ activeLecture }) => {
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
        {activeLecture ? (
          <iframe
            key={activeLecture._id}
            src={getEmbedUrl(activeLecture.videoUrl)}
            title={activeLecture.title}
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            <MonitorPlay size={48} className="mb-2 opacity-50" />
            <p>Select a lecture to preview</p>
          </div>
        )}
      </div>

      {activeLecture && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1d21] p-6 rounded-2xl border border-white/5"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{activeLecture.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Clock size={14}/> {activeLecture.duration} min</span>
                <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-xs font-mono">
                   ID: {activeLecture._id.slice(-6)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
});

// --- 2. Lecture List Item (Optimized for list rendering) ---
const LectureItem = memo(({ lecture, isActive, onSelect, onEdit, onDelete }) => (
  <motion.div
    layout
    onClick={() => onSelect(lecture)}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className={`
      relative p-3 rounded-xl cursor-pointer group transition-all border
      ${isActive 
        ? "bg-emerald-500/10 border-emerald-500/50" 
        : "bg-[#0f1115] border-transparent hover:border-gray-700 hover:bg-[#15181c]"
      }
    `}
  >
    <div className="flex items-center gap-3">
       <div className={`
         w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors
         ${isActive ? "bg-emerald-500 text-white" : "bg-gray-800 text-gray-500 group-hover:bg-gray-700"}
       `}>
         {isActive ? <MonitorPlay size={14} /> : lecture.order}
       </div>

       <div className="flex-1 min-w-0">
         <h4 className={`text-sm font-medium truncate ${isActive ? "text-emerald-400" : "text-gray-300"}`}>
           {lecture.title}
         </h4>
         <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
           <Youtube size={10} /> {lecture.duration} min
         </p>
       </div>

       <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "opacity-100" : ""}`}>
         <button
           onClick={(e) => { e.stopPropagation(); onEdit(e, lecture); }}
           className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
         >
           <Edit2 size={14} />
         </button>
         <button
           onClick={(e) => { e.stopPropagation(); onDelete(lecture._id); }}
           className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md"
         >
           <Trash2 size={14} />
         </button>
       </div>
    </div>
  </motion.div>
));

// --- 3. Lecture List Container ---
export const LectureList = memo(({ lectures, activeId, loading, onSelect, onEdit, onDelete }) => {
  return (
    <div className="lg:col-span-1 flex flex-col h-[calc(100vh-140px)] bg-[#1a1d21] rounded-2xl border border-white/5 overflow-hidden">
       <div className="p-4 border-b border-gray-800 bg-[#15171a]">
          <h3 className="font-bold text-gray-200 flex items-center gap-2">
            Course Content <span className="bg-gray-700 text-xs px-2 py-0.5 rounded-full text-gray-300">{lectures.length}</span>
          </h3>
       </div>

       <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-emerald-500"/></div>
          ) : lectures.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm">No lectures found. Add one!</div>
          ) : (
            <AnimatePresence>
              {lectures.map((lecture) => (
                <LectureItem 
                  key={lecture._id}
                  lecture={lecture}
                  isActive={activeId === lecture._id}
                  onSelect={onSelect}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </AnimatePresence>
          )}
       </div>
    </div>
  );
});

// --- 4. Modal Form Component ---
export const LectureModal = ({ isOpen, onClose, onSubmit, formData, setFormData, isEditing }) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#1a1d21] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
             <h2 className="text-lg font-bold text-white">
               {isEditing ? "Edit Lecture" : "Add New Lecture"}
             </h2>
             <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
          </div>
          
          <form onSubmit={onSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Title</label>
              <input
                required
                className="w-full bg-[#0f1115] border border-gray-700 rounded-xl p-3 mt-1 text-white focus:border-emerald-500 outline-none"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Duration (Min)</label>
                <input
                  type="number"
                  className="w-full bg-[#0f1115] border border-gray-700 rounded-xl p-3 mt-1 text-white focus:border-emerald-500 outline-none"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Order</label>
                <input
                  type="number"
                  className="w-full bg-[#0f1115] border border-gray-700 rounded-xl p-3 mt-1 text-white focus:border-emerald-500 outline-none"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                />
              </div>
            </div>
            <div>
               <label className="text-xs font-semibold text-gray-500 uppercase">YouTube URL</label>
               <input
                 required
                 placeholder="https://youtube.com/..."
                 className="w-full bg-[#0f1115] border border-gray-700 rounded-xl p-3 mt-1 text-white focus:border-emerald-500 outline-none"
                 value={formData.videoUrl}
                 onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
               />
            </div>
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl mt-2 transition-all">
              {isEditing ? "Save Changes" : "Add Lecture"}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};