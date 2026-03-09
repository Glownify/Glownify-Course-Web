import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  TrendingUp,
  Eye,
  Plus,
  Share2,
  MoreHorizontal,
  LayoutGrid,
} from "lucide-react";
import { fetchDashboardDataThunk } from "../../redux/features/dashboard/dashboard.thunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StatCard = ({
  icon: Icon,
  label,
  value,
  // trend,
  // trendIcon: TrendIcon,
}) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-35">
    <div className="flex justify-between items-start">
      <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
        <Icon size={24} />
      </div>
      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-900">{value}</span>
    </div>
    <div>
      <h3 className="text-gray-600 font-medium">{label}</h3>
      <div className="flex justify-between items-center mt-2">
        {/* <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded">
          {trend}
        </span> */}
        {/* <TrendIcon size={18} className="text-teal-600" /> */}
      </div>
    </div>
  </div>
);

const CourseRow = ({ image, title, price, students, status }) => (
  <div className="bg-white p-4 mb-3 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 min-w-12 rounded-lg bg-gray-200 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-bold text-gray-800">{title}</h4>
        <div className="flex gap-3 text-xs text-gray-500 mt-1">
          <span>₹{price}</span>
          <span>•</span>
          <span>{students} students</span>
        </div>
        <span
          className={`text-[10px] uppercase font-bold mt-1 inline-block ${status === "Active" ? "text-green-500" : "text-gray-400"}`}
        >
          {status}
        </span>
      </div>
    </div>
    <div className="flex gap-2 self-start sm:self-auto">
      <button className="flex items-center gap-1 px-3 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-50">
        <Share2 size={14} /> Share
      </button>
      {/* <button className="p-1 text-gray-400">
        <MoreHorizontal size={20} />
      </button> */}
    </div>
  </div>
);

const TrainerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dashboardData, loading, error } = useSelector(
    (state) => state.dashboard,
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboardDataThunk());
  }, [dispatch]);

  console.log("Dashboard Data:", dashboardData, loading, error);

  return (
    <div className="min-h-screen bg-gray-50  px-4 sm:px-6 lg:px-8 py-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || "Trainer"}!
          </h1>
          <p className="text-gray-500 text-sm">
            Here's what's happening with your courses.
          </p>
        </div>
        <button className="w-full sm:w-auto bg-teal-800 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2">
          <Plus size={18} /> Create New Course
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={dashboardData ? dashboardData.totalCourses : "0"}
          // trend="+1 This Month"
          // trendIcon={TrendingUp}
        />
        <StatCard
          icon={Users}
          label="Total Enrollments"
          value={dashboardData ? dashboardData.totalEnrollments : "0"}
          // trend="+12 This Week"
          // trendIcon={TrendingUp}
        />
        <StatCard
          icon={Eye}
          label="Profile Views"
          value="324"
          // trend="+8% This Week"
          // trendIcon={Eye}
        />
      </div>

      {/* Action Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Plus, label: "Create Course", route:"/trainer/createcourses" },
          { icon: BookOpen, label: "My Courses", route:"/trainer/courses" },
          { icon: Users, label: "Enrollments", route:"/trainer/students" },
          { icon: Share2, label: "Share Course", route:"/trainer/share" },
        ].map((action, idx) => (
          <button
            onClick={() => navigate(action.route)}
            key={idx}
            className="flex items-center justify-center gap-2 py-3 px-2 bg-white border rounded-xl text-gray-700 text-sm sm:text-base font-medium hover:shadow-md transition-shadow"
          >
            {/* <action.icon size={18} className="text-teal-500" />
            {action.label} */}
            <span className="truncate">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Course List Section */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Your Courses</h2>

        {dashboardData &&
        dashboardData.courses &&
        dashboardData.courses.length > 0 ? (
          dashboardData.courses
            .slice(0, 3) // ✅ Show only first 3 courses
            .map((course) => (
              <CourseRow
                key={course._id}
                title={course.title}
                price={course.price}
                students={course.students}
                status={course.status}
                image={course.poster}
              />
            ))
        ) : (
          <p className="text-gray-500 text-center py-10">
            No courses found. Start by creating a new course!
          </p>
        )}
      </div>
    </div>
  );
};

export default TrainerDashboard;
