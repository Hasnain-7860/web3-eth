import { createContext, useContext, useState } from "react";
import { BrowserProvider } from "ethers";

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  const loginHandler = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not installed");
      }

      const browserProvider = new BrowserProvider(window.ethereum);
      await browserProvider.send("eth_requestAccounts", []);

      const signerInstance = await browserProvider.getSigner();
      const address = await signerInstance.getAddress();

      setProvider(browserProvider);
      setSigner(signerInstance);
      setAccount(address);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask not found");
    }

    await window.ethereum.request({
      method: "wallet_revokePermissions",
      params: [{ eth_accounts: {} }],
    });

    setProvider(null);
    setSigner(null);
    setAccount(null);
  };

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        account,
        loginHandler,
        logout,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
