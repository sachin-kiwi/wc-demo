import { useAccount, useConnect, useNetwork, useDisconnect } from "wagmi";
import React from "react";
import { SignMessage, SendTxn } from "./transaction";
import NetworkSwitch from "./network";
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
        {isConnected ? (
          <>
            <h1>Connection Status</h1>
            <p>
              Address: {address}
              <br />
              Connected to correct Network {`${isValidNetwork}`}
            </p>
          </>
        ) : null}
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
        <button disabled={!isConnected} onClick={disconnect}>
          Disconnect
        </button>
        {isConnected ? (
          <>
            <NetworkSwitch />
            <SignMessage />
            <SendTxn />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Home;
