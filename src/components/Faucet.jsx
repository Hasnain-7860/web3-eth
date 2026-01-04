import { X } from "lucide-react";

export default function FaucetMint() {
  return (
    <div className="bg-gradient-to-br from-[#2D37CA] via-[#2D37CA] to-[#1968C6] p-4 sm:p-6 text-white md:m-7 xl:m-20 rounded-md">
      <div className="w-full  rounded-xl bg-gradient-to-b from-indigo-900 to-indigo-800 p-4 shadow-xl">
        <h2 className="text-white text-sm mb-2">Faucet</h2>
        <div className="rounded-md border border-indigo-500/40 bg-indigo-950 py-3 text-center text-white mb-4">
          <div className="text-sm opacity-80">Balance</div>
          <div className="text-lg font-semibold">0</div>
        </div>
        <div className="rounded-xl border border-indigo-500/40 bg-indigo-900 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-sm tracking-wide">MINT</h3>
            <X className="text-white/70 hover:text-white cursor-pointer" size={18} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input
              placeholder="Assets"
              className="rounded-md bg-indigo-700 px-3 py-2 text-sm text-white placeholder-white/70 outline-none"
            />
            <input
              placeholder="Qty"
              className="rounded-md bg-indigo-700 px-3 py-2 text-sm text-white placeholder-white/70 outline-none"
            />
          </div>

          <input
            placeholder="To Address"
            className="w-full rounded-md bg-indigo-700 px-3 py-2 text-sm text-white placeholder-white/70 outline-none mb-5"
          />
          <div className="flex justify-center gap-4">
            <button className="rounded-md border border-sky-400 px-6 py-1.5 text-sm text-sky-400 hover:bg-sky-400/10">
              Cancel
            </button>
            <button className="rounded-md bg-blue-500 px-6 py-1.5 text-sm text-white hover:bg-blue-600">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
