import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "./utils/walletConnector";
import Home from "./components/home";

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Home />
    </WagmiConfig>
  );
}

export default App;
