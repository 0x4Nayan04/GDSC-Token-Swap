import { useEvmNativeBalance } from "@moralisweb3/next";

function HomePage() {
  const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const { data: nativeBalance } = useEvmNativeBalance({ address });

  return (
    <div className="container">
      <div className="wallet-info">
        <h3>Wallet Address</h3>
        <p>{address}</p>
        <h3>Native Balance</h3>
        <p>{nativeBalance?.balance.ether} ETH</p>
      </div>
    </div>
  );
}
