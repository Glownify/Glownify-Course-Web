import React from 'react';
import { CheckCircle } from 'lucide-react';

const TrustItem = ({ title, description }) => (
  <div className="flex gap-4 mb-10">
    <div className="shrink-0 mt-1">
      <div className="w-8 h-8 rounded-full border-2 border-[#10B981] flex items-center justify-center">
        <CheckCircle className="text-[#10B981]" size={18} strokeWidth={3} />
      </div>
    </div>
    <div>
      <h3 className="text-xl font-extrabold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed max-w-4xl">
        {description}
      </p>
    </div>
  </div>
);

const Trust = () => {
  const trustPoints = [
    {
      title: "Neutral Platform",
      description: "Glownify is purely a listing and connection platform. We don't run courses or interfere in the trainer-student Relationship."
    },
    {
      title: "No Commission",
      description: "We don't take any commission on course fees. your pricing, your earnings."
    },
    {
      title: "No Payment Handling",
      description: "All payments are made directly to the course provider through their preferred method (UPI, bank transfer, etc.)."
    },
    {
      title: "Direct Communication",
      description: "Students and trainers communicate directly. You control your business, we provide the tools."
    }
  ];

  return (
    <section className="bg-[#F0FDFA] py-20 px-6 hidden md:block">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Built on Trust & Transparency</h2>
          <p className="text-gray-500 text-lg">
            We believe in keeping things simple and honest. Here's how we operate.
          </p>
        </div>

        {/* Content List */}
        <div className="mt-12 md:px-10">
          {trustPoints.map((point, index) => (
            <TrustItem key={index} {...point} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;