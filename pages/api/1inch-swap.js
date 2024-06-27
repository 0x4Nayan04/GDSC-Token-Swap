import axios from "axios";

export default async function handler(req, res) {
  const { fromToken, toToken, amount, fromAddress } = req.query;

  try {
    const response = await axios.get(
      "https://api.1inch.dev/swap/v6.0/137/swap",
      {
        headers: {
          Authorization: `Bearer ${process.env.ONE_INCH_API_KEY}`,
        },
        params: {
          src: fromToken,
          dst: toToken,
          amount: amount,
          from: fromAddress,
          origin: fromAddress,
          slippage: "1",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching swap data:", error);
    res.status(500).json({ error: "Failed to fetch swap data" });
  }
}
