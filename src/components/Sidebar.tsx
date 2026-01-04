import { useState } from "react";
import { HiHome, HiMenu } from "react-icons/hi";
import { LuUsers } from "react-icons/lu";
import { FiDollarSign } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  

  const linkClass =
    "flex items-center justify-between w-[85%] ml-4 px-4 py-3 rounded-md hover:bg-white/10 transition";

  return (
    <>
      {/* Mobile Menu Button */}
      <button
  className="fixed top-4 left-4 z-[60] lg:hidden text-white bg-transparent"
  onClick={() => setOpen(true)}
>
  <HiMenu size={26} />
</button>


      {/* Overlay */}
     {open && (
  <div
    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
    onClick={() => setOpen(false)}
  />
)}


      {/* Sidebar */}
      <aside
  className={`
    fixed top-0 left-0 h-full w-64
    z-50
    bg-gradient-to-b from-[#1d1c6b] to-[#18127A]
    text-white
    transition-transform duration-300 ease-in-out
    ${open ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
>

        <nav className="mt-20 text-sm space-y-1">
          {/* Dashboard */}
          <a
            href="#Dashboard"
            onClick={() => setOpen(false)}
            className="block"
          >
            <div className="flex items-center gap-3 w-[85%] ml-4 px-4 py-3 rounded-md bg-[#3A3DD1]">
              <HiHome />
              <span>Dashboard</span>
            </div>
          </a>

          <p className="px-11 py-3 text-xs text-white/80">- Statistics</p>

          {/* Section */}
          <p className="mt-4 px-4 py-2 text-[11px] tracking-wider bg-white/15">
            ADMIN CONTROLS
          </p>

          <a href="#users" onClick={() => setOpen(false)} className={linkClass}>
            <div className="flex items-center gap-3">
              <LuUsers />
              <span>Users</span>
            </div>
            <IoIosArrowForward />
          </a>

          <p className="mt-4 px-4 py-2 text-[11px] tracking-wider bg-white/15">
            BLACK LIST
          </p>

          <a href="#Ban" onClick={() => setOpen(false)} className={linkClass}>
            <div className="flex items-center gap-3">
              <LuUsers />
              <span>Ban</span>
            </div>
            <IoIosArrowForward />
          </a>

          <p className="mt-4 px-4 py-2 text-[11px] tracking-wider bg-white/15">
            FAUCET STATS
          </p>

          <a href="#Balance" onClick={() => setOpen(false)} className={linkClass}>
            <div className="flex items-center gap-3">
              <FiDollarSign />
              <span>Balance</span>
            </div>
            <IoIosArrowForward />
          </a>
        </nav>
      </aside>
    </>
  );
}
