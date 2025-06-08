import { createBrowserRouter } from "react-router";
import Manager from "../pages/ManagerHome";
import SignIn from "../pages/sign-in";

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
      path: "/sign-in",
      element: <SignIn />
    },
])

export default router