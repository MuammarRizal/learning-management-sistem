import Sidebar from "./Sidebar"
import { Outlet } from "react-router"
function LayoutDashboard() {
  return (
    <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[290px]">
            <Outlet />
        </main>
    </div>
  )
}

export default LayoutDashboard