import { createBrowserRouter, redirect } from "react-router";
import ManagerPage from "../pages/manager/dashboard";
import SignIn from "../pages/auth/sign-in";
import SignUp from "../pages/auth/sign-up";
import Pricing from "../pages/auth/sign-up/pricing";
import SuccessCheckoutPage from "../pages/SuccessCheckout";
import LayoutDashboard from "../components/layout-dashboard";
import DashboardManagerPage from "../pages/manager/dashboard";
import ManagerCoursePage from "../pages/manager/courses";
import CreateCoursePage from "../pages/manager/create-course";
import CourseDetailPage from "../pages/manager/course-detail";
import CourseContentCreatePage from "../pages/manager/course-content-create";
import CoursePreview from "../pages/manager/course-preview";
import CreateStudentPage from "../pages/manager/create-student";
import StudentPage from "../pages/student/student-overview";
import ManagerStudentsPage from "../pages/manager/students";
import secureLocalStorage from "react-secure-storage";
import { MANAGER_SESSION, STORAGE_KEY } from "../utils/const";
import type { DataSession } from "../types/auth.type";
import { getCourses } from "../services/course.service";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ManagerPage />,
  },
  {
    path: "/about",
    element: "heiii",
  },
  {
    path: "/pricing",
    element: <Pricing dataForm={null} />,
  },
  {
    path: "/success-checkout",
    element: <SuccessCheckoutPage />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },

  // Manager
  {
    path: "/manager",
    id: MANAGER_SESSION,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY) as DataSession | null;
      if (!session || session.role !== "manager") {
        throw redirect("/sign-in");
      }
      return session;
    },
    element: <LayoutDashboard isAdmin={true} />,
    children: [
      {
        index: true,
        element: <DashboardManagerPage />,
      },
      {
        path: "/manager/courses",
        loader: async () => {
          const { data } = await getCourses();
          return data;
        },
        element: <ManagerCoursePage />,
      },
      {
        path: "/manager/course/create",
        element: <CreateCoursePage />,
      },
      {
        path: "/manager/course/:id",
        element: <CourseDetailPage />,
      },
      {
        path: "/manager/courses/:id/create",
        element: <CourseContentCreatePage />,
      },
      {
        path: "/manager/courses/:id/preview",
        element: <CoursePreview />,
      },
      {
        path: "/manager/students",
        element: <ManagerStudentsPage />,
      },
      {
        path: "/manager/students/create",
        element: <CreateStudentPage />,
      },
    ],
  },
  {
    path: "/student",
    element: <LayoutDashboard isAdmin={false} />,
    children: [
      {
        index: true,
        element: <StudentPage />,
      },
      {
        path: "/student/courses/:id",
        element: <CoursePreview />,
      },
    ],
  },
]);

export default router;
