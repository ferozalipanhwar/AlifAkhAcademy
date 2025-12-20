import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../apiHelper/api";
import AlertBox from "../components/UniversalComponents/AlertBox";

const CourseRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { courseId, courseTitle } = location.state || {};

  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [alertData, setAlertData] = useState(null);

  //  Read user ONCE (no infinite loop)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      setFormData((prev) => ({
        ...prev,
        fullname: parsedUser.name,
        email: parsedUser.email,
      }));
    }
  }, []);

  // Redirect if course missing
  useEffect(() => {
    if (!courseId) navigate("/");
  }, [courseId, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/course-enrollment/enroll",
        {
          courseId,
          fullname: formData.fullname,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          message: formData.message,
        },
        {
          headers: {
            Authorization: user ? `Bearer ${user.token}` : "",
          },
        }
      );

      setAlertData({
        message: "🎉 Enrollment Successful!",
        type: "success",
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setAlertData({
        message:
          error.response?.data?.message || "❌ Enrollment failed",
        type: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      {alertData && (
        <AlertBox {...alertData} onClose={() => setAlertData(null)} />
      )}

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-5 text-center">
          📚 Course Enrollment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!user && (
            <>
              <input
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="input"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />
            </>
          )}

          {user && (
            <div className="bg-green-50 p-2 rounded text-sm">
              Logged in as <b>{user.fullname}</b>
            </div>
          )}

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            value={courseTitle || "Selected Course"}
            readOnly
            className="input bg-gray-100"
          />

          <textarea
            name="message"
            placeholder="Optional message"
            value={formData.message}
            onChange={handleChange}
            className="input"
          />

          <button className="w-full bg-green-600 text-white py-3 rounded">
            Submit Enrollment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseRegister;
