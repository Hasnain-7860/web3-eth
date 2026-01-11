import { useState } from "react";
import { writesContract } from "../../utils/eathers";
import toast from "react-hot-toast";
import { useWeb3 } from "./Web3Context";

export default function UnblockUser({ uid, onSuccess }) {
  const { signer } = useWeb3();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUnblock = async () => {
    if (!uid) return toast.error("UID missing");
    if (!signer) return toast.error("Wallet not connected");

    try {
      setLoading(true);
      const contract = writesContract(signer);
      const tx = await contract.unblockContact(uid);
      await tx.wait();

      toast.success("User unblocked successfully!");
      onSuccess && onSuccess();
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed");
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
      >
        Unblock
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#111827] p-5 rounded-lg w-[320px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-white">
              Unblock User?
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              User will be allowed again.
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded text-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleUnblock}
                disabled={loading}
                className="px-4 py-2 bg-green-500 rounded text-white disabled:opacity-50"
              >
                {loading ? "Processing..." : "Yes, Unblock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
