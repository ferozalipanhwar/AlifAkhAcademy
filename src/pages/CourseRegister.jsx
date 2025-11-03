import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertBox from "../components/UniversalComponents/AlertBox";

const CourseRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseTitle } = location.state || { courseTitle: "Selected Course" };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: courseTitle,
    message: "",
  });

  const [alertData, setAlertData] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enrollment Data:", formData);

    // ✅ Show success alert
    setAlertData({ message: "🎉 Enrollment Successful!", type: "success" , duration:5000});

    // 🕓 Navigate to homepage after short delay
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-white px-4 relative">
      {/* ✅ Alert */}
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
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="text"
            name="course"
            value={formData.course}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-700"
          />
          <textarea
            name="message"
            placeholder="Any specific details or message..."
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Submit Enrollment
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          🌱 Start your learning journey today with{" "}
          <span className="text-green-700 font-medium">{courseTitle}</span>!
        </p>
      </div>
    </div>
  );
};

export default CourseRegister;
