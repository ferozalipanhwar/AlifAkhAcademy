import { ArrowLeft, ChevronDown, ChevronUp, Loader2, Lock, PlayCircle, Share2, ThumbsUp } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../apiHelper/api";
import { AuthContext } from "../context/AuthContext";

const CoursePlayer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [isDescOpen, setIsDescOpen] = useState(false);

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const { data } = await API.get(`/students/play-course/${id}/${user._id}`);
        setCourse(data);
        if (data.topics?.length > 0) {
          setActiveTopic(data.topics[0]);
        }
      } catch (err) {
        setError("Access Denied: Please enroll in this course first.");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchCourseContent();
  }, [id, user]);

  const getYouTubeID = (url) => {
    if (!url) return "";
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (loading) return <div className="h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500" size={40}/></div>;
  if (error) return <div className="h-screen bg-black text-white flex items-center justify-center flex-col p-10 text-center"><Lock size={50} className="text-red-500 mb-4"/><h2 className="text-xl font-bold">{error}</h2></div>;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Navbar */}
      <nav className="h-14 border-b border-white/10 flex items-center px-4 sticky top-0 z-[100] bg-[#0f0f0f]">
        <button onClick={() => navigate("/profile")} className="p-2 hover:bg-white/10 rounded-full mr-4"><ArrowLeft size={20} /></button>
        <h1 className="text-sm font-bold truncate max-w-xs">{course?.title}</h1>
      </nav>

      <main className="max-w-[1600px] mx-auto flex flex-col lg:flex-row">
        
        {/* VIDEO SECTION */}
        <div className="flex-1 min-w-0">
          <div className="w-full sticky top-14 lg:relative lg:top-0 z-50 bg-black aspect-video shadow-2xl">
            <iframe
              width="100%" height="100%"
              src={`https://www.youtube.com/embed/${getYouTubeID(activeTopic?.videoUrl)}?modestbranding=1&rel=0&autoplay=1`}
              title={activeTopic?.title} frameBorder="0" allowFullScreen className="w-full h-full"
            ></iframe>
          </div>

          <div className="p-4">
            <h1 className="text-xl font-bold mb-4">{activeTopic?.title}</h1>
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold">{course?.teacherId?.fullname?.charAt(0)}</div>
                <p className="text-sm font-bold">{course?.teacherId?.fullname || "Instructor"}</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold hover:bg-white/20 flex items-center gap-2"><ThumbsUp size={14}/> Like</button>
                <button className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold hover:bg-white/20 flex items-center gap-2"><Share2 size={14}/> Share</button>
              </div>
            </div>

            {/* DESCRIPTION ACCORDION */}
            <div onClick={() => setIsDescOpen(!isDescOpen)} className="mt-4 bg-white/5 rounded-2xl p-4 cursor-pointer hover:bg-white/10">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold">Lecture Info</span>
                {isDescOpen ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
              </div>
              {isDescOpen && <p className="text-sm text-gray-300 mt-2 leading-relaxed">{activeTopic?.description}</p>}
              {!isDescOpen && <p className="text-sm text-gray-400 truncate">{activeTopic?.description}</p>}
            </div>
          </div>
        </div>

        {/* PLAYLIST SIDEBAR */}
        <aside className="w-full lg:w-[400px] p-4 lg:max-h-screen lg:overflow-y-auto no-scrollbar">
          <h3 className="font-bold text-base mb-4 flex items-center gap-2"><PlayCircle size={18} className="text-emerald-500"/> Lectures</h3>
          <div className="space-y-3">
            {course?.topics?.map((topic, index) => (
              <button
                key={index}
                onClick={() => { setActiveTopic(topic); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full flex gap-3 p-2 rounded-xl border transition-all ${activeTopic?.title === topic.title ? "bg-emerald-500/10 border-emerald-500/30" : "border-transparent hover:bg-white/5"}`}
              >
                <div className="w-24 h-14 rounded-lg bg-gray-800 flex-shrink-0 flex items-center justify-center">
                  <PlayCircle size={16} className={activeTopic?.title === topic.title ? "text-emerald-500" : "text-gray-600"} />
                </div>
                <div className="text-left py-1 overflow-hidden">
                  <h4 className={`text-xs font-bold line-clamp-2 ${activeTopic?.title === topic.title ? "text-emerald-400" : "text-gray-200"}`}>{topic.title}</h4>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Lecture {index + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CoursePlayer;