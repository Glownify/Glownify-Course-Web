import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import ProtectedRoute from "./ProtectedRoute";
import TrainerLayout from "../layout/TrainerLayout";

// Public Pages
import Home from "../pages/common/Home";
import Login from "../pages/common/Login";
import Register from "../pages/common/Register";
import About from "../pages/common/About";
import Courses from "../pages/common/Courses";
import CourseDetails from "../pages/common/Courses/CourseDetails";
import EnrollForm from "../pages/common/Courses/EnrollForm";
import EnrollmentSucces from "../pages/common/Courses/EnrollmentSucces";

// Trainer Pages
import TrainerDashboard from "../pages/Trainer/TrainerDashboard";
import Students from "../pages/Trainer/Students";
import Settings from "../pages/Trainer/Settings";
import Share from "../pages/Trainer/Share";
import TrainerCourses from "../pages/Trainer/TrainerCourses";
import CreateCourse from "../pages/Trainer/CreateCourse";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminCreateCategories from "../pages/Admin/AdminCreateCategories";
import EnrolledCourses from "../pages/user/EnrolledCourses";
import Profile from "../pages/user/Profile";

const router = createBrowserRouter([
  // 🌍 Public Layout Wrapper
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "about", element: <About /> },
      { path: "courses", element: <Courses /> },
      { path: "courses/:id", element: <CourseDetails /> },
      {
        path: "courses/enroll/:id",
        element: (
          <ProtectedRoute roles={["student"]}>
            {" "}
            <EnrollForm />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/enrollment-success",
        element: (
          <ProtectedRoute roles={["student"]}>
            {" "}
            <EnrollmentSucces />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "enrolled-courses",
        element: (
          <ProtectedRoute roles={["student"]}>
            <EnrolledCourses />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute roles={["student"]}>
            <Profile />
          </ProtectedRoute>
        )
      }
    ],
  },

  // 👨‍🏫 Trainer Routes
  {
    path: "/trainer",
    element: (
      <ProtectedRoute roles={["trainer"]}>
        <TrainerLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <TrainerDashboard /> },
      { path: "courses", element: <TrainerCourses /> },
      { path: "createcourses", element: <CreateCourse /> },
      { path: "students", element: <Students /> },
      { path: "share", element: <Share /> },
      { path: "settings", element: <Settings /> },
      // { path: "categories", element: <CreateCategory /> },
    ],
  },
  // 👨‍🏫 Admin Routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },

      // { path: "adminCreateCategories", element: <AdminCreateCategories /> },
      { path: "categories", element: <AdminCreateCategories /> },
    ],
  },
]);

export default router;
