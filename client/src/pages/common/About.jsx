import React from 'react';
import { Search, FileText, MessageCircle } from 'lucide-react';

const AboutCard = ({ Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-8 bg-white border border-gray-200 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Icon Container */}
      <div className="w-16 h-16 bg-[#A5E1E9] rounded-xl flex items-center justify-center mb-10">
        <Icon size={32} className="text-gray-700" strokeWidth={1.5} />
      </div>

      {/* Text Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-500 text-center text-sm leading-relaxed max-w-60">
        {description}
      </p>
    </div>
  );
};

const About = () => {
  const features = [
    {
      Icon: Search,
      title: "Course Listings",
      description: "Discover a wide range of beauty courses from top professionals in your area."
    },
    {
      Icon: FileText,
      title: "Student Management",
      description: "Seamless digital enrollment process with custom admission forms for every course."
    },
    {
      Icon: MessageCircle,
      title: "Direct Connect",
      description: "Direct communication between students and trainers. No middlemen."
    }
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#0F172A] mb-6">What Is Glownify?</h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We are a neutral platform that empowers beauty professionals to grow the Academy 
            and helps students find the best training.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AboutCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;