import { useEffect, useState } from "react";
import API from "../../../apiHelper/api";

const CourseEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await API.get("/course-enrollment/all");

      setEnrollments(res.data.enrollments);
    } catch (error) {
      console.error("Failed to fetch enrollments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading enrollments...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Course Enrollments</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Course</th>
              <th className="p-3">Message</th>
              <th className="p-3">Type</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map((item) => (
              <tr key={item._id} className="border-b text-white bg-gray-500">
                <td className="p-3 font-medium">{item.fullname}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.phoneNumber}</td>
                <td className="p-3">
                  {item.courseId?.title || "N/A"}
                </td>
                <td className="p-3">
                  {item.message || "-"}
                </td>
                <td className="p-3">
                  {item.userId ? (
                    <span className="text-green-800 font-semibold">
                      Logged In
                    </span>
                  ) : (
                    <span className="text-orange-500 font-semibold">
                      Guest
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {new Date(item.enrolledAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {enrollments.length === 0 && (
          <p className="text-center p-4 text-gray-500">
            No enrollments found
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseEnrollments;
