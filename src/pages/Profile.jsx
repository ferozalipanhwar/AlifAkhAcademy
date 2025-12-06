import { useContext } from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800">You are not logged in</h2>
        <a
          href="/AlifAkhAcademy/login"
          className="mt-5 inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          Login Now
        </a>
      </div>
    );
  }

  // TEMP DEMO ENROLLED COURSES
  user.enrolledCourses = [
    {
      _id: "course123",
      title: "Full Stack Web Development",
      duration: "3 Months",
      img: "https://images.unsplash.com/photo-1581091215365-64077c7b0f96",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 pb-20 px-5">

      {/* BACK BUTTON */}
      <a
        href="/"
        className="inline-flex items-center gap-2 text-lg mb-5 text-emerald-700 hover:text-emerald-900 transition"
      >
        <FaArrowLeft /> Back
      </a>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 flex items-center gap-6">
        
        <div className="p-2 rounded-full border-4 border-emerald-500">
          <FaUserCircle className="text-7xl text-emerald-600" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 text-lg">{user.email}</p>
        </div>
      </div>

      {/* ENROLLED COURSES SECTION */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-800">
        📚 My Enrolled Courses
      </h2>

      {user.enrolledCourses?.length === 0 ? (
        <p className="text-gray-600 bg-white p-5 rounded-lg shadow border border-gray-100">
          No courses enrolled yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {user.enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition"
            >
              <img
                src={course.img}
                alt={course.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">
                  {course.title}
                </h3>
                <p className="text-gray-600">{course.duration}</p>

                <div className="flex gap-3 mt-5">
                  <a
                    href={`/course/${course._id}`}
                    className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 text-center"
                  >
                    🔍 View Details
                  </a>

                  <a
                    href={`/performance/${course._id}`}
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 text-center"
                  >
                    📊 Performance
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LOGOUT BUTTON */}
      <button
        onClick={logout}
        className="w-full mt-10 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 font-semibold shadow-md"
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default Profile;
