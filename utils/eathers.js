import { ethers } from "ethers";
import abi from '../Abi.json'
 

const provider = new ethers.JsonRpcProvider(
  "https://11155111.rpc.thirdweb.com/d6ae8f42ef1b856dc9315a9098a12266"
);
 

const contractAddress = "0xAB551506b8245cf40908554d82cDb38D14C86A92";


 
export const contract = new ethers.Contract(contractAddress, abi, provider);

const iface = new ethers.Interface(abi);
 
const functions = iface.fragments
  .filter(f => f.type === "function")
  .map(f => f.format());
 
console.log(functions);
 
