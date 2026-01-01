import { FiMoreHorizontal } from "react-icons/fi";
import green from "../assets/GreenLine.png";
import color from "../assets/Color.png";
import icon from "../assets/Icon.png";
import { RiRobot2Line } from "react-icons/ri";


export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 p-5 xl:px-20">

      <div className="rounded-xl p-5 pt-10 text-white bg-[linear-gradient(90deg,#2563eb_0%,#3b82f6_27%,#22d3ee_100%)] ">
        <div className="flex justify-between">
          <p className="text-sm md:text-lg xl:text-[22px] ">Total Value Locked</p>
          <h2 className="text-2xl font-semibold">$ 41,741.42</h2>
        </div>
        <div className="flex justify-between">
          <p className="text-sm md:text-lg xl:text-[22px] ">(TVL)</p>
          <span className="text-xs bg-[#3948E3] px-3 py-1.5 rounded">+2453</span>
        </div>

        <div className="flex justify-between items-center mt-10 xl:mt-16">
          <div className="flex gap-2">
            <button className="w-7 h-7 rounded bg-white/20" />
            <button className="w-7 h-7 rounded bg-white/20" />
          </div>
          <button className="text-xs bg-[#3948E3] px-3 py-1.5 rounded">
            Upgrade
          </button>
        </div>
      </div>

        <div className="rounded-xl p-5 text-white bg-[#18127A] relative ">
          
<div className="flex justify-between mb-2">
          <p className="text-sm md:text-lg xl:text-[22px]  mb-2 flex items-center gap-3">Total Factoids <RiRobot2Line /> Issued</p>
          <FiMoreHorizontal className=" opacity-70 text-[20px]" />
          </div>
          <h2 className="text-2xl font-semibold text-cyan-400 py-7 xl:text-[30px] flex items-center gap-3">$ 45,141 
          <span><img className="size-[30px]" src={icon} alt="" /></span></h2>

          <div className="mt-4 ">
            <div className="h-3 bg-white/10 rounded-lg overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                style={{ width: "57%" }}
              />
            </div>
            <p className="text-right text-[14px] opacity-60 mt-1 ">57%</p>
          </div>
        </div>

      <div className="rounded-xl p-5 text-white bg-[linear-gradient(90deg,#2563eb_0%,#3b82f6_27%,#22d3ee_100%)]">
        <div className="flex justify-between mb-2">
          <p className="text-sm md:text-lg xl:text-[22px] ">LP Tokens Issued</p>
          <FiMoreHorizontal className=" opacity-70 text-[20px]" />
        </div>

        <h2 className="text-2xl font-semibold xl:text-[30px] py-7 ">$ 45,141</h2>

        <div className="mt-4">
          <div className="h-3 bg-white/10 rounded-lg overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ width: "57%" }}
            />
          </div>
          <p className="text-right text-[14px] opacity-60 mt-1 text-[#18127A]">57%</p>
        </div>
      </div>

      <div className="rounded-xl p-5 text-white bg-[#18127A] relative">
        
         <div className="flex justify-between mb-2">
        <p className="text-sm md:text-lg xl:text-[22px]  mb-4">Statistics</p>
        <FiMoreHorizontal className=" opacity-70 text-[20px]" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div >
            <p className="font-semibold opacity-90 xl:text-[19px]">Total Users registered:</p>
            <p className=" text-cyan-400 font-semibold pt-2 xl:text-[18px]">423,964</p>
          </div>
          <div>
            <p className="font-semibold opacity-90 xl:text-[19px]">Daily Transactions</p>
            <p className="text-[18px] text-cyan-400 font-semibold pt-2">7,929</p>
          </div>
        </div>

        <div className="flex justify-between items-end mt-6">
          <img src={green} alt="graph" className="h-9 xl:h-16 xl:w-80" />
          <img src={color} alt="legend" className="h-8 xl:h-16" />
        </div>
      </div>

    </div>
  );
}
