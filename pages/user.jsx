import { getSession, signOut } from "next-auth/react";
import Moralis from "moralis";
import { useState } from "react";
import axios from "axios";
import { useSendTransaction } from "wagmi";

function User({ user, balance, initialSwapData }) {
  const [fromToken] = useState("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE");
  const [toToken, setToToken] = useState(
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  ); // USDC ERC20 Contract
  const [value, setValue] = useState("1000000000000000000");
  const [valueExchanged, setValueExchanged] = useState("");
  const [valueExchangedDecimals, setValueExchangedDecimals] = useState(1e18);
  const [to, setTo] = useState("");
  const [txData, setTxData] = useState("");

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    request: {
      from: user.address,
      to: String(to),
      data: String(txData),
      value: String(value),
    },
  });

  function changeToToken(e) {
    setToToken(e.target.value);
    setValueExchanged("");
  }

  function changeValue(e) {
    setValue(e.target.value * 1e18);
    setValueExchanged("");
  }

  async function get1inchSwap() {
    try {
      const response = await axios.get("/api/1inch-swap", {
        params: {
          fromToken: fromToken,
          toToken: toToken,
          amount: value,
          fromAddress: user.address,
        },
      });
      const tx = response.data;
      console.log(tx.data);
      setTo(tx.data.tx.to);
      setTxData(tx.data.tx.data);
      setValueExchangedDecimals(Number(`1E${tx.data.toToken.decimals}`));
      setValueExchanged(tx.data.toTokenAmount);
    } catch (error) {
      console.error("Error fetching swap data:", error);
    }
  }

  return (
    <div className="container">
      <div className="wallet-info">
        <h3>User Address</h3>
        <p>{user.address}</p>
        <h3>Your Matic Balance</h3>
        <p>{(balance.balance / 1e18).toFixed(10)} MATIC</p>
      </div>

      <div className="token-swap">
        <h2>Token Swap</h2>
        <div className="token-input">
          <select>
            <option value="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE">
              MATIC
            </option>
          </select>
          <input
            onChange={(e) => changeValue(e)}
            value={value / 1e18}
            type="number"
            min={0}
            max={balance.balance / 1e18}
          />
        </div>

        <div className="token-input">
          <select
            name="toToken"
            value={toToken}
            onChange={(e) => changeToToken(e)}
          >
            <option value="0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619">
              WETH
            </option>
            <option value="0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174">
              USDC
            </option>
          </select>
          <input
            value={
              !valueExchanged
                ? ""
                : (valueExchanged / valueExchangedDecimals).toFixed(10)
            }
            disabled={true}
          />
        </div>

        <button onClick={get1inchSwap}>Get Conversion</button>
        <button disabled={!valueExchanged} onClick={sendTransaction}>
          Swap Tokens
        </button>

        {isLoading && <div className="transaction-status">Check Wallet</div>}
        {isSuccess && (
          <div className="transaction-status success">
            Transaction: {JSON.stringify(data)}
          </div>
        )}
      </div>

      <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  if (!Moralis.Core.isStarted) {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  }

  try {
    const response = await Moralis.EvmApi.account.getNativeBalance({
      address: session.user.address,
      chain: "0x89",
    });

    // Fetch swap data server-side
    const swapResponse = await axios.get(
      "https://api.1inch.dev/swap/v6.0/137/swap",
      {
        headers: {
          Authorization: `Bearer ${process.env.ONE_INCH_API_KEY}`,
        },
        params: {
          src: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          dst: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
          amount: "1000000000000000000",
          from: session.user.address,
          origin: session.user.address,
          slippage: "1",
        },
      }
    );

    return {
      props: {
        user: session.user,
        balance: response.raw,
        initialSwapData: swapResponse.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { user: session.user, balance: { balance: 0 } }, // Fallback balance in case of error
    };
  }
}

export default User;
