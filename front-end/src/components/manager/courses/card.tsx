import { Link } from "react-router";

type cardProps = {
  id: string;
  thumbnail: string;
  name: string;
  totalStudents: number;
  categories: string;
};

function CardComp({ id = "1", thumbnail = "/assets/images/thumbnails/th-1.png", name = "Responsive Design Triclorem Lorem, ipsum dolor.", totalStudents = 1, categories = "programming" }: cardProps) {
  return (
    <div className="card flex items-center gap-5">
      <div className="flex shrink-0 w-[140px] h-[110px] rounded-[20px] bg-[#D9D9D9] overflow-hidden">
        <img src={thumbnail} className="w-full h-full object-cover" alt="thumbnail" />
      </div>
      <div className="w-full">
        <h3 className="font-bold text-xl leading-[30px] line-clamp-1">{name}</h3>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-[6px] mt-[6px]">
            <img src="/assets/images/icons/profile-2user-purple.svg" className="w-5 h-5" alt="icon" />
            <p className="text-[#838C9D]">{totalStudents} Students</p>
          </div>
          <div className="flex items-center gap-[6px] mt-[6px]">
            <img src="/assets/images/icons/crown-purple.svg" className="w-5 h-5" alt="icon" />
            <p className="text-[#838C9D]">{categories}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3">
        <Link to={`/manager/course/${id}`} className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap">
          Manage
        </Link>
      </div>
    </div>
  );
}

export default CardComp;
