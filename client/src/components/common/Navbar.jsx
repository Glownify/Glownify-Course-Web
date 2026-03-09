import React, { useState, useEffect } from "react";
import { Menu, Bell } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Info,
  BookOpen,
  User,
  LogIn,
  GraduationCap,
} from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Role Based Link */
  const getRoleBasedLink = () => {
    if (user?.role === "student") {
      return {
        name: "My Enrolled",
        path: "/enrolled-courses",
        icon: <GraduationCap size={20} />,
      };
    }
    else{
      return {
        name: "Add Courses",
        path: "/login",
        icon: <PlusCircle size={20} />,
      };
    }

    return null;
  };

  const roleLink = getRoleBasedLink();

  const navLinks = [
    { name: "Home", path: "/" },
    roleLink,
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
  ].filter(Boolean); // remove null

  return (
    <nav>
       {/* ================= MOBILE APP NAVBAR ================= */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 py-3 flex items-center justify-between md:hidden">

      {/* Left Menu */}
      <Menu className="w-6 h-6 text-gray-700" />

      {/* Logo + Name */}
      <div className="flex items-center gap-2">
        
        {/* Multicolor Flower */}
        <div className="w-6 h-6 relative">
          <div className="absolute w-3 h-3 bg-pink-500 rounded-full top-0 left-1"></div>
          <div className="absolute w-3 h-3 bg-yellow-400 rounded-full top-1 right-0"></div>
          <div className="absolute w-3 h-3 bg-green-400 rounded-full bottom-0 right-1"></div>
          <div className="absolute w-3 h-3 bg-blue-400 rounded-full bottom-1 left-0"></div>
          <div className="absolute w-2 h-2 bg-purple-500 rounded-full top-2 left-2"></div>
        </div>

        <h1 className="text-xl font-bold text-gray-900">
          glownify
        </h1>

      </div>

      {/* Notification */}
      <Bell className="w-6 h-6 text-gray-700" />

    </div>
      {/* ================= DESKTOP NAVBAR ================= */}
      <div
        className={`hidden md:flex fixed top-0 left-0 w-full items-center justify-between px-6 md:px-12 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-sm py-3"
            : "bg-transparent py-6"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <img
              className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:scale-110"
              src="/GlownifyLogoPng.png"
              alt="Glownify Logo"
            />
            <div className="absolute inset-0 bg-pink-400 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </div>

          <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-linear-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            Glownify
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-all duration-300 hover:text-pink-600 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-pink-600 after:transition-all hover:after:w-full ${
                  isActive ? "text-pink-600 after:w-full" : "text-gray-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/profile" className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full border border-pink-100 shadow-sm">
              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-[10px]">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <span className="text-sm font-medium text-gray-800">
                {user.name}
              </span>
            </div>
            </Link>
          ) : (
            <NavLink
              to="/login"
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-200 transition-all duration-300"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* ================= MOBILE NAVBAR ================= */}
      <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-[100%] max-w-md bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl z-50 px-4 py-3">
        <div className="flex justify-between items-center">
          <MobileNavItem to="/" icon={<Home size={20} />} label="Home" />

          {roleLink ? (
            <MobileNavItem
              to={roleLink.path}
              icon={roleLink.icon}
              label={roleLink.name}
            />
          ) : (
            <MobileNavItem
              to="/login"
              icon={<LogIn size={20} />}
              label="Login"
            />
          )}

          <MobileNavItem
            to="/about"
            icon={<Info size={20} />}
            label="About"
          />

          <MobileNavItem
            to="/courses"
            icon={<BookOpen size={20} />}
            label="Courses"
          />

          {user && (
            <MobileNavItem
              to="/profile"
              icon={<User size={20} />}
              label="Profile"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

/* Mobile Nav Item */
const MobileNavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center gap-1 transition-all duration-300 ${
        isActive ? "text-pink-600 scale-110" : "text-gray-400"
      }`
    }
  >
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-wider">
      {label}
    </span>
  </NavLink>
);

export default Navbar;