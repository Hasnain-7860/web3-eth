import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import {readContract, writesContract } from "../utils/eathers";
import { useSwitchActiveWalletChain } from "thirdweb/react";
import { sepolia, polygon, mainnet } from "thirdweb/chains";


export default function App() {
  const switchChain = useSwitchActiveWalletChain();
  const contractInfo=(async()=>{
    const result=await readContract.listeners()
     const results =await writesContract.listeners()
    
console.log( results,"result")
  })

  useEffect(()=>{
    switchChain(sepolia)
contractInfo()
  },[])
  return (
   <div className="min-h-screen bg-[#0f172]">
  <Sidebar />
  <main className="transition-all duration-300 lg:ml-64">
   <Dashboard/>
  </main>
</div>

  );
}
