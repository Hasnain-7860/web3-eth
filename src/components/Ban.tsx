import { useEffect, useState } from "react";
import { writeContract, readContract, getSignerAddress } from "../../utils/eathers";
import toast from "react-hot-toast";

export default function Ban({ uid }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  // 🔹 check block status
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

    setLoading(true);
    try {
      const signerAddress = await getSignerAddress();

      if (isBlocked) {
        await writeContract.unblockContact(uid, { from: signerAddress });
        toast.success("User unblocked successfully!");
      } else {
        await writeContract.blockContact(uid, { from: signerAddress });
        toast.success("User banned successfully!");
      }

      setIsBlocked(!isBlocked); // toggle state
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed!");
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className={`px-3 py-1 rounded text-white
          ${isBlocked }`}
      >
        {isBlocked ? "Unblock" : "Ban"}
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
          bg-[#020617]/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-gradient-to-br from-[#0b1026] to-[#111827]
            border border-blue-900/40 rounded-lg w-[320px] p-5"
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
                className={`px-4 py-2 text-sm rounded-md text-white
                  ${isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
                  disabled:opacity-50`}
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
