import React, { useEffect, useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchAdmissionFormByCourseIdThunk } from "../../../redux/features/admissionForm/admissionForm.thunk";
import { useDispatch, useSelector } from "react-redux";
import { submitApplicationThunk } from "../../../redux/features/submittedApplication/submittedApplication.thunk";
import { toast } from "react-hot-toast";

const EnrollForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { admissionForm } = useSelector((state) => state.admissionForm);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
    if (id) {
      dispatch(fetchAdmissionFormByCourseIdThunk(id));
    }
  }, [dispatch, id]);

  // Initialize form state dynamically
  useEffect(() => {
    if (admissionForm?.fields) {
      const initialState = {};

      admissionForm.fields.forEach((field) => {
        if (field.type === "checkbox") {
          initialState[field.fieldKey] = [];
        } else {
          initialState[field.fieldKey] = "";
        }
      });

      setFormData(initialState);
    }
  }, [admissionForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const answers = admissionForm.fields.map((field) => ({
    fieldId: field._id,
    label: field.label,
    value: formData[field.fieldKey]
  }));

  const payload = {
    courseId: id,
    answers
  };

  try {
    await dispatch(submitApplicationThunk(payload)).unwrap();

    toast.success("Application submitted successfully!");
    navigate("/courses/enrollment-success",
      { state: { courseName: admissionForm.courseTitle } }
    );

  } catch (error) {
    toast.error(error || "Failed to submit application");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft size={18} />
          Back to Course
        </button>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-5 sm:p-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="bg-teal-100 p-2 rounded-lg">
              <BookOpen className="text-teal-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Enrollment Form</p>
              <h2 className="text-lg sm:text-xl font-semibold">
                Fill Required Details
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {admissionForm?.fields?.map((field) => (
              <div key={field.fieldKey}>
                <label className="text-sm font-medium block">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {/* TEXT, EMAIL, NUMBER, DATE */}
                {(field.type === "text" ||
                  field.type === "email" ||
                  field.type === "number" ||
                  field.type === "date") && (
                  <input
                    type={field.type}
                    name={field.fieldKey}
                    required={field.required}
                    value={formData[field.fieldKey] || ""}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                )}

                {/* TEXTAREA */}
                {field.type === "textarea" && (
                  <textarea
                    name={field.fieldKey}
                    required={field.required}
                    value={formData[field.fieldKey] || ""}
                    onChange={handleChange}
                    rows={4}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                )}

                {/* SELECT */}
                {field.type === "select" && (
                  <select
                    name={field.fieldKey}
                    required={field.required}
                    value={formData[field.fieldKey] || ""}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {/* RADIO */}
                {field.type === "radio" && (
                  <div className="mt-2 space-y-2">
                    {field.options?.map((option, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={field.fieldKey}
                          value={option}
                          required={field.required}
                          checked={formData[field.fieldKey] === option}
                          onChange={handleChange}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}

                {/* CHECKBOX */}
                {field.type === "checkbox" && (
                  <div className="mt-2 space-y-2">
                    {field.options?.map((option, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name={field.fieldKey}
                          value={option}
                          checked={
                            formData[field.fieldKey]?.includes(option) || false
                          }
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const value = e.target.value;

                            setFormData((prev) => {
                              const existing = prev[field.fieldKey] || [];

                              if (checked) {
                                return {
                                  ...prev,
                                  [field.fieldKey]: [...existing, value],
                                };
                              } else {
                                return {
                                  ...prev,
                                  [field.fieldKey]: existing.filter(
                                    (item) => item !== value,
                                  ),
                                };
                              }
                            });
                          }}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-lg font-medium transition duration-200"
            >
              Submit Enrollment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollForm;
