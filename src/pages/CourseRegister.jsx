import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertBox from "../components/UniversalComponents/AlertBox";

const CourseRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId, courseTitle } = location.state || {};

  const user = JSON.parse(localStorage.getItem("user")); // 👈 logged user

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullname: user.fullname,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/enroll",
        {
          courseId,
          ...formData,
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
        message: "❌ Enrollment failed",
        type: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-white px-4">
      {alertData && (
        <AlertBox
          message={alertData.message}
          type={alertData.type}
          onClose={() => setAlertData(null)}
        />
      )}

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          📚 Course Enrollment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!user && (
            <>
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="input"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />
            </>
          )}

          {user && (
            <div className="bg-green-50 p-3 rounded-lg text-sm text-green-700">
              Logged in as <b>{user.fullname}</b> ({user.email})
            </div>
          )}

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            type="text"
            value={courseTitle}
            readOnly
            className="w-full bg-gray-100 border rounded-lg p-3"
          />

          <textarea
            name="message"
            placeholder="Any message (optional)"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="input"
          />

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
            Submit Enrollment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseRegister;
