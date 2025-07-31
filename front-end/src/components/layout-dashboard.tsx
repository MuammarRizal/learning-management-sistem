import Header from "./header";
import Sidebar from "./Sidebar";
import { Outlet, useMatch } from "react-router";
type DashboardProps = {
  isAdmin: Boolean;
};
const LayoutDashboard: React.FC<DashboardProps> = ({ isAdmin }) => {
  const matchManager = useMatch("/manager/courses/:id/preview");
  const matchStudent = useMatch("/student/courses/:id");
  const isPreviewPage: Boolean = (matchManager || matchStudent) !== null;
  // console.log(match)

  return isPreviewPage ? (
    <Outlet />
  ) : (
    <div className="flex min-h-screen">
      <Sidebar isAdmin={isAdmin} />
      <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[290px]">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutDashboard;
