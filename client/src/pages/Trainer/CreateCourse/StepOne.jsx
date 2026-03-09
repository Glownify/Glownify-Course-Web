import React, { useRef, useState, useEffect } from "react";
import { Upload, ChevronRight, X } from "lucide-react";

const StepOne = ({ onNext, courseFormData, setCourseFormData }) => {
  const fileInputRef = useRef(null);
  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  // Validate & Set File
  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg+xml"];

    if (!validTypes.includes(file.type)) {
      setError("Only PNG, JPG, GIF, SVG files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      return;
    }

    setError("");
    setPoster(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
  if (courseFormData?.posterImage) {
    setPoster(courseFormData.posterImage);
    setPreview(URL.createObjectURL(courseFormData.posterImage));
  }
}, []);

  // Input change
  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleRemove = () => {
    setPoster(null);
    setPreview(null);
  };

  const handleNext = () => {
  if (!poster) {
    setError("Please upload a course poster.");
    return;
  }

  setCourseFormData((prev) => ({
    ...prev,
    posterImage: poster,
  }));

  onNext();
};

  return (
    <div className="p-8 md:p-12">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">
          Upload Course Poster
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          A compelling poster helps attract students. Recommended size: 800X600px
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
      />

      {/* Drag & Drop Zone */}
      {!preview ? (
        <div
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-teal-100 rounded-2xl bg-white p-16 flex flex-col items-center justify-center hover:border-teal-300 cursor-pointer transition-all"
        >
          <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-6">
            <Upload size={32} />
          </div>

          <p className="font-bold text-gray-800 mb-2 text-center">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400">
            PNG, JPG, GIF, SVG (max 5MB)
          </p>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Poster Preview"
            className="rounded-2xl w-full max-h-96 object-cover shadow-md"
          />
          <button
            onClick={handleRemove}
            className="absolute top-3 right-3 bg-white shadow-md p-2 rounded-full hover:bg-red-50"
          >
            <X size={18} className="text-red-500" />
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mt-4">{error}</p>
      )}

      {/* Footer Actions */}
      <div className="mt-12 pt-6 border-t border-gray-100 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!poster}
          className={`px-8 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-md active:scale-95 transition-all ${
            poster
              ? "bg-teal-800 text-white hover:bg-teal-900"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default StepOne;
