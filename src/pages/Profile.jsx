import { useContext } from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold">You are not logged in</h2>
        <a
          href="/AlifAkhAcademy/login"
          className="mt-4 inline-block bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-700"
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
    <div className="max-w-5xl mx-auto mt-10 bg-gray-150 p-6 rounded-xl shadow-lg">

      {/* BACK BUTTON */}
      <a
        href="/"
        className="inline-flex items-center gap-2 text-lg mb-4 text-emerald-700 hover:text-emerald-900 transition"
      >
        <FaArrowLeft /> Back
      </a>

      {/* PROFILE HEADER */}
      <div className="bg-white rounded-xl p-6 shadow-md flex items-center gap-6">
        <FaUserCircle className="text-8xl text-emerald-600" />

        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 text-lg">{user.email}</p>
        </div>
      </div>

      {/* SECTION TITLE */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-emerald-700">
        📚 My Enrolled Courses
      </h2>

      {/* ENROLLED COURSES */}
      {user.enrolledCourses?.length === 0 ? (
        <p className="text-gray-600 bg-white p-5 rounded-xl shadow">No courses enrolled yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {user.enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-lg transition"
            >
              <img
                src={course.img}
                alt={course.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                <p className="text-gray-600">{course.duration}</p>

                <div className="flex gap-3 mt-5">
                  <a
                    href={`/course/${course._id}`}
                    className="flex-1 bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 text-center"
                  >
                    🔍 View Details
                  </a>

                  <a
                    href={`/performance/${course._id}`}
                    className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 text-center"
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
        className="w-full mt-8 bg-red-600 text-white py-3 rounded-md hover:bg-red-700 font-semibold"
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default Profile;
