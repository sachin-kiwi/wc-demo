import { configureChains, createConfig } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID;
const { chains, publicClient } = configureChains([bscTestnet].filter(Boolean), [
  publicProvider(),
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId,
      },
    }),
  ],
  publicClient,
});

export { wagmiConfig, chains };
