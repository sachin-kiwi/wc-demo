import { useSignMessage } from "wagmi";
import { recoverMessageAddress } from "viem";
import { useEffect, useState } from "react";
function SignMessage() {
  const message = "gm wagmi frens";
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message,
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
      {isSuccess && <div>Signature: {data}</div>}
      {data ? `Recovered Address ${recoveredAddress}` : null}
      {isError && <div>Error signing message</div>}
    </div>
  );
}

export default SignMessage;
