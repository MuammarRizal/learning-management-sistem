import { createBrowserRouter } from "react-router";
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

const router = createBrowserRouter([
    {
      path: "/",
      element: <ManagerPage />
    },
    {
      path: "/about",
      element: "heiii"
    },
    {
      path: "/pricing",
      element: <Pricing />
    },
    {
      path: "/success-checkout",
      element: <SuccessCheckoutPage />
    },

    // Manager
    {
      path: "/manager",
      element: <LayoutDashboard isAdmin={true}/>,
      children: [
        {
          index: true,
          element: <DashboardManagerPage />
        },
        {
          path: "/manager/courses",
          element: <ManagerCoursePage />,
        },
        {
          path: "/manager/course/create",
          element: <CreateCoursePage />
        },
        {
          path: "/manager/course/:id",
          element: <CourseDetailPage />
        },
        {
          path: "/manager/courses/:id/create",
          element: <CourseContentCreatePage />
        },
        {
          path: "/manager/courses/:id/preview",
          element: <CoursePreview />
        },
        {
          path: "/manager/students",
          element: <ManagerStudentsPage />
        },
        {
          path: "/manager/students/create",
          element: <CreateStudentPage />
        },
      ]
    },
    {
      path: "/student",
      element: <LayoutDashboard isAdmin={false}/>,
      children: [
        {
          index: true,
          element: <StudentPage />
        },
        {
          path: "/student/courses/:id",
          element: <CoursePreview />
        },
      ]
    },
    {
      path: "/manager/sign-in",
      element: <SignIn />
    },
    {
      path: "/manager/sign-up",
      element: <SignUp />
    },
])

export default router