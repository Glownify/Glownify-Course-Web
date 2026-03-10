import React, { useEffect } from "react";
import { User } from "lucide-react";
import { fetchCoursesThunk } from "../../../redux/features/course/course.thunk";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses = [], loading, error } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(fetchCoursesThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-center text-gray-500">Loading courses...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-center text-red-500">Failed to load courses.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 font-sans">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Explore Our Training Programs
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover courses from certified beauty professionals and academies.
          Start your journey to becoming an expert.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <button className="bg-[#9ACED3] text-teal-900 px-6 py-2.5 rounded-full font-bold shadow-sm">
          Popular Courses
        </button>

        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-1 font-bold text-gray-900 hover:text-teal-600 transition-colors"
        >
          View All Courses <span className="text-xl">›</span>
        </button>
      </div>

      {/* Slider */}
      {courses.length === 0 ? (
        <p className="text-center text-gray-400">No courses available.</p>
      ) : (
        <Swiper
  modules={[Autoplay]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  spaceBetween={12} // Reduced spacing for mobile to fit 2 cards better
  loop={true}
  breakpoints={{
    0: { slidesPerView: 2, spaceBetween: 10 },    // Shows 2 cards on small screens
    640: { slidesPerView: 2, spaceBetween: 20 },  // Tablet
    1024: { slidesPerView: 3, spaceBetween: 20 }, // Desktop
    1280: { slidesPerView: 4, spaceBetween: 24 }, // Large Desktop
  }}
>
          {courses.map((course) => (
            <SwiperSlide key={course._id}>
              <CourseCard
                id={course._id}
                poster={course.poster}
                title={course.title}
                trainerName={course.trainerId?.name}
                startDate={course.startDate}
                mode={course.mode}
                price={course.price}
                category={course.category?.name}
                duration={course.duration}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Courses;

const CourseCard = ({ id, poster, title, trainerName, price, category, duration }) => {
  return (
    <Link
      to={`/courses/${id}`}
      className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 flex flex-col  h-[320px] transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3]  h-[150px] w-full">
        <img src={poster} alt={title} className="w-full h-full  object-cover" />
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-5 flex flex-col grow  justify-between flex-1">
        <h3 className="text-sm sm:text-lg font-bold text-[#1A2B3C] mb-1 line-clamp-2 leading-tight">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 mb-4">
          {trainerName || "Academy Name"}
        </p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <span className="text-orange-400 text-xs sm:text-sm">★</span>
              <span className="font-bold text-sm sm:text-lg text-[#1A2B3C]">
                ₹{price.toLocaleString()}
              </span>
            </div>
            {/* Optional: Add duration/days like in image */}
            <span className="text-[10px] sm:text-xs text-gray-400">{duration}</span>
          </div>

          <button className="w-full bg-[#26A9C0] hover:bg-[#1f8a9d] text-white py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors">
            Enroll Now <span className="text-[10px]">›</span>
          </button>
        </div>
      </div>
    </Link>
  );
};