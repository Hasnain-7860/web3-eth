import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";


export default function App() {
  return (
   <div className="min-h-screen bg-[#0f172]">
  <Sidebar />
  <main className="transition-all duration-300 lg:ml-64">
   <Dashboard/>
  </main>
</div>

  );
}
