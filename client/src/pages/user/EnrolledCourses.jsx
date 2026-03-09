import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentApplicationsThunk } from "../../redux/features/submittedApplication/submittedApplication.thunk";

const EnrolledCourses = () => {
  const dispatch = useDispatch();
  const { application, loading } = useSelector(
    (state) => state.submittedApplication
  );

  useEffect(() => {
    dispatch(fetchStudentApplicationsThunk());
  }, [dispatch]);

  return (
    <div className="bg-gray-50 p-6 mt-20 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Enrolled Courses</h1>

      {loading && <p>Loading...</p>}

      {!loading && application?.length === 0 && (
        <p className="text-gray-500">No courses enrolled yet.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {application?.map((app) => {
          const course = app.courseId;

          return (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Course Poster */}
              <img
                src={course?.poster}
                alt={course?.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-5">
                {/* Title */}
                <h2 className="text-lg font-semibold">{course?.title}</h2>

                {/* Category */}
                <p className="text-xs text-gray-500 mt-1">
                  Category: {course?.category?.name}
                </p>

                {/* Description */}
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {course?.description}
                </p>

                {/* Price */}
                <p className="mt-2 font-medium text-indigo-600">
                  ₹{course?.price}
                </p>

                {/* Start Date */}
                <p className="text-xs text-gray-500 mt-1">
                  Start: {new Date(course?.startDate).toLocaleDateString()}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  {/* Trainer */}
                  <span className="text-sm text-gray-500">
                    Trainer: {app?.trainerId?.name}
                  </span>

                  {/* Status */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnrolledCourses;