import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainerCoursesThunk } from "../../redux/features/course/course.thunk";
import { Users, Trash2, Plus, X, Calendar, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrainerCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses, loading } = useSelector((state) => state.courses);

  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    dispatch(fetchTrainerCoursesThunk());
  }, [dispatch]);

  const closeModal = () => setSelectedCourse(null);

  if (loading)
    return <p className="p-10 text-center text-gray-500">Loading courses...</p>;

  return (
    <div className="p-10 bg-white min-h-screen font-sans relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            My Courses
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage your course listings
          </p>
        </div>

        <button
          onClick={() => navigate("/trainer/createcourses")}
          className="bg-[#1a6370] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#144d57] transition shadow-sm"
        >
          <Plus size={18} strokeWidth={3} />
          Create New Course
        </button>
      </div>

      {/* Course List */}
      <div className="flex flex-col gap-5">
        {courses?.map((course) => (
          <div
            key={course._id}
            className="bg-[#f8f9fa] rounded-2xl p-5 flex items-center border border-gray-100"
          >
            {/* Poster */}
            <div className="relative w-48 h-32 shrink-0">
              <img
                src={course.poster}
                alt={course.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Course Info */}
            <div className="ml-8 grow">
              <h3 className="text-xl font-bold text-gray-800">
                {course.title}
              </h3>

              <div className="flex items-center gap-4 mt-3 mb-3">
                <span className="px-4 py-1 rounded-lg text-[11px] font-bold bg-[#d1fae5] text-[#10b981]">
                  {course.status || "Published"}
                </span>

                <span className="text-gray-500 text-sm italic">
                  {course.createdAt
                    ? new Date(course.createdAt).toLocaleDateString()
                    : "No date"}
                </span>
              </div>

              <div className="flex items-center text-gray-400 text-sm">
                <Users size={16} className="mr-2" />
                <span>{course.enrollments || 0} enrollments</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 px-4">
              <button
                onClick={() => setSelectedCourse(course)}
                className="px-8 py-2 border border-gray-300 text-gray-600 rounded-xl font-bold hover:bg-gray-100"
              >
                View
              </button>

              <button className="px-8 py-2 bg-[#1a6370] text-white rounded-xl font-bold hover:bg-[#144d57]">
                Edit
              </button>

              <button className="p-2 text-gray-400 hover:text-red-500 transition ml-2">
                <Trash2 size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-4xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Poster */}
            <div className="relative h-64 w-full">
              <img
                src={selectedCourse.poster}
                alt={selectedCourse.title}
                className="w-full h-full object-cover"
              />

              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Title + Price */}
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCourse.title}
                </h2>

                <p className="text-xl font-bold text-[#1a6370]">
                  ₹{selectedCourse.price}
                </p>
              </div>

              {/* Course Info */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen size={18} className="text-[#1a6370]" />
                  Category: {selectedCourse.category?.name || "N/A"}
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} className="text-[#1a6370]" />
                  Mode: {selectedCourse.mode}
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} className="text-[#1a6370]" />
                  Start Date:{" "}
                  {selectedCourse.startDate
                    ? new Date(selectedCourse.startDate).toLocaleDateString()
                    : "N/A"}
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={18} className="text-[#1a6370]" />
                  Enrollments: {selectedCourse.enrollments || 0}
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <h4 className="font-bold text-gray-700 mb-2">Description</h4>

                <p className="text-sm text-gray-600">
                  {selectedCourse.description || "No description provided"}
                </p>
              </div>

              {/* Learn + Requirements */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* What You Will Learn */}
                {selectedCourse.youwillLearn?.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-700 mb-2">
                      What You Will Learn
                    </h4>

                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {selectedCourse.youwillLearn.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {selectedCourse.requirements?.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-700 mb-2">
                      Requirements
                    </h4>

                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {selectedCourse.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Close Button */}
              {/* <div className="flex justify-end mt-8">
          <button
            onClick={closeModal}
            className="px-8 py-2 bg-[#1a6370] text-white rounded-lg font-semibold hover:bg-[#144d57]"
          >
            Close
          </button>
        </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerCourses;
