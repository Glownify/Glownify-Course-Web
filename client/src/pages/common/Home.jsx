import Hero from "../common/HomePage/Hero";
import Courses from "../common/HomePage/Courses";
import About from "./HomePage/About";
import Trainer from "./HomePage/Trainer";
import Student from "./HomePage/Student";
import Trust from "./HomePage/Trust";
import Offers from "./HomePage/Offers";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);
  return (
    <>
      <Hero />
      <Courses />
      <About />
      <Trainer />
      <Student />
      <Trust />
      <Offers />
    </>
  );
};

export default Home;
