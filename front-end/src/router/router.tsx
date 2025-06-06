import { createBrowserRouter } from "react-router";
import Manager from "../pages/ManagerHome";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Manager />
    },
    {
      path: "/about",
      element: "heiii"
    },
])

export default router