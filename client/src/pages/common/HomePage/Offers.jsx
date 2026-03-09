import React from 'react';
import { GraduationCap, Users, MoveRight } from 'lucide-react';

const Offers = () => {
  return (
    <section className="py-24 px-6 bg-white border-t border-gray-50 hidden md:block">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading Section */}
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Ready to Get Started?
        </h2>
        
        <p className="text-gray-500 text-lg md:text-xl mb-12 font-medium">
          Join thousands of beauty professionals and students on Glownify today.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* View Courses Button */}
          <a href='/courses' className="group flex items-center gap-3 bg-[#EAEAEA] hover:bg-gray-200 text-gray-900 px-10 py-4 rounded-full font-bold transition-all duration-300 shadow-sm">
            <GraduationCap size={22} className="text-gray-700" />
            <span className="text-lg">View Courses</span>
            <MoveRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Become a Seller Button */}
          <a href='/register' className="flex items-center gap-3 bg-white border border-gray-300 hover:border-teal-600 hover:bg-teal-50 text-[#136A7A] px-10 py-4 rounded-full font-bold transition-all duration-300 shadow-sm">
            <Users size={22} />
            <span className="text-lg">Become a Course Seller</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Offers;