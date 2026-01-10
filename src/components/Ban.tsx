import { useEffect, useState } from "react";
import { readContract, writesContract } from "../../utils/eathers";
import toast from "react-hot-toast";
import { useWeb3 } from "./Web3Context";

export default function Ban({ uid }) {
  const { signer } = useWeb3();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const fetchBlockStatus = async () => {
    if (!uid) return;
    try {
      const blocked = await readContract.blockedContacts(uid);
      setIsBlocked(blocked);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlockStatus();
  }, [uid]);

  const handleAction = async () => {
    if (!uid) return toast.error("UID is missing!");
    if (!signer) return toast.error("Wallet not connected!");

    const writeContract = writesContract(signer);
    const prevState = isBlocked;

    setIsBlocked(!prevState);
    setLoading(true);
    setOpen(false);

    try {
      let tx;
      if (prevState) {
        tx = await writeContract.unblockContact(uid);
        toast.success("User unblocked successfully!");
      } else {
        tx = await writeContract.blockContact(uid);
        toast.success("User banned successfully!");
      }
      await tx.wait();
    } catch (err) {
      console.error(err);
      setIsBlocked(prevState);
      toast.error("Transaction failed!");
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`px-3 py-1 rounded text-white ${
          isBlocked ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {isBlocked ? "Unblock" : "Ban"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-gradient-to-br from-[#0b1026] to-[#111827] border border-blue-900/40 rounded-lg w-[320px] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-white">
              {isBlocked ? "Unblock User?" : "Ban User?"}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              {isBlocked
                ? "User will be allowed again."
                : "This action cannot be undone."}
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm rounded-md border border-gray-600 text-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleAction}
                disabled={loading}
                className={`px-4 py-2 text-sm rounded-md text-white ${
                  isBlocked
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } disabled:opacity-50`}
              >
                {loading
                  ? "Processing..."
                  : isBlocked
                  ? "Yes, Unblock"
                  : "Yes, Ban"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
