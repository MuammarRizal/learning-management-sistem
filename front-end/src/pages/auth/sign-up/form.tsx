import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../../../utils/zod.schema';
import type { SignUpData } from './sign-up.type';

function FormSignUp() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(signUpSchema)
    })

    const onSubmitForm = (data: SignUpData) => {
        console.log({data})
    }
    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col w-[400px] h-fit rounded-[20px] border border-[#262A56] p-[30px] gap-[30px] bg-[#080A2A]">
            <div>
                <h2 className="font-bold text-[26px] leading-[39px] text-white">Sign Up</h2>
                <p className="text-[#6B6C7F]">Manage your employees easily</p>
            </div>
            <hr className="border-[#262A56]" />
            <div className="relative flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 focus-within:border-[#8661EE] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
                <img src="assets/images/icons/user-octagon-white.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                <input type="text" id="name" className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]" placeholder="Write your complete name" {...register('name')}/>
                <p className='text-red-500 text-xs absolute -bottom-5 w-max'>{errors.name?.message}</p>
            </div>
            <div className="relative flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 focus-within:border-[#8661EE] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
                <img src="assets/images/icons/sms-white.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                <input type="email" id="email" className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]" placeholder="Write your email address" {...register('email')}/>
                <p className='text-red-500 text-xs absolute -bottom-5 w-max'>{errors.email?.message}</p>
            </div>
            <div className="relative flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 focus-within:border-[#8661EE] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
                <img src="assets/images/icons/key-white.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                <input type="password" id="password" className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]" placeholder="Type your secure password" {...register('password')} />
                <p className='text-xs absolute -bottom-5 w-max text-red-500'>{errors.password?.message}</p>
            </div>
            <hr className="border-[#262A56]" />
            <button type="submit" className="w-full rounded-full border p-[14px_20px] text-center font-semibold text-white bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]">
                Sign Up Now
            </button>
        </form>            
    )
}

export default FormSignUp