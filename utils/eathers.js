import { ethers } from "ethers";
import abi from '../Abi.json'
 
const contractAddress = "0xAB551506b8245cf40908554d82cDb38D14C86A92";
const clientId = import.meta.env.VITE_CLIENT_ID;
const provider = new ethers.JsonRpcProvider(
  `https://11155111.rpc.thirdweb.com/${clientId}`
);
 
const privateKey = import.meta.env.VITE_OWNER_PRIVATE_KEY;
if (!privateKey) {
  throw new Error("Missing VITE_OWNER_PRIVATE_KEY in .env");
}
 
const signer = new ethers.Wallet(privateKey, provider);
export const writeContract = new ethers.Contract(
  contractAddress,
  abi,
  signer,
);
// const tx = await contract.transfer(
//   to,
//   amount,
//   {
//     gasLimit: 100000,
//     maxFeePerGas: ethers.parseUnits("30", "gwei"),
//     maxPriorityFeePerGas: ethers.parseUnits("2", "gwei")
//   }
// );
 
// const contactInstance =((contractAddress)=>{
//   const dianimicContract =  new ethers.Contract(contractAddress, abi, provider);
//   return dianimicContract
// })
 
 
export const readContract = new ethers.Contract(contractAddress, abi, provider);
 
export const getOwner = async () => readContract.owner();
export const getSignerAddress = async () => signer.address;
export const list = async (address) => {
  return await readContract.addressToContactInfo(address);
};
 
 
 