import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Info,
  MapPin,
  Layers,
  Clock,
} from "lucide-react";
import { fetchCategoriesThunk } from "../../../redux/features/category/category.thunk";
import { useDispatch, useSelector } from "react-redux";

const modes = ["online", "offline"];

const StepTwo = ({ onNext, onPrev, courseFormData, setCourseFormData }) => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(courseFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLearnChange = (index, value) => {
    const updated = [...formData.youwillLearn];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, youwillLearn: updated }));
    setErrors((prev) => ({ ...prev, youwillLearn: "" }));
  };

  const addLearnField = () => {
    setFormData((prev) => ({
      ...prev,
      youwillLearn: [...prev.youwillLearn, ""],
    }));
  };

  const removeLearnField = (index) => {
    const updated = formData.youwillLearn.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      youwillLearn: updated.length ? updated : [""],
    }));
  };

  const handleRequirementChange = (index, value) => {
    const updated = [...formData.requirements];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, requirements: updated }));
    setErrors((prev) => ({ ...prev, requirements: "" }));
  };

  const addRequirementField = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const removeRequirementField = (index) => {
    const updated = formData.requirements.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      requirements: updated.length ? updated : [""],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.mode) newErrors.mode = "Mode is required";
    if (formData.mode === "offline") {
      if (!formData.location?.address?.trim()) {
        newErrors.address = "Address is required for Offline mode";
      }
      if (!formData.location?.city?.trim()) {
        newErrors.city = "City is required for Offline mode";
      }
    }
    if (formData.startDate && new Date(formData.startDate) < new Date())
      newErrors.startDate = "Start date must be in the future";
    if (formData.price && Number(formData.price) < 0)
      newErrors.price = "Price cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setCourseFormData((prev) => ({ ...prev, ...formData }));
    onNext();
  };

  const toTitleCase = (str) =>
    str
      ?.toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // Input Class Helper
  const inputClass = (error) =>
    `w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none ${
      error
        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
        : "border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
    }`;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">
          Course Fundamentals
        </h2>
        <p className="text-gray-500 mt-2">
          Let's refine the core details and structure of your course.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Basic Info */}
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2 text-teal-700 font-semibold">
            <Info size={20} /> <span>General Information</span>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-primary-gray-800">
              Course Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Advanced Hair Styling Masterclass"
              className={inputClass(errors.title)}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.title}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category*
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass(errors.category)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {toTitleCase(cat.name)}
                    </option>
                  ))}
                </select>
                <Layers
                  className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"
                  size={18}
                />
              </div>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duration*
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 6 Weeks"
                  className={inputClass(errors.duration)}
                />
                <Clock
                  className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"
                  size={18}
                />
              </div>
              {errors.duration && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.duration}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Detailed Description*
            </label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a comprehensive overview of the course content..."
              className={`${inputClass(errors.description)} resize-none`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.description}
              </p>
            )}
          </div>
        </section>

        {/* Section 2: Logistics */}
        <section className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-6">
          <div className="flex items-center gap-2 mb-2 text-teal-700 font-semibold">
            <MapPin size={20} /> <span>Logistics & Pricing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Mode*
              </label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className={inputClass(errors.mode)}
              >
                <option value="">Select Mode</option>
                {modes.map((m) => (
                  <option key={m} value={m}>
                    {toTitleCase(m)}
                  </option>
                ))}
              </select>
              {errors.mode && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.mode}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    formData.mode === "online"
                      ? "text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  Address {formData.mode === "offline" && "*"}
                </label>

                <input
                  type="text"
                  value={formData.location?.address || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        address: e.target.value,
                      },
                    }))
                  }
                  disabled={formData.mode === "online"}
                  placeholder={
                    formData.mode === "online"
                      ? "Not required for Online"
                      : "Enter full address"
                  }
                  className={inputClass(errors.address)}
                />
              </div>

              {/* City */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    formData.mode === "online"
                      ? "text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  City {formData.mode === "offline" && "*"}
                </label>

                <input
                  type="text"
                  value={formData.location?.city || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        city: e.target.value,
                      },
                    }))
                  }
                  disabled={formData.mode === "online"}
                  placeholder={
                    formData.mode === "online"
                      ? "Not required for Online"
                      : "Enter city"
                  }
                  className={inputClass(errors.city)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tentative Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={inputClass(errors.startDate)}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.startDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 25000"
                className={inputClass(errors.price)}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.price}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Dynamic Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Learning Outcomes */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-800">
              What Students Will Learn*
            </label>
            {formData.youwillLearn.map((item, index) => (
              <div key={index} className="flex gap-2 group">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleLearnChange(index, e.target.value)}
                  placeholder="Outcome..."
                  className={inputClass()}
                />
                <button
                  type="button"
                  onClick={() => removeLearnField(index)}
                  className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLearnField}
              className="w-full py-3 border-2 border-dashed border-teal-200 text-teal-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-teal-50 transition-all"
            >
              <Plus size={18} /> Add Outcome
            </button>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-800">
              Requirements*
            </label>
            {formData.requirements.map((item, index) => (
              <div key={index} className="flex gap-2 group">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleRequirementChange(index, e.target.value)
                  }
                  placeholder="Requirement..."
                  className={inputClass()}
                />
                <button
                  type="button"
                  onClick={() => removeRequirementField(index)}
                  className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRequirementField}
              className="w-full py-3 border-2 border-dashed border-teal-200 text-teal-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-teal-50 transition-all"
            >
              <Plus size={18} /> Add Requirement
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
        <button
          onClick={onPrev}
          className="group flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-10 py-3 rounded-xl bg-teal-800 text-white font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-900/20 active:scale-95"
        >
          Continue <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
