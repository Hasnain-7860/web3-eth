import { useState } from "react";
import {
  HiHome,
  HiCurrencyDollar,
  HiMenu,
} from "react-icons/hi";
import { LuUsers } from "react-icons/lu";
import { FiDollarSign } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";




export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 lg:hidden text-white"
        onClick={() => setOpen(true)}
      >
        <HiMenu size={26} />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50
          bg-gradient-to-b from-[#1d1c6b] to-[#18127A]
          text-white transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        

        <nav className="  text-sm space-y-1 mt-20">
          <button className="px-2 py-3 flex w-[85%] ml-4 gap-14 items-center gap-3 rounded-md bg-[#3A3DD1] xl:text-[20px]">
          <p className="  flex items-center gap-3 rounded-md  xl:text-[20px] ">
            <HiHome />
            Dashboard
          </p>
          </button>
          <p className="px-11  py-3 flex items-center gap-3 rounded-md xl:text-[16px]">- Statistics</p>

          <p className="mt-4 px-4 text-[11px] py-2 tracking-wider text-white/100 xl:text-[15px] bg-white/15 ">
            ADMIN CONTROLS
          </p>
<button className="flex items-center  w-[85%] ml-4 gap-14  hover:bg-white/10 cursor-pointer rounded-md ">
          <p className="px-4 py-3 flex items-center gap-3 ">
            <LuUsers className="text-lg" />
            Users 
          </p>
           <IoIosArrowForward />
          </button>

          <p className="mt-4 px-4 text-[11px] py-2 tracking-wider text-white/100 xl:text-[15px]  bg-white/15">
            BLACK LIST
          </p>

          <button className="flex items-center  w-[85%] ml-4 gap-14  hover:bg-white/10 cursor-pointer rounded-md ">
          <p className="px-4 py-3 flex items-center gap-3 ">
            <LuUsers className="text-lg" />
            Ban 
          </p>
           <IoIosArrowForward />
          </button>

          <p className="mt-4 px-4 text-[11px] py-2 tracking-wider text-white/100 xl:text-[15px]  bg-white/15">
            FAUCET STATS
          </p>

          
          <button className="flex items-center  w-[85%] ml-4 gap-14  hover:bg-white/10 cursor-pointer rounded-md ">
          <p className="px-4 py-3 flex items-center gap-3 ">
            <FiDollarSign className="text-lg" />
            Balance 
          </p>
           <IoIosArrowForward />
          </button>
        </nav>
      </aside>
    </>
  );
}
