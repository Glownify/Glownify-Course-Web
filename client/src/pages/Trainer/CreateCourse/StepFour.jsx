import React, { useState, useRef } from "react";
import { ChevronLeft, Info, Upload, Check, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { createCourseThunk } from "../../../redux/features/course/course.thunk";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StepFour = ({ onPrev, courseFormData, setCourseFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [paymentData, setPaymentData] = useState({
    upiId: courseFormData.upiId || "",
    paymentLink: courseFormData.paymentLink || "",
    qrCode: null,
  });

  const [qrPreview, setQrPreview] = useState(null);

  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  console.log(CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET);


  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  console.log("Course Form Data in StepFour:", CLOUDINARY_UPLOAD_URL);
  // -----------------------------
  // Handle Text Inputs
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // Handle QR File Selection
  // -----------------------------
  const handleQrSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    setPaymentData((prev) => ({
      ...prev,
      qrCode: file,
    }));

    setQrPreview(URL.createObjectURL(file));
  };

  // -----------------------------
  // Upload to Cloudinary
  // -----------------------------
  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "courses");

    const res = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    return data.secure_url;
  };

  // -----------------------------
  // Publish Course
  // -----------------------------
  const handlePublish = async () => {
    try {
      setLoading(true);

      // 1️⃣ Upload Poster
      const posterUrl = await uploadToCloudinary(
        courseFormData.posterImage
      );

      // 2️⃣ Upload QR (optional)
      const qrUrl = await uploadToCloudinary(paymentData.qrCode);

      // 3️⃣ Prepare final payload
      const finalPayload = {
        ...courseFormData,
        ...paymentData,
        poster: posterUrl,
        qrCodeImage: qrUrl,
      };

      // remove raw file objects
      delete finalPayload.posterImage;
      delete finalPayload.qrCode;

      console.log("Final Payload for Course Creation:", finalPayload);

      // 4️⃣ Dispatch create course action
      await dispatch(createCourseThunk(finalPayload)).unwrap();

      toast.success("Course Published Successfully!");

      navigate("/trainer/courses");
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 md:p-12">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">
          Payment Information
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Students will pay you directly.
        </p>
      </div>

      {/* Alert */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mb-8">
        <Info size={20} className="text-blue-600" />
        <p className="text-sm text-blue-800">
          Glownify does not handle payments.
        </p>
      </div>

      <div className="space-y-6">
        {/* UPI */}
        <div>
          <label className="block font-bold mb-2">UPI ID</label>
          <input
            name="upiId"
            value={paymentData.upiId}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Payment Link */}
        <div>
          <label className="block font-bold mb-2">Payment Link</label>
          <input
            name="paymentLink"
            value={paymentData.paymentLink}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* QR Upload */}
        <div>
          <label className="block font-bold mb-2">QR Code</label>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleQrSelect}
            className="hidden"
            accept="image/*"
          />

          {!qrPreview ? (
            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer hover:border-teal-300"
            >
              <Upload size={24} className="mx-auto mb-3 text-teal-600" />
              <p>Click to upload QR Code</p>
            </div>
          ) : (
            <div className="relative w-40">
              <img
                src={qrPreview}
                alt="QR Preview"
                className="rounded-lg"
              />
              <button
                onClick={() => {
                  setQrPreview(null);
                  setPaymentData((prev) => ({
                    ...prev,
                    qrCode: null,
                  }));
                }}
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
              >
                <X size={14} className="text-red-500" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex justify-between">
        <button
          onClick={onPrev}
          className="border px-6 py-2 rounded-lg"
        >
          <ChevronLeft size={18} /> Previous
        </button>

        <button
          onClick={handlePublish}
          disabled={loading}
          className="bg-teal-800 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          {loading ? "Publishing..." : "Publish Course"}
          <Check size={18} />
        </button>
      </div>
    </div>
  );
};

export default StepFour;