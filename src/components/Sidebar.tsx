import { useState } from "react";
import { HiHome, HiMenu } from "react-icons/hi";
import { LuUsers } from "react-icons/lu";
import { FiDollarSign } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const closeSidebar = () => setOpen(false);

  // 🔥 CLASS FUNCTION (SIZE FIXED)
  const menuClass = (name:any) =>
    `px-4 py-3 flex items-center justify-between w-[85%] ml-4 rounded-md
     text-base xl:text-[20px] transition-all
     ${
       active === name
         ? "bg-[#3A3DD1]"
         : "hover:bg-white/10"
     }`;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden text-white"
        onClick={() => setOpen(true)}
      >
        <HiMenu size={26} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50
          bg-gradient-to-b from-[#1d1c6b] to-[#18127A]
          text-white transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <nav className="text-sm space-y-1 mt-20">
          {/* Dashboard */}
          <a
            href="#Dashboard"
            onClick={() => {
              setActive("Dashboard");
              closeSidebar();
            }}
          >
            <button className={menuClass("Dashboard")}>
              <span className="flex items-center gap-3">
                <HiHome />
                Dashboard
              </span>
              <IoIosArrowForward />
            </button>
          </a>

          <p className="px-11 py-3 flex items-center gap-3 rounded-md xl:text-[16px]">- Statistics</p>

          <p className="mt-4 px-4 text-[11px] py-2 tracking-wider bg-white/15 xl:text-[15px]">
            ADMIN CONTROLS
          </p>

          {/* Users */}
          <a
            href="#users"
            onClick={() => {
              setActive("Users");
              closeSidebar();
            }}
          >
            <button className={`${menuClass("Users")} mt-1`}>

              <span className="flex items-center gap-3 ">
                <LuUsers className="text-lg" />
                Users
              </span>
              <IoIosArrowForward />
            </button>
          </a>

          <p className="mt-4 px-4 text-[11px] py-2 tracking-wider bg-white/15 xl:text-[15px]">
            BLACK LIST
          </p>

          {/* Ban */}
          <a
            href="#Ban"
            onClick={() => {
              setActive("Ban");
              closeSidebar();
            }}
          >
            <button className={`${menuClass("Ban")} mt-1`}>
              <span className="flex items-center gap-3">
                <LuUsers className="text-lg" />
                Ban
              </span>
              <IoIosArrowForward />
            </button>
          </a>

          <p className="mt-4 px-4 text-[11px] py-2 tracking-wider bg-white/15 xl:text-[15px]">
            FAUCET STATS
          </p>

          {/* Balance */}
          <a
            href="#Balance"
            onClick={() => {
              setActive("Balance");
              closeSidebar();
            }}
          >
            <button className={`${menuClass("Balance")} mt-1`}>
              <span className="flex items-center gap-3">
                <FiDollarSign className="text-lg" />
                Balance
              </span>
              <IoIosArrowForward />
            </button>
          </a>
        </nav>
      </aside>
    </>
  );
}             