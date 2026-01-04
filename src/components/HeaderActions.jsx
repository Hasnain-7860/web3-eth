import { useState } from "react";
import { UserPlus, List, Grid, Search } from "lucide-react";

export default function HeaderActions({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch?.(value);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-sm font-medium">
          <UserPlus size={16} />
          Add Contact
        </button>

        <button className="p-2 rounded-lg bg-blue-500/40 hover:bg-blue-500/60 transition">
          <List size={18} />
        </button>

        <button className="p-2 rounded-lg bg-blue-500/40 hover:bg-blue-500/60 transition">
          <Grid size={18} />
        </button>
      </div>

      <div className="relative w-full sm:w-56">
        <input
          type="text"
          placeholder="Search Users"
          value={search}
          onChange={handleChange}
          className="w-full pl-4 pr-10 py-2 rounded-lg bg-transparent border border-cyan-400 text-sm text-white placeholder:text-cyan-200 outline-none"
        />
        <Search
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-300"
        />
      </div>
    </div>
  );
}
