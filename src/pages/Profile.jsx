import { useContext } from "react";
import {
  FaArrowLeft,
  FaBook,
  FaCertificate,
  FaChartBar,
  FaCog,
  FaPlus,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm w-full border border-gray-100">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
            <FaUserCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-500 mb-6 text-sm">Please login to view your profile dashboard.</p>
          <a
            href="/AlifAkhAcademy/login"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl transition-colors shadow-lg shadow-green-200"
          >
            Login Now
          </a>
        </div>
      </div>
    );
  }

  // Demo data (remove later)
  user.enrolledCourses = [
    {
      _id: "course123",
      title: "Full Stack Web Development",
      duration: "3 Months",
      img: "https://images.unsplash.com/photo-1581091215365-64077c7b0f96",
      progress: 65,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Back Navigation */}
      <a
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors"
      >
        <FaArrowLeft className="text-xs" /> Back to Dashboard
      </a>

      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -mr-32 -mt-32 opacity-50 z-0"></div>
        
        <div className="relative z-10">
          {user.img ? (
            <img src={user.img} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-4xl border-4 border-white shadow-md">
              <span className="font-bold">{user.name?.charAt(0)}</span>
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{user.name}</h1>
          <p className="text-gray-500 font-medium mb-4">{user.email}</p>
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
            Student Account
          </span>
        </div>

        <button
          onClick={logout}
          className="relative z-10 flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-medium text-sm transition-colors"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <ActionBtn label="Add Course" href="/courses" icon={<FaPlus />} color="text-blue-500" bg="bg-blue-50" />
          <ActionBtn label="My Courses" href="/my-courses" icon={<FaBook />} color="text-purple-500" bg="bg-purple-50" />
          <ActionBtn label="Certificates" href="view-certificate" icon={<FaCertificate />} color="text-yellow-600" bg="bg-yellow-50" />
          <ActionBtn label="Results" href="/my-results" icon={<FaChartBar />} color="text-green-500" bg="bg-green-50" />
          <ActionBtn label="Settings" href="/settings" icon={<FaCog />} color="text-gray-500" bg="bg-gray-50" />
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div>
        <div className="flex justify-between items-end mb-6 px-1">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Enrolled Courses</h3>
            <p className="text-sm text-gray-500 mt-1">Continue where you left off</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-4 text-white text-xs font-bold bg-black/30 backdrop-blur px-2 py-1 rounded">
                  {course.duration}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h4 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {course.title}
                </h4>
                
                {/* Progress Bar */}
                <div className="mt-auto mb-4">
                  <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{course.progress || 0}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-50">
                  <a
                    href={`/course/${course._id}`}
                    className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium text-center transition-colors shadow-lg shadow-green-100"
                  >
                    Continue
                  </a>
                  <a
                    href={`/performance/${course._id}`}
                    className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ActionBtn = ({ icon, label, href, color, bg }) => (
  <a
    href={href}
    className="flex flex-col items-center justify-center gap-3 bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-green-200 hover:-translate-y-1 transition-all duration-300 group"
  >
    <div className={`p-3 rounded-full ${bg} ${color} text-xl group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900">{label}</span>
  </a>
);

export default Profile;