import { useEffect, useState } from "react";
import boypic from "../assets/boypic.png";
import HeaderActions from "./HeaderActions";
import { readContract, list2 } from "../../utils/eathers";

export default function BlackListUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const fetchBlockedUsers = async () => {
    try {
      // 🔥 BLOCKED ADDRESSES
      const blockedAddresses = await list2();

      console.log("🚫 BLOCKED ADDRESSES:", blockedAddresses);

      const formattedUsers = await Promise.all(
        blockedAddresses.map(async (addr) => {
          const data = await readContract.addressToContactInfo(addr);

          if (!data.exists) return null;

          return {
            name: data.name,
            email: data.email || "-", // agar chain me nahi h
            lp: "$56.07",
            points: data.points || 0,
            image:
              data.imageUri && data.imageUri !== ""
                ? data.imageUri
                : boypic,
            uid: data.uid,
            contactAddress: addr,
          };
        })
      );

      const finalData = formattedUsers.filter(Boolean);

      console.log("✅ BLOCKED USERS DATA:", finalData);

      setUsers(finalData);
    } catch (err) {
      console.error("❌ Error fetching blocked users:", err);
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
        <table className="w-full min-w-[600px]">
          <thead className="bg-[#0E0C69] text-indigo-200">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">LP</th>
              <th className="px-6 py-3">Points</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length ? (
              filteredUsers.map((user, i) => (
                <tr key={i} className="bg-[#5743ED] hover:bg-[#6D57FF]">
                  <td className="flex items-center gap-3 px-6 py-4">
                    <img src={user.image} className="w-10 h-10 rounded-md" />
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-indigo-200">{user.email}</td>
                  <td className="px-6 py-4">{user.lp}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-red-500">
                      {user.points}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-indigo-200">
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
