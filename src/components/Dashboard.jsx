import Wallet from "../../Wallet";
import AdminDashboard from "./AdminDashboard";
import BlackListUsers from "./BlackListUsers";
import DashboardCards from "./DashboardCards";
import Faucet from "./Faucet";

export default function Dashboard() {
  return (
    <div className=" min-h-screen bg-[#1B149E] relative overflow-hidden " id="Dashboard">
      <div className="absolute top-40 left-9 w-20 h-20 bg-white/10 rounded-md " />
      <div className="absolute top-120 right-10 w-20 h-20 bg-black/20 rounded-md" />
      {/* <div className="absolute bottom-20 left-1/2 w-24 h-24 bg-black/30 rounded-md" /> */}
      <div className=" hidden  lg:block lg:right-20 lg:mt-6 absolute ">
      {/* <button className="bg-[#08d19f] text-white text-md px-4 py-2 rounded-full">
            Connect Wallet
          </button> */}
          
        <Wallet/>
        </div>
      

    <DashboardCards/>
    <div className="py-10 lg:py-0" id="users">
    <AdminDashboard   />
    </div>
    <div className="py-10 lg:py-0" id="Ban">
    <BlackListUsers/>
    </div>
    <Faucet/>
    </div>
  );
}
