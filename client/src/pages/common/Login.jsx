import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/features/auth/auth.thunk";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const roleRedirect = {
  student: "/",
  trainer: "/trainer",
  admin: "/admin",
};

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    toast.error("Please enter email and password");
    return;
  }

  try {
    const data = await dispatch(loginThunk(formData)).unwrap();

    toast.success(data?.message || "Login successful 🎉");

    navigate(roleRedirect[data.user.role] || "/");

  } catch (err) {
    // err is your rejectWithValue object
    toast.error(err?.message || "Login failed");
  }
};


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
      {/* Decorative background elements for a modern feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-50 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-50 blur-[120px]" />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10">
        
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-50 rounded-xl mb-4">
            <span className="text-2xl font-bold text-pink-500">G</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Enter your details to access your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-xl mb-6 flex items-center gap-2">
            <span className="w-1 h-1 bg-red-600 rounded-full" />
            {error.message || "Invalid credentials"}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
            <input
              name="email"
              type="email"
              required
              disabled={loading}
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
              placeholder="name@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <button type="button" className="text-xs font-semibold text-pink-600 hover:text-pink-700">
                Forgot?
              </button>
            </div>
            <input
              name="password"
              type="password"
              required
              disabled={loading}
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold bg-gray-900 text-white hover:bg-gray-800 transform active:scale-[0.98] transition-all shadow-lg shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in...
              </span>
            ) : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          New to Glownify?{" "}
          <a href="/register" className="font-bold text-gray-900 hover:underline decoration-pink-500 decoration-2 underline-offset-4">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;