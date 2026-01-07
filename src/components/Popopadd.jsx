import { useState } from "react";
import { ethers } from "ethers";
import { UserPlus, X } from "lucide-react";
import { writeContract, getOwner, getSignerAddress } from "../../utils/eathers";
import abi from "../../Abi.json";
import toast from "react-hot-toast";

 
const CONTRACT_ADDRESS = "0xAB551506b8245cf40908554d82cDb38D14C86A92";
 
 
export default function AddContactModal({onSuccess}) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);
 
 
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };
 
 const addContact = async () => {
  if (!name || !uid) {
    toast.error("Name and UID are required");
    return;
  }

  try {
    setLoading(true);
    const signerAddr = await getSignerAddress();
    const owner = await getOwner();

    console.log({ signerAddr, owner });

    // ⚠️ blob URL blockchain me store nahi ho sakta
    const imageUri =
      image && image.startsWith("blob:") ? "" : (image || "");

    const tx = await writeContract.addContact(
      name,
      imageUri,
      uid
    );

    toast.loading("Transaction pending...", { id: "add-contact" });

    await tx.wait();

    toast.success("Contact added successfully 🎉", {
      id: "add-contact",
    });
    onSuccess && onSuccess();

    setOpen(false);
    setName("");
    setUid("");
    setImage(null);
  } catch (err) {
    try {
      const i = new ethers.Interface(abi);
      if (err?.data) {
        const parsed = i.parseError(err.data);
        toast.error(parsed?.name || "Transaction failed");
      } else {
        toast.error(err.reason || err.message);
      }
    } catch {
      toast.error("Add contact failed");
    }
  } finally {
    setLoading(false);
  }
};

 
// const addContact = async () => {
//   console.log("FAKE SAVE (no blockchain)");
 
//   console.log({
//     name,
//     image,
//     uid,
//   });
 
//   // simulate delay
//   await new Promise((res) => setTimeout(res, 800));
 
//   alert("Contact saved locally (no gas)");
 
//   setOpen(false);
// };
 
  return (
    <>
     
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg
        bg-blue-600 hover:bg-blue-700 text-white text-sm"
      >
        <UserPlus size={16} />
        Add Contact
      </button>
 
     
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
          bg-[#020617]/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl p-6 relative
            bg-gradient-to-br from-[#0b1026] to-[#111827]
            border border-blue-900/40"
          >
           
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
 
            <h2 className="text-lg font-semibold text-white mb-6">
              Add New Contact
            </h2>
 
           
            <div className="flex justify-center mb-6">
              <label className="cursor-pointer">
                {image ? (
                  <img
                    src={image}
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#020617]
                  border flex items-center justify-center text-gray-400">
                    Upload
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
            </div>
 
           
            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-3 py-2 rounded-lg bg-[#020617]
                border text-white text-sm"
              />
 
              <input
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                placeholder="Email / Phone (UID)"
                className="w-full px-3 py-2 rounded-lg bg-[#020617]
                border text-white text-sm"
              />
            </div>
 
           
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm border rounded-lg text-gray-300"
              >
                Cancel
              </button>
 
              <button
                onClick={addContact}
                disabled={loading}
                className="px-4 py-2 text-sm rounded-lg
                bg-blue-600 text-white hover:bg-blue-700
                disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Contact"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}