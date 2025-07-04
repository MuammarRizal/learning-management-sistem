function CourseInfo() {
  return (
    <section id="CourseInfo" className="flex gap-[50px]">
        <div id="Thumbnail" className="flex shrink-0 w-[480px] h-[250px] rounded-[20px] bg-[#D9D9D9] overflow-hidden">
            <img src="/assets/images/thumbnails/th-4.png" className="w-full h-full object-cover" alt="thumbnail" />
        </div>
        <div className="grid grid-cols-2 gap-5 w-full">
            <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
                <img src="/assets/images/icons/profile-2user-purple.svg" className="w-8 h-8" alt="icon" />
                <p className="font-semibold">12,489 Students</p>
            </div>
            <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
                <img src="/assets/images/icons/crown-purple.svg" className="w-8 h-8" alt="icon" />
                <p className="font-semibold">Programming</p>
            </div>
            <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
                <img src="/assets/images/icons/note-favorite-purple.svg" className="w-8 h-8" alt="icon" />
                <p className="font-semibold">873 Contents</p>
            </div>
            <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
                <img src="/assets/images/icons/cup-purple.svg" className="w-8 h-8" alt="icon" />
                <p className="font-semibold">Certificate</p>
            </div>
        </div>
    </section>
  )
}

export default CourseInfo