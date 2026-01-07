import { useState } from "react";

export default function Ban() {
  const [open, setOpen] = useState(false);

  const handleBan = () => {
    setOpen(false);
    console.log("User banned");
  };

  return (
    <>
      {/* Ban Button */}
      <button
        onClick={() => setOpen(true)}
        className="tex-white"
      >
        Ban
      </button>

      {/* Modal */}
      {open && (
        <div  className="fixed inset-0 z-50 flex items-center justify-center
          bg-[#020617]/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}>
          <div className="bg-gradient-to-br from-[#0b1026] to-[#111827]
            border border-blue-900/40 rounded-lg w-[320px] p-5">
            <h2 className="text-lg font-semibold text-white mb-6">
              Are you sure?
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm rounded-md border"
              >
                Cancel
              </button>

              <button
                onClick={handleBan}
                className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Ban
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
