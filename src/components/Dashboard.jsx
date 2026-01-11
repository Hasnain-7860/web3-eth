import { memo } from "react";
import Wallet from "../../Wallet";
import AdminDashboard from "./AdminDashboard";
import BlackListUsers from "./BlackListUsers";
import DashboardCards from "./DashboardCards";
import Faucet from "./Faucet";
import { BrowserProvider } from "ethers";
import { useWeb3 } from "./Web3Context";

export default function Dashboard() {

    const { loginHandler, account, logout } = useWeb3();

  // const loginhandler =(()=>{
  //   if(!window.ethereum ){
  //     throw new Error ("we are not meetamask")
  //   }
  //   const provider = new BrowserProvider(window.ethereum)
  //   provider.send("eth_requestAccounts",[])
  //    const siner = provider.getsiner()
  // })
 
  return (
    <div className=" min-h-screen bg-[#1B149E] relative overflow-hidden " id="Dashboard">
      <div className="absolute top-40 left-9 w-20 h-20 bg-white/10 rounded-md " />
      <div className="absolute top-120 right-10 w-20 h-20 bg-black/20 rounded-md" />
      {/* <div className="absolute bottom-20 left-1/2 w-24 h-24 bg-black/30 rounded-md" /> */}
     <div className="hidden lg:flex items-center gap-3 absolute right-20 mt-6">
  {!account ? (
    <button
      onClick={loginHandler}
      className="bg-[#08d19f] text-white text-md px-4 py-2 rounded-full"
    >
      Connect Wallet
    </button>
  ) : (
    <>
      <button className="bg-[#08d19f] text-white text-md px-4 py-2 rounded-full cursor-default">
        {account.slice(0, 6)}...{account.slice(-4)}
      </button>

      <button
        onClick={logout}
        className="bg-red-500 text-white text-md px-4 py-2 rounded-full"
      >
        Logout
      </button>
    </>
  )}
</div>

       {/* <Wallet/> */}

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
