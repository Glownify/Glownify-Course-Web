import React from "react";
import { Search, GraduationCap, Users } from "lucide-react";

const Hero = () => {
  const categories = [
    {
      name: "Makeup",
      icon: "https://img.icons8.com/fluency/48/lipstick.png",
    },
    {
      name: "Barber",
      icon: "https://img.icons8.com/fluency/48/barber-scissors.png",
    },
    {
      name: "Nails",
      icon: "https://img.icons8.com/fluency/48/nail-polish.png",
    },
    {
      name: "Skincare",
      icon: "https://img.icons8.com/fluency/48/spa.png",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* --- MOBILE VIEW --- */}
      {/* Changed min-h-screen to a fixed height to match your layout intent */}
      <div className="md:hidden flex flex-col items-start justify-center px-6 h-[300px] relative">
        {/* Background Layer - Fixed positioning and opacity */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071"
            className="w-full h-full object-cover object-[70%_center]" // Focuses on the people
            alt="bg-mobile"
          />
          {/* Subtle white wash to make the left-aligned text readable */}
          <div className="absolute inset-0 bg-white/40"></div>
          {/* Soft gradient from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[280px]">
          <h1 className="text-2xl font-extrabold text-[#1a2b3c] leading-[1.1] mb-3">
            Launch Your Beauty <br />
            <span className="text-black">Training</span>
          </h1>

          <p className="text-[#3a4b5c] text-md font-medium mb-8 leading-snug">
            Explore professional <br /> beauty & barber courses
          </p>

          <a
            href="/courses"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22acc1] to-[#46d2e6] text-white px-3 py-1 rounded-xl font-bold text-md shadow-md active:scale-95 transition-all"
          >
            <Search size={18} strokeWidth={3} />
            View Courses
          </a>

          <p className="text-[#6b7280] text-sm font-bold mt-1 tracking-tight">
            Find and Enroll in the Best Classes
          </p>
        </div>
      </div>

      <div className="w-full bg-gray-100 py-4 px-4 md:hidden">
        <div className="grid grid-cols-4 gap-3">
          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow flex flex-col items-center justify-center py-3 hover:scale-105 transition"
            >
              <img src={item.icon} alt={item.name} className="w-7 h-7 mb-1" />
              <p className="text-xs font-medium text-gray-700">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- DESKTOP VIEW --- */}
      {/* Kept your exact desktop logic but fixed the height/z-index for consistency */}
      <div className="hidden md:flex relative items-center justify-center text-center px-4 min-h-[700px] md:h-[800px]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071"
            className="w-full h-full object-cover opacity-90"
            alt="bg-desktop"
          />
          <div className="absolute inset-0 bg-white/10"></div>
        </div>

        <div className="max-w-4xl z-10 py-20">
          <h1 className="text-7xl font-extrabold text-black leading-tight mb-4">
            Launch Your Beauty Training 1111
            <br />
            <span className="text-transparent bg-clip-text bg-pink-600">
              Empire with Glownify
            </span>
          </h1>

          <p className="text-black text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Glownify connects beauty professionals with students through a
            trusted course marketplace. Zero commissions. Direct connections.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <a
              href="/courses"
              className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <GraduationCap size={20} />
              View Courses →
            </a>
            <a
              href="/register"
              className="flex items-center gap-2 bg-black border-2 border-black text-white px-8 py-4 rounded-full font-bold transition-all"
            >
              <Users size={20} />
              Become a Course Seller
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 border-t border-gray-200/50 pt-10">
            <div>
              <h3 className="text-4xl font-black text-black">500+</h3>
              <p className="text-gray-900 font-medium">Trainers</p>
            </div>
            <div>
              <h3 className="text-4xl font-black text-black">2,000+</h3>
              <p className="text-gray-900 font-medium">Courses</p>
            </div>
            <div>
              <h3 className="text-4xl font-black text-black">10k+</h3>
              <p className="text-gray-900 font-medium">Users Enrolled</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
