import { useState } from "react";
import { ethers } from "ethers";
import { X } from "lucide-react";
import FausetAbi from "../../FausetAbi.json"; 
import toast from "react-hot-toast";

const FAUCET_ADDRESS = "0xe3D880381b623c4b761D9A3dfe4473D70677F97C";

export default function FaucetMint() {
  const [claimed, setClaimed] = useState("0");

  const [qty, setQty] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    try {
      if (!window.ethereum) {
        toast(" install MetaMask");
        return;
      }

      if (!qty || Number(qty) <= 0) {
        toast("pleaase fill Qty...");
        return;
      }

      setLoading(true);

     
      await window.ethereum.request({ method: "eth_requestAccounts" });

    
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

     
      const network = await provider.getNetwork();
      console.log("Chain:", network.chainId.toString());

      if (network.chainId !== 11155111n) {
        alert("Sepolia network pe switch karo");
        setLoading(false);
        return;
      }

    
      const faucet = new ethers.Contract(
        FAUCET_ADDRESS,
        FausetAbi,
        signer,
      );

     
      const amount = ethers.parseUnits(qty, 18);

      console.log("Claiming:", amount.toString());

    
      const tx = await faucet.claimTokens(amount);
      console.log("Tx sent:", tx.hash);

      await tx.wait();
      toast("✅ Tokens claimed successfully");

      setQty("");
    } catch (err) {
      console.error("ERROR:", err);
      alert(
        err?.reason ||
        err?.info?.error?.message ||
        err?.message ||
        "Transaction failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#2D37CA] via-[#2D37CA] to-[#1968C6] p-4 sm:p-6 text-white md:m-7 xl:m-20 rounded-md" id="Balance">
      <h2 className="text-white text-[22px] mb-2">Faucet</h2>
       
      <div className="">
        <div className="rounded-md border border-indigo-500/40 bg-indigo-950 py-3 text-center text-white mb-4">
          <div className="text-[20px] opacity-80">Balance</div>
          <div className="text-[16px] font-semibold">0</div>
        </div>
        <div className="rounded-xl border border-indigo-500/40 bg-indigo-900 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-[18px] tracking-wide">MINT</h3>
            <X className="text-white/70 hover:text-white cursor-pointer" size={18} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 ">
            
               <input
        placeholder="Qty"
        className="rounded-md bg-indigo-700 px-3 py-2 text-sm text-white placeholder-white/70 outline-none h-[38px]"
        value={qty}
        onChange={(e) => {
          const v = e.target.value;
          if (/^\d*\.?\d*$/.test(v)) setQty(v);
        }}
      />

          </div>
          
          <div className="flex justify-center gap-4">
            <button className="rounded-md border border-sky-400 px-6 py-1.5 text-sm text-sky-400 hover:bg-sky-400/10">
              Cancel </button>
            <button
        onClick={handleClaim}
        disabled={loading}
        className="bg-blue-500 px-6 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? "Processing..." : "Claim"}
      </button>
          </div>
        </div>
      </div>
    </div>
  );
}

