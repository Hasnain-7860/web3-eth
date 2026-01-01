import { FiMoreHorizontal } from "react-icons/fi";
import green from "../assets/GreenLine.png";
import color from "../assets/Color.png";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

      <div className="rounded-xl p-5 text-white bg-gradient-to-br from-blue-600 to-cyan-400">
        <div className="flex justify-between">
          <p className="text-sm">Total Value Locked (TVL)</p>
          <span className="text-xs bg-blue-500/30 px-2 py-1 rounded">+2453</span>
        </div>

        <h2 className="text-2xl font-semibold mt-4">$ 41,741.42</h2>

        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            <button className="w-7 h-7 rounded bg-white/20" />
            <button className="w-7 h-7 rounded bg-white/20" />
          </div>
          <button className="text-xs bg-blue-600 px-3 py-1.5 rounded">
            Upgrade
          </button>
        </div>
      </div>

      <div className="rounded-xl p-5 text-white bg-[#0b0f3a] relative">
        <FiMoreHorizontal className="absolute top-4 right-4 opacity-70" />

        <p className="text-sm mb-2">Total Factoids 🕷 Issued</p>
        <h2 className="text-2xl font-semibold text-cyan-400">$ 45,141</h2>

        <div className="mt-4">
          <div className="h-2 bg-white/10 rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ width: "57%" }}
            />
          </div>
          <p className="text-right text-xs opacity-60 mt-1">57%</p>
        </div>
      </div>

      <div className="rounded-xl p-5 text-white bg-gradient-to-br from-blue-600 to-cyan-400">
        <div className="flex justify-between mb-2">
          <p className="text-sm">LP Tokens Issued</p>
          <FiMoreHorizontal />
        </div>

        <h2 className="text-2xl font-semibold">$ 45,141</h2>

        <div className="mt-4">
          <div className="h-2 bg-white/10 rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ width: "57%" }}
            />
          </div>
          <p className="text-right text-xs opacity-60 mt-1">57%</p>
        </div>
      </div>

      <div className="rounded-xl p-5 text-white bg-[#0b0f3a] relative">
        <FiMoreHorizontal className="absolute top-4 right-4 opacity-70" />

        <p className="text-sm mb-4">Statistics</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="opacity-60">Total Users</p>
            <p className="text-cyan-400 font-semibold">423,964</p>
          </div>
          <div>
            <p className="opacity-60">Daily Transactions</p>
            <p className="text-purple-400 font-semibold">7,929</p>
          </div>
        </div>

        <div className="flex justify-between items-end mt-6">
          <img src={green} alt="graph" className="h-10" />
          <img src={color} alt="legend" className="h-6" />
        </div>
      </div>

    </div>
  );
}
