import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { chains } from "../utils/walletConnector";

const NetworkSwitch = () => {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork({
    onSettled(data, error) {
      error !== null
        ? console.log(`Please Check with Admin.${error}`)
        : console.log(`Successfully Switched Network`);
    },
  });
  const NOT_CONNECTED = "Please connect your wallet to proceed.";
  const INVALID_NETWORK = "Please connect to valid blockchain network.";
  if (!chain.unsupported) {
    return null;
  }
  return (
    <>
      <h4>
        {isConnected && chain.unsupported ? INVALID_NETWORK : NOT_CONNECTED}
      </h4>
      {isConnected && (
        <div>
          <h4>Switch Network Mannually</h4>

          {chains.map((item) => {
            return (
              <button onClick={() => switchNetwork(item.id)}>
                {item.name}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default NetworkSwitch;
