import CardCourse from "./CardCourse"

function StudentPage() {
  return (
    <section id="LatestCourse" className="flex flex-col rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
        <h2 className="font-extrabold text-[22px] leading-[33px]">Latest Courses</h2>
        <CardCourse id={1} title={'Mastering React JS'} imageThumbnail="th-1.png" categories="Programming"/>
        <CardCourse id={2} title={'Mastering React JS'} imageThumbnail="th-2.png" categories="Javascript"/>
        <CardCourse id={3} title={'Mastering React JS'} imageThumbnail="th-3.png" categories="Web Development"/>
    </section>
  )
}

export default StudentPage