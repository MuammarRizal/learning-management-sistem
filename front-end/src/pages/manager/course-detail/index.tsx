import { Link, useLoaderData, useParams } from "react-router";
import CourseContent from "./course-content";
import CourseInfo from "./course-info";
import type { courseDetail } from "../../../types/course.type";

function CourseDetailPage() {
  const { id } = useParams();
  const data: courseDetail = useLoaderData();
  const courseContent = data.details;
  return (
    <>
      <div id="Breadcrumb" className="flex items-center gap-5 *:after:content-['/'] *:after:ml-5">
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">Dashboard</span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">Manage Course</span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">Details</span>
      </div>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">{data.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to={`/manager/course/edit/${id}`} className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap">
            Edit Course
          </Link>
          <Link to={`/manager/courses/${id}?preview=true`} className="w-fit rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap">
            Preview
          </Link>
        </div>
      </header>
      <CourseInfo image={data.thumbnail} total_students={data.students.length} category={data.category.name} total_content={data.details.length} />
      <CourseContent paramsId={id} data={courseContent} />
    </>
  );
}

export default CourseDetailPage;
