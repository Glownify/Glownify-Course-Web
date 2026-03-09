import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Student = () => {
  const benefits = [
    "Search courses by category, location, or price",
    "View detailed curriculum and trainer information",
    "Direct enrollment with transparent process",
    "No hidden platform fees for students"
  ];

  return (
    <section className="bg-[#0F172A] py-20 px-6 hidden md:block">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Left Side: Image Container */}
        <div className="flex-1 w-full order-2 lg:order-1">
          <div className="relative bg-[#1E293B] rounded-3xl p-6 lg:p-8">
            <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-4/3">
              <img 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=2070" 
                alt="Makeup products and palettes" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 order-1 lg:order-2">
          <span className="inline-block px-4 py-1 bg-slate-800 text-blue-400 rounded-full text-xs font-semibold mb-6 border border-slate-700">
            For Students
          </span>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Find the Perfect Course to Upgrade Your Skills
          </h2>
          
          <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-lg">
            Browse hundreds of courses from verified professionals. Compare details, check Locations, and enroll directly.
          </p>

          {/* Benefits List */}
          <ul className="space-y-4 mb-10">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 className="text-blue-500 shrink-0" size={20} />
                <span className="text-sm font-medium">{benefit}</span>
              </li>
            ))}
          </ul>

          <button className="bg-white text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-lg text-lg">
            Find a Course
          </button>
        </div>

      </div>
    </section>
  );
};

export default Student;