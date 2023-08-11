import { useSignMessage } from "wagmi";
import { parseEther, recoverMessageAddress } from "viem";
import { useEffect, useState } from "react";
import { useSendTransaction, usePrepareSendTransaction } from "wagmi";

function SignMessage() {
  const message = "gm wagmi frens";
  const { data, isLoading, isSuccess, signMessage } = useSignMessage({
    message,
    onSettled(data, error) {
      if (error !== null) {
        console.log(error);
        return;
      }
      console.log(`Signature Data:${data}`);
      console.log(`Recovered Address ${recoveredAddress}`);
    },
  });

  const [recoveredAddress, setRecoveredAddress] = useState("");

  useEffect(() => {
    (async () => {
      if (data) {
        const address = await recoverMessageAddress({
          message,
          signature: data,
        });
        setRecoveredAddress(address);
      }
    })();
  }, [data]);

  return (
    <div>
      <button disabled={isLoading} onClick={() => signMessage()}>
        Sign message
      </button>
    </div>
  );
}

const SendTxn = () => {
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: "0xdC9310e98B0F5b65077b202d81fDd9de19F7Eb9D",
    value: parseEther("0.01"),
    onSettled(data, error) {
      if (error !== null) {
        console.log(error);
        return;
      }
      console.log(`Txn Hash:${data.hash}`);
    },
  });

  return (
    <div>
      <button onClick={() => sendTransaction()}>Send Transaction</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};

export { SignMessage, SendTxn };
