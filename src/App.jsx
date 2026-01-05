import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { contract } from "../utils/eathers";


export default function App() {
  const contractInfo=(async()=>{
    const result=await contract.decimals()
    
console.log( result,"result")
  })

  useEffect(()=>{
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
