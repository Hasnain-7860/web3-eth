import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { inAppWallet, createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: import.meta.env.VITE_CLIENT_ID||"",
});

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "farcaster",
        "email",
        "x",
        "passkey",
        "telegram",
        "phone",
      ],
    },
  }),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("io.metamask"),
];

function Wallet({ title }) {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectModal={{ size: "compact" }}
      connectButton={{
        label: title ? title : "Connect Wallet",
        style: {
          backgroundColor: "#08d19f",
          color: "#000",  
          borderRadius: "10px",
          fontWeight: "600",
        },
      }}
    />
  );
}

export default Wallet;

