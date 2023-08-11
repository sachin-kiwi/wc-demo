import { useSignMessage } from "wagmi";
import { recoverMessageAddress } from "viem";
import { useEffect, useState } from "react";
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

export default SignMessage;
