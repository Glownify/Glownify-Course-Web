import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/features/auth/auth.thunk";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    profession: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.city ||
    !formData.profession
  ) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    const resultAction = await dispatch(registerThunk(formData));

    if (registerThunk.fulfilled.match(resultAction)) {
      toast.success(
        resultAction.payload?.message || "Registration successful 🎉"
      );

      // ✅ Reset properly
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        profession: "",
      });

    } else {
      toast.error(
        resultAction.payload?.message || "Registration failed"
      );
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* LEFT SECTION */}
        <div className="space-y-5 text-center lg:text-left">
          <p className="text-teal-600 font-bold tracking-wide font-size-200 ">
            JOIN GLOWNIFY
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Start Your Course Selling Journey
          </h1>

          <p className="text-gray-600 text-sm sm:text-base">
            Join hundred of beauty professionals who are growing their training
            business with Glownify. Create courses, collect enrollments, and
            connect with students — all for free.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold">
                ✓
              </div>
              <p>Create unlimited course listings</p>
            </div>

            <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold">
                ✓
              </div>
              <p>Collect student enrollments easily</p>
            </div>

            <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold">
                ✓
              </div>
              <p>Share courses on social media</p>
            </div>

            <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold">
                ✓
              </div>
              <p>No commission fee – 100% yours</p>
            </div>
          </div>

          <div className="bg-teal-100 text-teal-700 p-4 rounded-lg text-xs sm:text-sm">
            Did you know? Over 500 trainers have already created courses on
            Glownify and connected with thousands of students.
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-lg mx-auto lg:mx-0"
        >
          <h2 className="text-2xl font-bold mb-6">
            Create your Seller Account
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Full Name / Academy Name
              </label>
              <input
                className="mt-1 w-full border  rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                placeholder="Enter your name or academy name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">City</label>
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Enter your city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Profession</label>
              <select
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                value={formData.profession}
                onChange={handleChange}
                name="profession"
                required
              >
                <option>Select your profession</option>
                <option>Barbers</option>
                <option>Beautician</option>
                <option>Makeup Artist</option>
                <option>Training Academies</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-lg font-semibold text-sm sm:text-base transition"
            >
              Register as Course Seller
            </button>

            <p className="text-xs text-gray-500 text-center">
              By registering, you agree to our Terms of Service and Privacy
              Policy
            </p>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-teal-700 font-medium cursor-pointer"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
