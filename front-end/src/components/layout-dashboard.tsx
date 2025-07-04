import Sidebar from "./Sidebar"
import { Outlet, useMatch } from "react-router"

const LayoutDashboard: React.FC = () => {
  // Match the preview page route and infer the `id` param type
  const match = useMatch("/manager/courses/:id/preview");
  const isPreviewPage: Boolean = match !== null;
  console.log(match)

  return isPreviewPage ? (
    <Outlet />
  ) : (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[290px]">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutDashboard;