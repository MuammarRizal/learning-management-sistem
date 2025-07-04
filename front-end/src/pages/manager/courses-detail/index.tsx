import CourseContent from './course-content'
import CourseInfo from './course-info'

function CourseDetail() {
  return (
    <>
        <div id="Breadcrumb" className="flex items-center gap-5 *:after:content-['/'] *:after:ml-5">
            <span className="last-of-type:after:content-[''] last-of-type:font-semibold">Dashboard</span>
            <span className="last-of-type:after:content-[''] last-of-type:font-semibold">Manage Course</span>
            <span className="last-of-type:after:content-[''] last-of-type:font-semibold">Details</span>
        </div>
        <header className="flex items-center justify-between gap-[30px]">
            <div>
                <h1 className="font-extrabold text-[28px] leading-[42px]">
                    Mastering React TypeScript 7 <br />
                    Website Development
                </h1>
            </div>
            <div className="flex items-center gap-3">
                <a href="#" className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap">
                    Edit Course
                </a>
                <a href="course-learning-video.html" className="w-fit rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap">
                    Preview
                </a>
            </div>
        </header>
        <CourseInfo />
        <CourseContent />
    </>
  )
}

export default CourseDetail