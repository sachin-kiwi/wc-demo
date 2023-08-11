import { useAccount, useConnect, useNetwork, useDisconnect } from "wagmi";
import React from "react";
import SignMessage from "./transaction";
const { useEffect, useState } = React;
const Home = () => {
  const { isConnected, address } = useAccount();

  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const [isValidNetwork, setIsValidNetwork] = useState(false);
  const { connect, connectors } = useConnect({
    onSettled(data, error) {
      if (error !== null) {
        console.log(`Please Check with Admin.${error}`);
      }
    },
  });
  const handleConnect = (connector) => {
    connect({ connector });
  };

  useEffect(() => {
    if (isConnected) {
      console.log(chain);
      setIsValidNetwork(isConnected && !chain.unsupported);
    }
  }, [chain]);

  useEffect(() => {
    if (isConnected && address) {
      console.log("Address Change detected");
    }
  }, [address]);
  return (
    <>
      <div>
        {isConnected ? <p>Address: {address}</p> : null}
        {isConnected ? (
          <p>Connected to correct Network {`${isValidNetwork}`}</p>
        ) : null}

        <p>{isConnected ? "Connected Now" : null}</p>
        <button disabled={!isConnected} onClick={disconnect}>
          Disconnect
        </button>
        {connectors.map((connector) => (
          <button
            className="mb-2"
            key={connector.id}
            onClick={() => handleConnect(connector)}
            disabled={isConnected}
          >
            Connect
          </button>
        ))}
        {isConnected ? <SignMessage /> : null}
      </div>
    </>
  );
};

export default Home;
