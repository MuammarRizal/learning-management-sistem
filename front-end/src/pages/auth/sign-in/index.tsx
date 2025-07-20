import { Link, useNavigate } from "react-router";
import Navbar from "../../../components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../../utils/zod.schema";
import { useMutation } from "@tanstack/react-query";
import { postSignIn } from "../../../services/auth.service";
import type { SignInType } from "../../../types/auth.type";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "../../../utils/const";

function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: SignInType) => postSignIn(data),
  });

  const onSubmitForm = async (data: SignInType) => {
    try {
      const response = await mutateAsync(data);
      secureLocalStorage.setItem(STORAGE_KEY, response.data);

      if (response.data.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative flex flex-col flex-1 p-[10px]">
      <div className="absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#060A23] -z-10 rounded-[20px]">
        <img
          src="/assets/images/backgrounds/background-glow.png"
          className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
          alt=""
        />
      </div>
      <Navbar />
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col w-[400px] h-fit rounded-[20px] border border-[#262A56] p-[30px] gap-[30px] bg-[#080A2A] m-auto"
      >
        <div>
          <h1 className="font-bold text-[26px] leading-[39px] text-white">
            Welcome Back!
          </h1>
          <p className="text-[#6B6C7F]">Manage your employees easily</p>
        </div>
        <hr className="border-[#262A56]" />
        <div className="relative flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 focus-within:border-[#8661EE] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
          <img
            src="/assets/images/icons/sms-white.svg"
            className="w-6 h-6 flex shrink-0"
            alt="icon"
          />
          <input
            type="email"
            {...register("email")}
            id="email"
            className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]"
            placeholder="Write your email address"
          />
          <p className="text-red-500 text-xs absolute -bottom-5 w-max">
            {errors.email?.message}
          </p>
        </div>

        <div>
          <div className="relative flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 focus-within:border-[#8661EE] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
            <img
              src="/assets/images/icons/key-white.svg"
              className="w-6 h-6 flex shrink-0"
              alt="icon"
            />
            <input
              type="password"
              {...register("password")}
              id="password"
              className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]"
              placeholder="Type your secure password"
            />
            <p className="text-red-500 text-xs absolute -bottom-5 w-max">
              {errors.password?.message}
            </p>
          </div>

          <div className="flex justify-end mt-[25px]">
            <Link
              to="/reset-password"
              className="text-sm leading-[21px] text-[#662FFF] hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </div>
        <hr className="border-[#262A56]" />
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full border p-[14px_20px] text-center font-semibold text-white bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
        >
          Sign In to Manage
        </button>
      </form>
    </div>
  );
}

export default SignIn;
