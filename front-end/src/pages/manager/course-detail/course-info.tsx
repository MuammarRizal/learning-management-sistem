import type { courseInfo } from "../../../types/course.type";

function CourseInfo({ image, total_students, category, total_content }: courseInfo) {
  return (
    <section id="CourseInfo" className="flex gap-[50px]">
      <div id="Thumbnail" className="flex shrink-0 w-[480px] h-[250px] rounded-[20px] bg-[#D9D9D9] overflow-hidden">
        <img src={`${image}`} className="w-full h-full object-cover" alt="thumbnail" />
      </div>
      <div className="grid grid-cols-2 gap-5 w-full">
        <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
          <div className="flex items-center gap-3">
            <img src="/assets/images/icons/profile-2user-purple.svg" className="w-8 h-8" alt="icon" />
            <p className="text-lg font-bold">Total Students</p>
          </div>
          <p className="font-semibold">{total_students} Students</p>
        </div>
        <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
          <div className="flex items-center gap-3">
            <img src="/assets/images/icons/crown-purple.svg" className="w-8 h-8" alt="icon" />
            <p className="text-lg font-bold">Category</p>
          </div>
          <p className="font-semibold">{category}</p>
        </div>
        <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
          <div className="flex gap-3 items-center">
            <img src="/assets/images/icons/note-favorite-purple.svg" className="w-8 h-8" alt="icon" />
            <p className="text-lg font-bold">Total Contents</p>
          </div>
          <p className="font-semibold">{total_content} Contents</p>
        </div>
        <div className="flex items-center p-5 rounded-[20px] border border-[#CFDBEF]">
          <div className="flex gap-3 items-center">
            <img src="/assets/images/icons/cup-purple.svg" className="w-8 h-8" alt="icon" />
            <p className="text-lg font-bold">Certificate</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseInfo;
