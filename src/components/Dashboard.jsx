import DashboardCards from "./DashboardCards";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1b1fc9] relative overflow-hidden">
      {/* <div className="absolute top-10 left-32 w-16 h-16 bg-white/10 rounded-md" />
      <div className="absolute top-40 right-40 w-20 h-20 bg-black/20 rounded-md" />
      <div className="absolute bottom-20 left-1/2 w-24 h-24 bg-black/30 rounded-md" /> */}

    <DashboardCards/>
    </div>
  );
}
