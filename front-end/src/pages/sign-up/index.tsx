import FormSignUp from './form'
import Navbar from '../../components/navbar/Navbar'
import Pricing from '../pricing'

function SignUp() {
  return (
    <div className="relative flex flex-col flex-1 p-[10px]">
        <div className="absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#060A23] -z-10 rounded-[20px]">
            <img src="assets/images/backgrounds/background-glow.png" className="absolute bottom-0 transform -translate-x-1/2 left-1/2" alt="" />
        </div>
        <Navbar />
        <div className="flex items-center justify-center gap-[109px] my-auto">
            <FormSignUp />
            <div className="flex flex-col gap-[30px]">
                <h1 className="font-extrabold text-[46px] leading-[69px] text-white">Sign Up & Enhance <br />Employees Skills</h1>
                <p className="text-lg leading-[32px] text-white">We delivery robust features to anyone <br  />unconditionally so they can grow bigger.</p>
            </div>

            {/* <Pricing /> */}
        </div>
    </div>
  )
}

export default SignUp