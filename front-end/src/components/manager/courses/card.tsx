import { Link, useRevalidator } from "react-router";
import { deleteCourseById } from "../../../services/course.service";
import { useMutation } from "@tanstack/react-query";

type cardProps = {
  id: string;
  thumbnail: string;
  name: string;
  totalStudents: number;
  categories: string;
};

function CardComp({ id = "1", thumbnail = "/assets/images/thumbnails/th-1.png", name = "Responsive Design Triclorem Lorem, ipsum dolor.", totalStudents = 1, categories = "programming" }: cardProps) {
  const revalidator = useRevalidator();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => deleteCourseById(id),
  });

  const onDeleteHandler = async () => {
    try {
      const confirmDelete = confirm("Apa anda yakin ingin menghapus?");
      if (confirmDelete) {
        await mutateAsync();
        revalidator.revalidate();
      }
    } catch (error) {
      console.log(error);
    }
  };
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
      <div className="flex justify-end items-center gap-3 cursor-pointer">
        <button type="button" onClick={onDeleteHandler} disabled={isPending} className="cursor-pointer w-fit bg-red-500 text-white rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap">
          Delete
        </button>
      </div>
    </div>
  );
}

export default CardComp;
