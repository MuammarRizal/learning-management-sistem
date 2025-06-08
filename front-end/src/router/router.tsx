import { createBrowserRouter } from "react-router";
import Manager from "../pages/ManagerHome";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import Pricing from "../pages/pricing";

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
      path: "/manager/sign-in",
      element: <SignIn />
    },
    {
      path: "/manager/sign-up",
      element: <SignUp />
    },
    {
      path: "/pricing",
      element: <Pricing />
    },
])

export default router