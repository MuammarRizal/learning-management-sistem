import { Link, useLoaderData, useNavigate } from "react-router";
import type { CategoriesType } from "../../../types/categories.type";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createCourses } from "../../../services/course.service";
import type { DataForm } from "../../../types/course.type";
import { createCourseSchema } from "../../../utils/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";

function CreateCoursePage() {
  const { categories }: { categories: CategoriesType[] } = useLoaderData();

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(createCourseSchema),
  });

  const mutateCreateCourse = useMutation({
    mutationFn: (data: DataForm) => createCourses(data),
  });

  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onHandleSubmit = async (data: DataForm) => {
    try {
      await mutateCreateCourse.mutateAsync({
        name: data.name,
        thumbnail: file || "https://localhost:3001/image.jpg",
        tagline: data.tagline,
        categoryId: data.categoryId,
        description: data.description,
      });

      navigate("/manager/courses");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setValue("thumbnail", file);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">New Course</h1>
          <p className="text-[#838C9D] mt-[1]">Create new future for company</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="#" className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap">
            Import from BWA
          </Link>
        </div>
      </header>
      <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col w-[550px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="title" className="font-semibold">
            Course Name
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img src="/assets/images/icons/note-favorite-black.svg" className="w-6 h-6" alt="icon" />
            <input {...register("name")} type="text" id="title" className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent" placeholder="Write better name for your course" required />
          </div>
          {errors.name?.message && (
            <div className="message-error">
              <span className="error-message text-[#FF435A]">{errors.name?.message}</span>
            </div>
          )}
        </div>
        <div className="relative flex flex-col gap-[10px]">
          <label htmlFor="thumbnail" className="font-semibold">
            Add a Thumbnail
          </label>
          <div id="thumbnail-preview-container" className="relative flex shrink-0 w-full h-[200px] rounded-[20px] border border-[#CFDBEF] overflow-hidden">
            <button onClick={() => inputFileRef.current?.click()} type="button" id="trigger-input" className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-3 z-0 cursor-pointer ">
              {!file && (
                <div className="flex gap-3 ">
                  <img src="/assets/images/icons/gallery-add-black.svg" className="w-6 h-6" alt="icon" />
                  <span className="text-[#838C9D]">Add an attachment</span>
                </div>
              )}
            </button>
            <img id="thumbnail-preview" src={file !== null ? URL.createObjectURL(file) : "image"} className={`w-full h-full object-cover ${file ? "block" : "hidden"}`} alt="thumbnail" />
            <button type="button" id="delete-preview" className="absolute right-[10px] bottom-[10px] w-12 h-12 rounded-full z-10 hidden">
              <img src="/assets/images/icons/delete.svg" alt="delete" />
            </button>
          </div>
          <input {...register("thumbnail")} ref={inputFileRef} onChange={handleFileChange} type="file" id="thumbnail" accept="image/*" className="absolute bottom-0 left-1/4 -z-10" />
          {errors.thumbnail?.message && (
            <div className="message-error">
              <span className="error-message text-[#FF435A]">Thumbnail Is Required</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="tagline" className="font-semibold">
            Course Tagline
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img src="/assets/images/icons/bill-black.svg" className="w-6 h-6" alt="icon" />
            <input {...register("tagline")} type="text" id="tagline" className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent" placeholder="Write tagline for better copy" />
          </div>
          {errors.tagline?.message && (
            <div className="message-error">
              <span className="error-message text-[#FF435A]">{errors.tagline?.message}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="category" className="font-semibold">
            Select Category
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img src="/assets/images/icons/bill-black.svg" className="w-6 h-6" alt="icon" />
            <select {...register("categoryId")} id="category" className="appearance-none outline-none w-full py-3 px-2 -mx-2 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent">
              {categories.map((item: CategoriesType) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            <img src="/assets/images/icons/arrow-down.svg" className="w-6 h-6" alt="icon" />
          </div>
          {errors.categoryId?.message && (
            <div className="message-error">
              <span className="error-message text-[#FF435A]">{errors.categoryId?.message}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="desc" className="font-semibold">
            Description
          </label>
          <div className={`flex w-full rounded-[20px] border border-[#CFDBEF] gap-3 p-5  transition-all duration-300 focus-within:ring-2  ring-2 ${errors.description?.message ? "focus-within:ring-[#FF435A] ring-[#FF435A]" : "focus-within:ring-[#662FFF]"}`}>
            <img src="/assets/images/icons/note-black.png" className="w-6 h-6" alt="icon" />
            <textarea {...register("description")} id="desc" rows={5} className="appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent" placeholder="Explain what this course about"></textarea>
          </div>
          {errors.description?.message && (
            <div className="message-error">
              <span className="error-message text-[#FF435A]">{errors.description?.message}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-[14px]">
          <button type="button" className="w-full rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap">
            Save as Draft
          </button>
          <button disabled={mutateCreateCourse.isPending} type="submit" className="cursor-pointer w-full rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap">
            Create Now
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateCoursePage;
