import { createContext, useContext, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  // 🔹 AUTO CONNECT ON RELOAD
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        if (!window.ethereum) return;

        const browserProvider = new BrowserProvider(window.ethereum);

        const accounts = await browserProvider.send("eth_accounts", []);

        if (accounts.length > 0) {
          const signerInstance = await browserProvider.getSigner();
          setProvider(browserProvider);
          setSigner(signerInstance);
          setAccount(accounts[0]);
        }
      } catch (err) {
        console.error("Auto connect failed:", err);
      }
    };

    checkWalletConnection();
  }, []);

  // 🔹 MANUAL CONNECT
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

  // 🔹 LOGOUT
  const logout = async () => {
    try {
      if (!window.ethereum) return;

      await window.ethereum.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });

      setProvider(null);
      setSigner(null);
      setAccount(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Web3Context.Provider
      value={{ provider, signer, account, loginHandler, logout }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
