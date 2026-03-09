import React from 'react'
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from './app/router';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

const App = () => {
  return (
    <>
    {/* <Navbar /> */}
    <RouterProvider router={router} />
    {/* <Footer /> */}
    <Toaster position="top-right" />
    </>
  )
}

export default App