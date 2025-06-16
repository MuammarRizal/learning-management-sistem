import LatestCourse from "./latest-course";
import LatestStudent from "./latest-student";
import Stats from "./stats";

function DashboardManager() {
  return (
    <div className="grid grid-cols-2 gap-[30px]">
        <Stats />
        <LatestCourse />
        <LatestStudent />
    </div>
  )
}

export default DashboardManager