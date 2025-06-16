import { createBrowserRouter } from "react-router";
import Manager from "../pages/manager/dashboard";
import SignIn from "../pages/auth/sign-in";
import SignUp from "../pages/auth/sign-up";
import Pricing from "../pages/auth/sign-up/pricing";
import SuccessCheckout from "../pages/SuccessCheckout";
import LayoutDashboard from "../components/layout-dashboard";
import DashboardManager from "../pages/manager/dashboard";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Manager />
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
      element: <SuccessCheckout />
    },

    // Manager
    {
      path: "/manager",
      element: <LayoutDashboard />,
      children: [
        {
          index: true,
          element: <DashboardManager />
        }
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