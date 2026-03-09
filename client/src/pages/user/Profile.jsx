import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/auth.slice";
import { User, Mail, LogOut } from "lucide-react";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">

        {/* Avatar */}
        <div className="w-24 h-24 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-4">
          <User size={40} className="text-indigo-600" />
        </div>

        {/* Name */}
        <h1 className="text-xl font-semibold text-gray-800">
          {user?.name || "User"}
        </h1>

        {/* Email */}
        <div className="flex items-center justify-center gap-2 text-gray-500 mt-2">
          <Mail size={16} />
          <p>{user?.email}</p>
        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;