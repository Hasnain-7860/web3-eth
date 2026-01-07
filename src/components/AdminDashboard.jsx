import { useEffect, useState } from "react";
import boypic from "../assets/boypic.png";
import { Search, Plus, Minus } from "lucide-react";
import HeaderAction from "./HeaderAction";
import { list,  readContract } from "../../utils/eathers";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import Ban from "./Ban";

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
  // const users = readContract.getAllUsers();
const [activeRow, setActiveRow] = useState(null);
 const [contacts, setContacts] = useState([]); 
const [search, setSearch] = useState("");
const filteredUsers = contacts.filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
);
const shortAddress = (addr) =>
  addr ? `${addr.slice(0, 3)}...${addr.slice(-4)}` : "";

const copyAddress = (addr) => {
  navigator.clipboard.writeText(addr);
  toast.success("Address copied");
};

const  fetchContacts = async () => {
    try {
      const addresses = await readContract.getAllContactAddresses();

      const formattedContacts = await Promise.all(
        addresses.map(async (addr) => {
          const data = await readContract.addressToContactInfo(addr);

          if (!data.exists) return null;

          return {
            name: data.name,
            imageUrl: data.imageUri && data.imageUri !== "" ? data.imageUri : boypic,
            uid: data.uid,
            contactAddress: data.contactAddress,
            invoice: "#46894",
            token: "$56.07",
            points: 1000,
          };
        })
      );

      const finalData = formattedContacts.filter(Boolean);

      console.log("✅ CONTRACT CONTACTS:", finalData);

      setContacts(finalData);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };


useEffect(() => {
   fetchContacts();
}, []);









const toggleView = (index, e) => {
  if (e) e.stopPropagation();

  setActiveRow(index);
  setOpenUserIndex(openUserIndex === index ? null : index);
};


  return (
    <div className="bg-gradient-to-br from-[#2D37CA] via-[#2D37CA] to-[#1968C6] p-4 sm:p-6 text-white md:m-7 xl:m-20 rounded-md  " >
    
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
  <h1 className="text-xl font-semibold text-white">
    Admin Controls
  </h1>

  <HeaderAction onSearch={setSearch} fetchContacts={fetchContacts} />
</div>


      
      <div className="bg-[#0E0C69] rounded-xl overflow-hidden">
        
        <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-6 py-3 gap-6 text-sm text-indigo-300">
          <div>Users</div>
          <div>Uid</div>
          <div>Address</div>
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
 transition
${activeRow === i ? "bg-[#5743ED]" : ""}`}

            >
              <div className="flex items-start gap-3">
                <img src={user.imageUrl} alt={user.name} className="w-10 h-10 rounded-md object-cover" />
                <div>
                  <p className="font-medium leading-tight">{user.name}</p>
                  <div className="flex gap-2 text-xs mt-1">
                    <button className="text-[#FFFFFF]">Edit</button>
                    <button className="text-[#EDE0E0]">Delete</button>
                    <button className="text-[#67E9E9]" onClick={(e) => toggleView(i, e)}>
                      View
                    </button>
                    <Ban  uid={user.uid} />
                  </div>
                </div>
              </div>
              <div>{user.uid}</div>
             <div className="flex items-center gap-2">
            <span>{shortAddress(user.contactAddress)}</span>
             <Copy
               size={16}
               className="cursor-pointer text-gray-500 hover:text-black"
               onClick={() => copyAddress(user.contactAddress)}
                />
                </div>
              <div>{user.token}</div>
              <div className="flex items-center gap-2">
                <button className="bg-indigo-800 p-1 rounded-full hover:bg-indigo-600">
                  <Minus size={14} />
                </button>
                <div className="bg-indigo-700 w-[70px] rounded-md ">
                <span className="flex items-center justify-center  py-1 rounded text-sm ">{user.points}</span>
                </div>
                <button className="bg-indigo-800 p-1 rounded-full hover:bg-indigo-600">
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
                <img src={user.imageUrl} alt={user.name} className="w-10 h-10 rounded-md object-cover" />
                <div className="col-span-2 font-medium">{user.name}</div>
                <div>
                  <p className="text-indigo-300 text-xs">TVL</p>
                  {user.tvl}
                </div>
                <div>
                  <p className="text-indigo-300 text-xs">Address</p>
                  <div className="flex items-center gap-2">
            <span>{shortAddress(user.contactAddress)}</span>
             <Copy
               size={16}
               className="cursor-pointer text-gray-500 hover:text-black"
               onClick={() => copyAddress(user.contactAddress)}
                />
                </div>
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
                <Ban  uid={user.uid}/>
              </div>
            </div>

            {openUserIndex === i && (
              <div className="bg-[#0E0C69] px-6 py-5 border-t border-indigo-400">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#5743ED] rounded-xl p-5 text-white w-full ">
  <div className="flex justify-between items-start mb-4">
    <h3 className="text-base font-medium">Recent Activities</h3>
    <button className="text-white text-xl font-bold">...</button>
  </div>

  <ul className="space-y-3 text-sm">
    <li className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
        <span>Transaction</span>
      </div>
      <span className="text-xs text-gray-200">2 min ago</span>
    </li>
    <li className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
        <span>Refer a friend</span>
      </div>
      <span className="text-xs text-gray-200">14:00</span>
    </li>
    <li className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
        <span>Join community</span>
      </div>
      <span className="text-xs text-gray-200">16:00</span>
    </li>
    <li className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
        <span>Deposit</span>
      </div>
      <span className="text-xs text-gray-200">—</span>
    </li>
  </ul>

  <div className="mt-5 text-center flex flex-col  ">
    <button className="text-[15px] flex items-center justify-center gap-1 text-white bg-[#2d2471] hover:bg-[#6C5AF1]">
      View All <span className="text-[30px]">→</span>
    </button>
  </div>
</div>



                 
                 <div className="bg-[#5743ED] rounded-xl p-4 text-white w-full ">
  <div className="flex justify-between items-center mb-4">
    <h3 className="font-medium text-sm opacity-90">Wallet Balance</h3>
    <span className="font-semibold text-lg">$295</span>
  </div>

  <div className="grid grid-cols-2 gap-3 mb-4">
    <div className="bg-[#6C5AF1] rounded-lg p-3 text-center">
      <p className="text-xs opacity-80 mb-1">Received</p>
      <p className="font-semibold">$97.99</p>
    </div>

    <div className="bg-[#6C5AF1] rounded-lg p-3 text-center">
      <p className="text-xs opacity-80 mb-1">Spent</p>
      <p className="font-semibold">$53.00</p>
    </div>
  </div>

  <div className="flex items-center gap-2 mb-3">
    <span className="bg-black/70 text-[10px] px-2 py-0.5 rounded-full">
      Pending
    </span>
  </div>

  <div className="flex justify-between items-center text-sm mb-4">
    <div>
      <p className="opacity-90">USDC</p>
      <p className="text-xs opacity-70">DeFi</p>
    </div>
    <span className="font-medium">$15.66</span>
  </div>

  <div className="flex gap-3">
    <button className="bg-[#3E32B8] px-4 py-2 rounded-md text-xs font-medium">
      View Details
    </button>

    <button className="bg-cyan-400 px-4 py-2 rounded-md text-xs font-semibold text-black">
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
