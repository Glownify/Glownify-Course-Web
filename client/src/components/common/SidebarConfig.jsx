import {
  LayoutDashboard,
  Users,
  Settings,
  Plus,
  Book,
  Share
} from "lucide-react";

export const SidebarConfig = {
  TRAINER: [
    { to: "/trainer", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/trainer/courses", label: "Courses", icon: <Book size={18} /> },
    { to: "/trainer/createcourses", label: "Create Course", icon: <Plus size={18} /> },
    { to: "/trainer/students", label: "Students", icon: <Users size={18} /> },
    { to: "/trainer/share", label: "Share", icon: <Share size={18} /> },
    { to: "/trainer/settings", label: "Settings", icon: <Settings size={18} /> },

    // { to: "/trainer/categories", label: "Categories", icon: <Settings size={18} /> },
  ],
   ADMIN: [
    { to: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/admin/categories", label: "Categories", icon: <Settings size={18} /> },
  ]
};
