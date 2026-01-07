import { ethers } from "ethers";
import abi from '../Abi.json'
 
const contractAddress = "0xAB551506b8245cf40908554d82cDb38D14C86A92"; 
const provider = new ethers.JsonRpcProvider(
  "https://11155111.rpc.thirdweb.com/d6ae8f42ef1b856dc9315a9098a12266"
);
 
const signer = new ethers.Wallet(
 "745c15fc990581207ac86cbfdca1e8f97c20715e0774e6d72ed6054bde5e4cd4",
  provider
);

export const writeContract = new ethers.Contract(                //write
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
 

export const readContract = new ethers.Contract(contractAddress, abi, provider);   //read

const iface = new ethers.Interface(abi);
 
const functions = iface.fragments
  .filter(f => f.type === "function")
  .map(f => f.format());
 
console.log(functions);


 
