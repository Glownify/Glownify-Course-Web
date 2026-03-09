import React from 'react'
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Eye, 
  Plus, 
  Share2, 
  MoreHorizontal,
  LayoutGrid
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, trendIcon: TrendIcon }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-40">
    <div className="flex justify-between items-start">
      <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
        <Icon size={24} />
      </div>
      <span className="text-4xl font-bold text-teal-900">{value}</span>
    </div>
    <div>
      <h3 className="text-gray-600 font-medium">{label}</h3>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded">
          {trend}
        </span>
        <TrendIcon size={18} className="text-teal-600" />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
<div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back,  Mihika Mathur</h1>
          <p className="text-gray-500 text-sm">Here's what's happening with your courses.</p>
        </div>
        <button className="bg-teal-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-900 transition-colors">
          <Plus size={18} /> Create New Course
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={BookOpen} 
          label="Total Courses" 
          value="3" 
          trend="+1 This Month" 
          trendIcon={TrendingUp} 
        />
        <StatCard 
          icon={Users} 
          label="Total Enrollments" 
          value="47" 
          trend="+12 This Week" 
          trendIcon={TrendingUp} 
        />
        <StatCard 
          icon={Eye} 
          label="Profile Views" 
          value="324" 
          trend="+8% This Week" 
          trendIcon={Eye} 
        />
      </div>

      {/* Action Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Plus, label: 'Create Course' },
          { icon: BookOpen, label: 'My Courses' },
          { icon: Users, label: 'Enrollments' },
          { icon: Share2, label: 'Share Course' }
        ].map((action, idx) => (
          <button key={idx} className="flex items-center justify-center gap-2 py-3 bg-white border rounded-xl text-gray-700 font-medium hover:shadow-md transition-shadow">
            <action.icon size={18} className="text-teal-500" />
            {action.label}
          </button>
        ))}
      </div>

      {/* Course List Section */}
      {/* <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Your Courses</h2>
        
        <CourseRow 
          title="Advanced Bridal Makeup Masterclass" 
          price="20,000" 
          students="45" 
          status="Active"
          image="https://via.placeholder.com/150"
        />
        <CourseRow 
          title="Basic Hair Styling Workshop" 
          price="10,000" 
          students="45" 
          status="Draft"
          image="https://via.placeholder.com/150"
        />
        <CourseRow 
          title="Personal Grooming 101" 
          price="15,000" 
          students="45" 
          status="Active"
          image="https://via.placeholder.com/150"
        />
      </div> */}
    </div>
  )
}

export default AdminDashboard