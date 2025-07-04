import Header from "./header";
import LatestCourse from "./latest-course";
import LatestStudent from "./latest-student";
import Stats from "./stats";

function DashboardManagerPage() {
  return (
    <div className="grid grid-cols-1 gap-[30px]">
        <Header />
        <Stats />
        <LatestCourse />
        <LatestStudent />
    </div>
  )
}

export default DashboardManagerPage