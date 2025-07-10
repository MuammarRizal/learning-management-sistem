import HeaderOverview from "./header";
import LatestCourse from "./latest-course";
import LatestStudent from "./latest-student";
import Stats from "./stats";

function DashboardManagerPage() {
  return (
    <div className="grid grid-cols-1 gap-[30px]">
        <HeaderOverview />
        <Stats />
        <LatestCourse />
        <LatestStudent />
    </div>
  )
}

export default DashboardManagerPage