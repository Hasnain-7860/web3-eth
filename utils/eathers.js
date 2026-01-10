import { ethers } from "ethers";
import abi from '../Abi.json'
import FausetAbi  from '../FausetAbi.json'
 
const contractAddress = "0xAB551506b8245cf40908554d82cDb38D14C86A92";
const fausetAddress="0xe3D880381b623c4b761D9A3dfe4473D70677F97C";
const clientId = import.meta.env.VITE_CLIENT_ID;
const provider = new ethers.JsonRpcProvider(
  `https://11155111.rpc.thirdweb.com/${clientId}`
);
 
const privateKey = import.meta.env.VITE_OWNER_PRIVATE_KEY;
if (!privateKey) {
  throw new Error("Missing VITE_OWNER_PRIVATE_KEY in .env");
}

export const writesContract =(signer)=>{
  const writeContract = new ethers.Contract(
  contractAddress,
  abi,
  signer,
);
return writeContract
}
 
const signer = new ethers.Wallet(privateKey, provider);
// export const writeContract = new ethers.Contract(
//   contractAddress,
//   abi,
//   signer,
// );

export const FaucetContract = new ethers.Contract(
  fausetAddress,
  FausetAbi,
  signer,
);


// export const writesContracts = new ethers.Block(
//   contractAddress,
//   abi,
//   signer,
// );



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
export const readfaucet = new ethers.Contract(fausetAddress,FausetAbi, provider);
 
export const getOwner = async () => readContract.owner();
export const getSignerAddress = async () => signer.address;
export const list = () => readContract.getAllContactAddresses();
export const list1 = () => readContract.addressToContactInfo();
export const list2 = () => readContract.blockedContacts();
export const list3 = () => readContract.getContactCount();
export const list4 = () => readContract.totalBalanceAcrossAllContacts();
export const list5 = () => readContract.totalClaimed();





 
 
 