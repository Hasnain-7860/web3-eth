import { ConnectButton, useActiveAccount } from "thirdweb/react";


function Walletbutton() {
  const account = useActiveAccount();
  console.log("connected to", account?.address);

  return (
    <div>
       <ConnectButton client= {process.env.VITE_CLIENT_ID} />
    </div>
  );
}
