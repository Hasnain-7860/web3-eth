import { useState } from "react";
import boypic from "../assets/boypic.png";
import { Search, Plus, Minus } from "lucide-react";
import HeaderAction from "./HeaderAction";

const users = [
  { name: "Luke Ivory", image: boypic, tvl: "$20000", invoice: "#46894", token: "$56.07", points: 10000 },
  { name: "Andy King", image: boypic, tvl: "$20000", invoice: "#76894", token: "$88.00", points: 2000 },
  { name: "Irene Collins", image: boypic, tvl: "$20000", invoice: "#75844", token: "$84.00", points: 0 },
  { name: "Sonia Shaw", image: boypic, tvl: "$20000", invoice: "#76844", token: "$110.00", points: 1000 },
  { name: "Ryan Collins", image: boypic, tvl: "$20000", invoice: "#89891", token: "$108.09", points: 100 },
  { name: "Laurie Fox", image: boypic, tvl: "$20000", invoice: "#66894", token: "$126.04", points: 4000 },
];

export default function AdminDashboard() {
  const [openUserIndex, setOpenUserIndex] = useState(null);
const [activeRow, setActiveRow] = useState(null);
const [search, setSearch] = useState("");
const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
);



const toggleView = (index, e) => {
  if (e) e.stopPropagation();

  setActiveRow(index);
  setOpenUserIndex(openUserIndex === index ? null : index);
};


  return (
    <div className="bg-gradient-to-br from-[#2D37CA] via-[#2D37CA] to-[#1968C6] p-4 sm:p-6 text-white md:m-7 xl:m-20 rounded-md">
    
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
  <h1 className="text-xl font-semibold text-white">
    Admin Controls
  </h1>

  <HeaderAction onSearch={setSearch} />
</div>


      
      <div className="bg-[#0E0C69] rounded-xl overflow-hidden">
        
        <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-6 py-3 gap-6 text-sm text-indigo-300">
          <div>Users</div>
          <div>TVL</div>
          <div>Invoice</div>
          <div>LP Token</div>
          <div>Points</div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-6 text-indigo-300">
            No user found
          </div>
        )}
        {filteredUsers.map((user, i) => (
          <div key={i} className="border-t border-indigo-800">
           
            <div
               onClick={() => {
    setActiveRow(i);
    setOpenUserIndex(null); 
  }}
             className={`hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center px-6 py-4 
hover:bg-[#5743ED] transition
${activeRow === i ? "bg-[#5743ED]" : ""}`}

            >
              <div className="flex items-start gap-3">
                <img src={user.image} alt={user.name} className="w-10 h-10 rounded-md object-cover" />
                <div>
                  <p className="font-medium leading-tight">{user.name}</p>
                  <div className="flex gap-2 text-xs mt-1">
                    <button className="text-blue-400">Edit</button>
                    <button className="text-red-400">Delete</button>
                    <button className="text-green-400" onClick={(e) => toggleView(i, e)}>
                      View
                    </button>
                    <button className="text-yellow-400">Ban</button>
                  </div>
                </div>
              </div>
              <div>{user.tvl}</div>
              <div>{user.invoice}</div>
              <div>{user.token}</div>
              <div className="flex items-center gap-2">
                <button className="bg-indigo-800 p-1 rounded">
                  <Minus size={14} />
                </button>
                <span className="bg-indigo-700 px-3 py-1 rounded text-sm">{user.points}</span>
                <button className="bg-indigo-800 p-1 rounded">
                  <Plus size={14} />
                </button>
              </div>
            </div>

           
            <div
              onClick={() => {
    setActiveRow(i);
    setOpenUserIndex(null); 
  }}
              className={`sm:hidden px-6 py-4 border-t border-indigo-800 cursor-pointer ${
                activeRow === i ? "bg-indigo-600/40" : ""
              }`}
            >
              <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                <img src={user.image} alt={user.name} className="w-10 h-10 rounded-md object-cover" />
                <div className="col-span-2 font-medium">{user.name}</div>
                <div>
                  <p className="text-indigo-300 text-xs">TVL</p>
                  {user.tvl}
                </div>
                <div>
                  <p className="text-indigo-300 text-xs">Invoice</p>
                  {user.invoice}
                </div>
                <div>
                  <p className="text-indigo-300 text-xs">LP Token</p>
                  {user.token}
                </div>
                <div>
                  <p className="text-indigo-300 text-xs">Points</p>
                  {user.points}
                </div>
              </div>
              <div className="flex gap-4 text-xs pt-3">
                <button className="text-blue-400">Edit</button>
                <button className="text-red-400">Delete</button>
                <button className="text-green-400" onClick={(e) => toggleView(i, e)}>
                  View
                </button>
                <button className="text-yellow-400">Ban</button>
              </div>
            </div>

            {openUserIndex === i && (
              <div className="bg-[#0E0C69] px-6 py-5 border-t border-indigo-400">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[#5743ED] rounded-xl p-4">
                    <h3 className="font-semibold mb-3">Recent Activities</h3>
                    <ul className="text-sm space-y-2">
                      <li className="flex justify-between">
                        <span>Transaction</span>
                        <span>2 min ago</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Refer a friend</span>
                        <span>14:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Join community</span>
                        <span>16:00</span>
                      </li>
                      <li>Deposit</li>
                    </ul>
                    <button className="mt-3 text-sm">View All →</button>
                  </div>

                 
                  <div className="bg-[#5743ED] rounded-xl p-4">
                    <div className="flex justify-between mb-3">
                      <h3 className="font-semibold">Wallet Balance</h3>
                      <span className="font-bold">$295</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-indigo-700 p-3 rounded">
                        <p className="text-xs text-indigo-200">Received</p>
                        <p>$97.99</p>
                      </div>
                      <div className="bg-indigo-700 p-3 rounded">
                        <p className="text-xs text-indigo-200">Spent</p>
                        <p>$53.00</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button className="bg-indigo-800 px-4 py-2 rounded text-sm">View Details</button>
                      <button className="bg-cyan-400 text-black px-4 py-2 rounded text-sm">
                        Pay Now $29.51
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
