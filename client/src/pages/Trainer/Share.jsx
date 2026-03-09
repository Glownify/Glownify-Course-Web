import React, { useEffect, useState } from "react";
import { Share2, Copy, Facebook, Instagram } from "lucide-react";
import { fetchTrainerCoursesThunk } from "../../redux/features/course/course.thunk";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Share = () => {
  const dispatch = useDispatch();
  const { courses = [] } = useSelector((state) => state.courses);

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courseLink, setCourseLink] = useState("");

  useEffect(() => {
    dispatch(fetchTrainerCoursesThunk());
  }, [dispatch]);

  // Set default selected course
  useEffect(() => {
    if (courses.length > 0) {
      const firstCourse = courses[0];
      setSelectedCourseId(firstCourse._id);
      setCourseLink(`https://glownify.com/courses/${firstCourse._id}`);
    }
  }, [courses]);

  // Handle course change
  const handleCourseChange = (e) => {
    const id = e.target.value;
    setSelectedCourseId(id);
    setCourseLink(`https://glownify.com/courses/${id}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(courseLink);
    toast.success("Course link copied to clipboard!");
  };

  const handleInstagramShare = () => {
    window.open(
      `https://www.instagram.com/sharer.php?u=${encodeURIComponent(courseLink)}`,
      "_blank"
    );
  };

  const handleWhatsAppShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(courseLink)}`,
      "_blank"
    );
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        courseLink
      )}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-teal-200 rounded-xl flex items-center justify-center shadow">
            <Share2 className="text-teal-700" size={22} />
          </div>
          <h1 className="text-2xl font-semibold mt-4 text-gray-800">
            Share Your Course
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Spread the word and attract more students
          </p>
        </div>

        {/* Select Course */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <label className="block text-gray-700 font-medium mb-3">
            Select Course
          </label>

          <select
            value={selectedCourseId}
            onChange={handleCourseChange}
            className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500"
          >
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Course Link */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <label className="block text-gray-700 font-medium mb-3">
            Course Link
          </label>

          <div className="flex gap-3">
            <input
              type="text"
              value={courseLink}
              readOnly
              className="flex-1 bg-gray-100 border rounded-lg px-4 py-2.5 text-sm"
            />
            <button
              onClick={handleCopy}
              className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
            >
              <Copy size={16} />
              Copy
            </button>
          </div>
        </div>

        {/* Share On */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h3 className="text-gray-700 font-medium mb-4">Share On</h3>

          <div className="flex gap-5 justify-center">

            <button
              onClick={handleInstagramShare}
              className="bg-pink-100 hover:bg-pink-200 rounded-xl p-4 flex flex-col items-center w-24"
            >
              <Instagram size={18} className="text-pink-600" />
              <span className="text-xs mt-2">Instagram</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="bg-green-100 hover:bg-green-200 rounded-xl p-4 flex flex-col items-center w-24"
            >
              <span className="text-green-600 text-lg">💬</span>
              <span className="text-xs mt-2">WhatsApp</span>
            </button>

            <button
              onClick={handleFacebookShare}
              className="bg-blue-100 hover:bg-blue-200 rounded-xl p-4 flex flex-col items-center w-24"
            >
              <Facebook size={18} className="text-blue-600" />
              <span className="text-xs mt-2">Facebook</span>
            </button>

            <button
              onClick={handleCopy}
              className="bg-gray-200 hover:bg-gray-300 rounded-xl p-4 flex flex-col items-center w-24"
            >
              <Copy size={18} />
              <span className="text-xs mt-2">Copy Link</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;