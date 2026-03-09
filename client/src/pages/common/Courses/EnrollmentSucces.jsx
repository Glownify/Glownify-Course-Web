import React, { useEffect } from "react";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const EnrollmentSuccess = () => {
const navigate = useNavigate();

const { courseDetails } = useSelector((state) => state.courses);
const courseName = courseDetails?.title;

  console.log("Course Name from state:", courseName); // Debug log

  // Prevent direct access to success page
  useEffect(() => {
    if (!courseName) {
      navigate("/courses");
    }
  }, [courseName, navigate]);

  // Auto redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/courses");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!courseName) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12 pt-28">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
          Enrollment Successful!
        </h2>

        <p className="text-gray-600 text-sm mb-6">
          Thank you for enrolling in{" "}
          <span className="font-medium text-teal-700">
            {courseName}
          </span>
        </p>

        {/* What happens next */}
        <div className="bg-teal-50 rounded-xl p-4 text-left mb-6">
          <h3 className="font-semibold text-sm mb-3">
            What happens next?
          </h3>

          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-semibold">
                1
              </span>
              The course provider will receive your enrollment details
            </li>

            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-semibold">
                2
              </span>
              They will contact you directly to discuss payment and schedule
            </li>

            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-semibold">
                3
              </span>
              Complete the payment directly with the trainer and start your journey
            </li>
          </ul>
        </div>

        <p className="text-xs text-gray-500 mb-6">
          A confirmation email has been sent to your email address.
        </p>

        <p className="text-xs text-gray-400 mb-6">
          Redirecting to courses page in 5 seconds...
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/courses")}
            className="flex-1 bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
          >
            Explore More Courses
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 border border-gray-300 hover:bg-gray-100 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
          >
            <Home size={16} />
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default EnrollmentSuccess;