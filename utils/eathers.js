import { ethers } from "ethers";
 

const provider = new ethers.JsonRpcProvider(
  "https://11155111.rpc.thirdweb.com/${THIRDWEB_API_KEY}"
);
 

const contractAddress = "0x46E19Aebe476dF7C789F1e6b4d496904A96880B7";
const abi = [
  "function getBalance(address) view returns (uint256)"
];
 
const contract = new ethers.Contract(contractAddress, abi, provider);
 
const balance = await contract.getBalance("0xUSER_ADDRESS");
 
console.log("Balance:", balance.toString());