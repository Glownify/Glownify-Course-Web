import React, { useEffect } from "react";
import { Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseByIdThunk } from "../../../redux/features/course/course.thunk";


const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { courseDetails, loading, error } = useSelector(
  (state) => state.courses
);

console.log("Course Details State:", { courseDetails, loading, error });
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  if (id) {
    dispatch(fetchCourseByIdThunk(id))
  }
}, [dispatch, id]);


  if (loading || !courseDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading course...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load course.</p>
      </div>
    );
  }

  const {
    title,
    poster,
    description,
    price,
    mode,
    startDate,
    category,
    youwillLearn,
    requirements,
    trainerId,
  } = courseDetails;

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* HERO IMAGE */}
      <div className="w-full h-55 sm:h-75 md:h-95 overflow-hidden">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-6">
          Home / Courses / {title}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">

            <span className="bg-teal-100 text-teal-700 text-xs px-3 py-1 rounded-full">
              {category?.name}
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold mt-4 text-gray-800">
              {title}
            </h1>

            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              <span>👤 {trainerId?.name}</span>
              <span>📅 {new Date(startDate).toLocaleDateString()}</span>
            </div>

            <div className="mt-8">
              <h2 className="font-semibold text-lg mb-2">
                About This Course
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {youwillLearn && youwillLearn.length > 0 && (
              <div className="mt-8">
                <h2 className="font-semibold text-lg mb-2">
                  What You'll Learn
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  {youwillLearn.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {requirements && requirements.length > 0 && (
              <div className="mt-8">
                <h2 className="font-semibold text-lg mb-2">
                  Requirements
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  {requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <h2 className="font-semibold text-lg mb-2">
                About the Trainer
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                {trainerId?.bio || "No trainer information available."}
              </p>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">

            <h2 className="text-2xl font-bold text-teal-600">
              ₹ {price}
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Total fee
            </p>

            <div className="space-y-3 text-sm text-gray-600">
              <div>📍 Mode: {mode}</div>
              {/* <div>📍 Location: {location || "Not specified"}</div> */}
              <div>
                📅 Start Date:{" "}
                {new Date(startDate).toLocaleDateString()}
              </div>
            </div>

            <Link to={`/courses/enroll/${id}`}>
  <button className="w-full bg-teal-600 text-white py-2 rounded-lg mt-6 hover:bg-teal-700 transition">
    Enroll Now
  </button>
</Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;