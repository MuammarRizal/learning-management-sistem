import { Link } from "react-router";

function HeaderOverview() {
  return (
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
  );
}

export default HeaderOverview;
