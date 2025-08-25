import { Link } from "react-router";

type CardProps = {
  id: string | number;
  imageThumbnail: string;
  title: string;
  categories: string;
};

function CardCourse({ id, imageThumbnail, title, categories }: CardProps) {
  return (
    <div className="card flex items-center gap-5">
      <div className="flex shrink-0 w-[100px] h-20 rounded-[20px] bg-[#D9D9D9] overflow-hidden">
        <img src={`/assets/images/thumbnails/${imageThumbnail}`} className="w-full h-full object-cover" alt="thumbnail" />
      </div>
      <div className="w-full">
        <Link to={`/student/courses/${id}`} className="font-bold text-xl leading-[30px] line-clamp-1">
          {title}
        </Link>
        <div className="flex items-center gap-[6px] mt-[6px]">
          <img src="/assets/images/icons/crown-purple.svg" alt="icon" />
          <p className="text-[#838C9D]">{categories}</p>
        </div>
      </div>
    </div>
  );
}

export default CardCourse;
