import { Link } from 'react-router'

function Header() {
  return (
    <>
        <div id="TopBar" className="flex items-center justify-between gap-[30px]">
            <form action="" className="flex items-center w-full max-w-[450px] rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
                <input type="text" name="search" id="search" className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D]" placeholder="Search course, student, other file..." />
                <img src="/assets/images/icons/search-normal.svg" className="w-6 h-6" alt="icon" />
            </form>
            <div className="group relative flex items-center justify-end gap-[14px] cursor-pointer">
                <div className="text-right">
                    <p className="font-semibold">Shayna Angga</p>
                    <p className="text-sm leading-[21px] text-[#838C9D]">Manager</p>
                </div>
                <button type="button" id="profileButton" className="flex shrink-0 w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer">
                    <img src="/assets/images/photos/photo-1.png" className="w-full h-full object-cover" alt="profile photos" />
                </button>
                <div id="ProfileDropdown" className="absolute top-full hidden group-hover:block">
                    <ul className="flex flex-col w-[200px] rounded-[20px] border border-[#CFDBEF] p-5 gap-4 bg-white mt-4">
                        <li className="font-semibold">
                            <Link to="#">My Account</Link>
                        </li>
                        <li className="font-semibold">
                            <Link to="#">Subscriptions</Link>
                        </li>
                        <li className="font-semibold">
                            <Link to="#">Settings</Link>
                        </li>
                        <li className="font-semibold">
                            <Link to="signin.html">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <header className="flex items-center justify-between gap-[30px]">
            <div>
                <h1 className="font-extrabold text-[28px] leading-[42px]">Overview</h1>
                <p className="text-[#838C9D] mt-[1]">Grow your company quickly</p>
            </div>
            <div className="flex items-center gap-3">
                <Link to="#" className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap">
                    Customize
                </Link>
                <Link to="" className="w-fit rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap">
                    Export Data
                </Link>
            </div>
        </header>
    </>
  )
}

export default Header