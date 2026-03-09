import React, { useState } from "react";
import StepOne from "./CreateCourse/StepOne";
import StepTwo from "./CreateCourse/StepTwo";
import StepThree from "./CreateCourse/StepThree";
import StepFour from "./CreateCourse/StepFour";

const CreateCourse = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseFormData, setCourseFormData] = useState({
    posterImage: null,
    title: "",
    category: "",
    duration: "",
    description: "",
    mode: "",
   location: {
    address: "",
    city: "",
  },
    startDate: "",
    price: "",
    youwillLearn: [],
    requirements: [],
    fields: [],
    upiId: "",
    paymentLink: "",
    qrCode: null,
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            courseFormData={courseFormData}
            setCourseFormData={setCourseFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <StepTwo
            courseFormData={courseFormData}
            setCourseFormData={setCourseFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <StepThree
            courseFormData={courseFormData}
            setCourseFormData={setCourseFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <StepFour
            courseFormData={courseFormData}
            setCourseFormData={setCourseFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      default:
        return (
          <StepOne
            courseFormData={courseFormData}
            setCourseFormData={setCourseFormData}
            onNext={nextStep}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create New Course
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Fill in the details to create your course listing
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="relative mb-10">
          
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-teal-100 -translate-y-1/2"></div>

          <div className="relative flex justify-between items-center max-w-xl mx-auto px-2 sm:px-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm
                  ${
                    currentStep === step
                      ? "bg-teal-800 border-teal-800 text-white"
                      : "bg-white border-teal-200 text-teal-800"
                  }`}
                >
                  <span className="font-semibold text-sm sm:text-base">
                    {step}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Step Content */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-4 sm:p-6">
          {renderStep()}
        </div>

      </div>
    </div>
  );
};

export default CreateCourse;
