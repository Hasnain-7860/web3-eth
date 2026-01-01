import { useState } from "react";
import {
  HiHome,
  HiUsers,
  HiBan,
  HiCurrencyDollar,
  HiMenu,
} from "react-icons/hi";

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
          bg-gradient-to-b from-[#1d1c6b] to-[#241fa3]
          text-white transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="px-6 py-5 text-lg font-semibold">
          Dashboard
        </div>

        <nav className="px-3 text-sm space-y-1">
          <p className="px-4 py-2 flex items-center gap-3 rounded-md bg-white/15">
            <HiHome className="text-lg" />
            Dashboard
          </p>

          <p className="mt-4 px-4 text-[11px] tracking-wider text-white/70">
            ADMIN CONTROLS
          </p>

          <p className="px-4 py-2 flex items-center gap-3 rounded-md hover:bg-white/10 cursor-pointer">
            <HiUsers className="text-lg" />
            Users
          </p>

          <p className="mt-4 px-4 text-[11px] tracking-wider text-white/70">
            BLACK LIST
          </p>

          <p className="px-4 py-2 flex items-center gap-3 rounded-md hover:bg-white/10 cursor-pointer">
            <HiBan className="text-lg" />
            Ban
          </p>

          <p className="mt-4 px-4 text-[11px] tracking-wider text-white/70">
            FAUCET STATS
          </p>

          <p className="px-4 py-2 flex items-center gap-3 rounded-md hover:bg-white/10 cursor-pointer">
            <HiCurrencyDollar className="text-lg" />
            Balance
          </p>
        </nav>
      </aside>
    </>
  );
}
