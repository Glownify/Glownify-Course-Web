import React from 'react';

const Step = ({ number, title, description }) => (
  <div className="flex gap-4 mb-8">
    {/* Number Circle */}
    <div className="shrink-0 w-10 h-10 bg-[#2563EB] text-white rounded-full flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    {/* Step Content */}
    <div>
      <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
        {description}
      </p>
    </div>
  </div>
);

const Trainer = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 hidden md:block">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content Side */}
        <div className="flex-1">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold mb-6">
            For Trainers & Academies
          </span>
          
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Grow Your Academy with Glownify
          </h2>
          
          <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-lg">
            Stop worrying about technology and focus on teaching. We provide the tools you need to list courses and manage enrollments.
          </p>

          {/* Steps List */}
          <div className="mt-4">
            <Step 
              number="01" 
              title="Register & Create Profile" 
              description="Set up your professional profile in minutes." 
            />
            <Step 
              number="02" 
              title="Create & Publish Courses" 
              description="Upload course details, posters, and set your own admission forms." 
            />
            <Step 
              number="03" 
              title="Share & Get Students" 
              description="Share your course link on social media and manage enrollments easily." 
            />
          </div>

          <button className="mt-4 bg-[#136A7A] hover:bg-[#0E515C] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md">
            Start Selling Courses
          </button>
        </div>

        {/* Right Image Side */}
        <div className="flex-1 w-full">
          <div className="relative bg-[#DBEAFE] rounded-[40px] p-6 lg:p-10">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2084" 
                alt="Trainer and Students" 
                className="w-full h-full object-cover"
              />
              {/* Overlay Gradient to match the aesthetic */}
              <div className="absolute inset-0 bg-blue-500/10 mix-blend-multiply"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Trainer;