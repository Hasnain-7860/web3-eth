import { useState } from "react";
import boypic from "../assets/boypic.png";
import HeaderActions from "./HeaderActions";

const initialUsers = [
  { name: "Noemi Roberts", email: "noe@gmail.com", lp: "$56.07", points: 0, image: boypic, active: false },
  { name: "John Doe", email: "john@gmail.com", lp: "$100.00", points: 50, image: boypic, active: true },
];

export default function BlackListUsers() {
  const [search, setSearch] = useState("");
  const [users] = useState(initialUsers);

  // ✅ Sirf ACTIVE users
  const filteredUsers = users.filter(
    (user) =>
      user.active &&
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-gradient-to-br from-[#2D37CA] to-[#1968C6] p-4 sm:p-6 md:m-7 xl:m-20 rounded-md text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-semibold">Black List Users</h1>
        <HeaderActions onSearch={setSearch} />
      </div>

      <div className="overflow-x-auto rounded-xl bg-indigo-900">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-[#0E0C69] text-indigo-200">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">LP</th>
              <th className="px-6 py-3">Points</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className="bg-[#5743ED] hover:bg-[#6D57FF]">
                  <td className="flex items-center gap-3 px-6 py-4">
                    <img src={user.image} className="w-10 h-10 rounded-md" />
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-indigo-200">{user.email}</td>
                  <td className="px-6 py-4">{user.lp}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded ${user.points === 0 ? "bg-red-500" : "bg-green-500"}`}>
                      {user.points}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="px-3 py-1 border rounded hover:bg-blue-500">Edit</button>
                    <button className="px-3 py-1 border rounded hover:bg-red-500">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-indigo-200">
                  No active users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
