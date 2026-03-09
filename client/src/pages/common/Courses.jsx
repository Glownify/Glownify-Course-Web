import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchCoursesThunk } from "../../redux/features/course/course.thunk";
import { fetchCategoriesThunk } from "../../redux/features/category/category.thunk";
import { useDispatch, useSelector } from "react-redux";

const Courses = () => {
  const dispatch = useDispatch();

  const {
    courses = [],
    loading,
    error,
  } = useSelector((state) => state.courses);
  const { categories = [] } = useSelector((state) => state.categories);

  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchCoursesThunk());
    dispatch(fetchCategoriesThunk());
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, [dispatch]);

  // ✅ Filtered Courses
  const filteredCourses = useMemo(() => {
    if (selectedCategory === "all") return courses;

    return courses.filter(
      (course) => course.category?._id === selectedCategory,
    );
  }, [courses, selectedCategory]);

  if (loading) {
    return (
      <section className="pt-20 text-center py-20">
        <p className="text-gray-500">Loading courses...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-20 text-center py-20">
        <p className="text-red-500">Failed to load courses.</p>
      </section>
    );
  }

  const toTitleCase = (str) => {
    if (!str) return "";

    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 font-sans pt-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Explore Beauty Courses
        </h1>
        <p className="text-gray-500 mt-2">
          Discover courses from top beauty professionals and academies.
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        {/* All Button */}
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-1 rounded-full text-sm ${
            selectedCategory === "all"
              ? "bg-teal-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedCategory === cat._id
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {toTitleCase(cat.name)}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">
            No courses available.
          </p>
        ) : (
          filteredCourses.map((course) => (
            <Link
              key={course._id}
              to={`/courses/${course._id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden block"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={course.poster}
                  alt={course.title}
                  className="h-48 w-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-gray-200 text-xs px-2 py-1 rounded-full capitalize">
                  {course.mode}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="font-semibold text-gray-800 text-lg">
                  {course.title}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {course.trainerId?.name}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {toTitleCase(course.category?.name)}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Starts:{" "}
                  {course.startDate
                    ? new Date(course.startDate).toLocaleDateString()
                    : "TBA"}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold text-teal-600">
                    ₹ {course.price}
                  </span>

                  <button className="bg-teal-600 text-white px-4 py-1 rounded-md hover:bg-teal-700 text-sm">
                    Enroll Now
                  </button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default Courses;
