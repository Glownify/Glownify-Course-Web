import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
// import { createAdmissionFormThunk } from "../../../redux/features/admissionForm/admissionForm.thunk";
import toast from "react-hot-toast";

const StepThree = ({
  onNext,
  onPrev,
  courseId,
  courseFormData,
  setCourseFormData,
}) => {
  const dispatch = useDispatch();

  const [fields, setFields] = useState(
    courseFormData?.fields?.length
      ? courseFormData.fields
      : [
          {
            id: Date.now(),
            label: "Full Name",
            type: "text",
            fieldKey: "full_name",
            required: true,
            order: 0,
          },
        ],
  );

  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const [optionsInput, setOptionsInput] = useState("");

  // 🔥 Add Field
  const addField = () => {
    if (!newFieldLabel.trim()) {
      toast.error("Field label is required");
      return;
    }

    const formattedKey = newFieldLabel
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");

    if (fields.find((f) => f.fieldKey === formattedKey)) {
      toast.error("Field with same name already exists");
      return;
    }

    let optionsArray = [];

    if (["select", "radio", "checkbox"].includes(newFieldType)) {
      if (!optionsInput.trim()) {
        toast.error("Options are required (comma separated)");
        return;
      }

      optionsArray = optionsInput
        .split(",")
        .map((opt) => opt.trim())
        .filter((opt) => opt.length > 0);
    }

    const newField = {
      id: Date.now(),
      label: newFieldLabel.trim(),
      type: newFieldType,
      fieldKey: formattedKey,
      required: false,
      order: fields.length,
      ...(optionsArray.length > 0 && { options: optionsArray }),
    };

    setFields([...fields, newField]);
    setCourseFormData((prev) => ({
      ...prev,
      fields: [...fields, newField],
    }));

    setNewFieldLabel("");
    setNewFieldType("text");
    setOptionsInput("");
  };

  // 🔥 Delete Field
  const deleteField = (id) => {
    const updated = fields
      .filter((f) => f.id !== id)
      .map((f, index) => ({
        ...f,
        order: index,
      }));

    setFields(updated);
    setCourseFormData((prev) => ({
      ...prev,
      fields: updated,
    }));
  };

  // 🔥 Toggle Required
  const toggleRequired = (id) => {
    let updatFields = fields.map((f) =>
      f.id === id ? { ...f, required: !f.required } : f,
    );
    setFields(updatFields);
    setCourseFormData((prev) => ({ ...prev, fields: updatFields }));
  };

  //   // 🔥 Save to Backend
  //   const handleSave = async () => {
  //     try {
  //       await dispatch(
  //         createAdmissionFormThunk({
  //           courseId,
  //           fields,
  //         })
  //       ).unwrap();

  //       toast.success("Admission form saved successfully");
  //       onNext();
  //     } catch (error) {
  //       toast.error(error || "Failed to save admission form");
  //     }
  //   };
  console.log(fields, "fields");
  console.log(courseFormData, "courseFormData");

  return (
    <div className="p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Admission Form</h2>

          {/* Field List */}
          {fields.map((field) => (
            <div
              key={field.id}
              className="flex items-center justify-between p-4 border rounded-xl bg-white shadow-sm"
            >
              <div>
                <p className="font-semibold text-sm">{field.label}</p>
                <p className="text-xs text-gray-400">{field.type}</p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleRequired(field.id)}
                  className={`text-xs font-semibold ${
                    field.required ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {field.required ? "Required" : "Optional"}
                </button>

                <button
                  onClick={() => deleteField(field.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Add Field Section */}
          <div className="pt-6 border-t space-y-3">
            <h3 className="font-semibold">Add New Field</h3>

            <input
              type="text"
              placeholder="Enter field label"
              value={newFieldLabel}
              onChange={(e) => setNewFieldLabel(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <select
              value={newFieldType}
              onChange={(e) => setNewFieldType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="textarea">Textarea</option>
              <option value="date">Date</option>
              <option value="select">Dropdown</option>
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox Group</option>
            </select>

            {/* Options Input */}
            {["select", "radio", "checkbox"].includes(newFieldType) && (
              <input
                type="text"
                placeholder="Enter options (comma separated)"
                value={optionsInput}
                onChange={(e) => setOptionsInput(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            )}

            <button
              onClick={addField}
              className="w-full bg-teal-800 text-white py-2 rounded-lg font-semibold"
            >
              Add Field
            </button>
          </div>
        </div>

        {/* RIGHT SIDE PREVIEW */}
        <div className="bg-gray-50 p-8 rounded-2xl border">
          <h2 className="text-lg font-semibold mb-6">Preview</h2>

          <div className="space-y-4 bg-white p-6 rounded-xl border shadow-sm">
            {fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-semibold mb-2">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {/* TEXT TYPES */}
                {["text", "email", "number", "date"].includes(field.type) && (
                  <input
                    type={field.type}
                    className="w-full border rounded-lg px-3 py-2"
                    disabled
                  />
                )}

                {/* TEXTAREA */}
                {field.type === "textarea" && (
                  <textarea
                    className="w-full border rounded-lg px-3 py-2"
                    disabled
                  />
                )}

                {/* SELECT */}
                {field.type === "select" && (
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    disabled
                  >
                    <option>Select option</option>
                    {field.options?.map((opt, i) => (
                      <option key={i}>{opt}</option>
                    ))}
                  </select>
                )}

                {/* RADIO */}
                {field.type === "radio" &&
                  field.options?.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="radio" disabled />
                      <span>{opt}</span>
                    </div>
                  ))}

                {/* CHECKBOX GROUP */}
                {field.type === "checkbox" &&
                  field.options?.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      <span>{opt}</span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-6 border-t flex justify-between">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-2 border rounded-lg text-teal-800"
        >
          <ChevronLeft size={18} /> Previous
        </button>

        <button
          onClick={() => {
            setCourseFormData((prev) => ({
              ...prev,
              fields,
            }));
            onNext();
          }}
        >
          Save & Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default StepThree;
