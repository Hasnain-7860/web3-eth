import { useEffect, useState } from "react";
import boypic from "../assets/boypic.png";
import HeaderActions from "./HeaderActions";
import { readContract } from "../../utils/eathers";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import Ban from "./Ban";
import UnblockUser from "./UnblockUser";


export default function BlackListUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const shortAddress = (addr) =>
  addr ? `${addr.slice(0, 3)}...${addr.slice(-4)}` : "";

  const copyAddress = (addr) => {
  navigator.clipboard.writeText(addr);
  toast.success("Address copied");
};


 const fetchBlockedUsers = async () => {
  try {
    setLoading(true);

    const allAddresses = await readContract.getAllContactAddresses();
    const blockedUsers = [];

    for (let addr of allAddresses) {
      const data = await readContract.addressToContactInfo(addr);
      if (!data.exists) continue;

      const isBlocked = await readContract.isContactBlocked(data.uid);
      if (!isBlocked) continue;

      blockedUsers.push({
        name: data.name,
        email: "-",
        lp: "$56.07",
        points: 0,
        image: data.imageUri && data.imageUri !== "" ? data.imageUri : boypic,
        uid: data.uid,
        contactAddress: addr,
      });
    }

    setUsers(blockedUsers);
  } catch (err) {
    console.error("❌ Error fetching blocked users:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-[#2D37CA] to-[#1968C6] p-4 sm:p-6 md:m-7 xl:m-20 rounded-md text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Black List Users</h1>
        <HeaderActions onSearch={setSearch} fetchContacts={fetchBlockedUsers} />
      </div>

      <div className="overflow-x-auto rounded-xl bg-indigo-900">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-[#0E0C69] text-indigo-200">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Uid</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Points</th>
               <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
  {loading ? (
    <tr>
      <td colSpan="5" className="py-10 text-center">
        <div className="flex justify-center items-center gap-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="text-indigo-200">Loading blocked users...</span>
        </div>
      </td>
    </tr>
  ) : filteredUsers.length ? (
    filteredUsers.map((user, i) => (
      <tr key={i} className="bg-[#5743ED] hover:bg-[#6D57FF]">
        <td className="flex items-center gap-3 px-6 py-4">
          <img src={user.image} className="w-10 h-10 rounded-md" />
          {user.name}
        </td>
        <td className="px-6 py-4 text-indigo-200">{user.uid}</td>
       <td className="px-6 py-4">
  <div className="flex items-center gap-2">
    <span>{shortAddress(user.contactAddress)}</span>
    <Copy
      size={16}
      className="cursor-pointer text-gray-500 hover:text-black"
      onClick={() => copyAddress(user.contactAddress)}
    />
  </div>
</td>

        <td className="px-6 py-4">
          <span className="px-2 py-1 rounded bg-red-500">
            {user.points}
          </span>
        </td>
        <td className="px-6 py-4 flex gap-2">
          {/* <button className="px-3 py-1 border rounded hover:bg-blue-500">
            Unblock
          </button> */}
          <UnblockUser
  uid={user.uid}
  onSuccess={() =>
    setUsers((prev) => prev.filter((u) => u.uid !== user.uid))
  }
/>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center py-6 text-indigo-200">
        No blocked users found
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}
