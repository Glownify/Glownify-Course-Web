import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useSelector } from "react-redux";

const PublicLayout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  console.log("PublicLayout - Current user:", user); // Debug log

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/admin");
    } 
    else if (user.role === "trainer") {
      navigate("/trainer");
    } 
    else if (user.role === "student") {
      navigate("/");
    }

  }, [user, navigate]);
  return (
    <div className="min-h-screen flex flex-col pb-8 md:pb-0 ">
      <Navbar />
      
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
