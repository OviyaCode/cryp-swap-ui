"use client";
import { getCryptoCurrencies, getExchangeRate } from "@/lib/api";
import { useEffect, useState } from "react";

function Swap() {
  const [cryptos, setCryptos] = useState([]);
  const [fromCrypto, setFromCrypto] = useState(null);
  const [toCrypto, setToCrypto] = useState(null);
  const [amount, setAmount] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      try {
        const data = await getCryptoCurrencies();
        setCryptos(data);
      } catch (error) {
        setError("Failed to fetch crypto currencies");
      }
      setLoading(false);
    };
    fetchCryptoData();
  }, []);

  const handleSwap = async () => {
    if (fromCrypto && toCrypto && amount) {
      setLoading(true);
      setError(null);
      try {
        const rate = await getExchangeRate(fromCrypto.id, toCrypto.id);
        const fromRate = rate[fromCrypto.id].usd;
        const toRate = rate[toCrypto.id].usd;
        setEstimatedAmount(((amount * fromRate) / toRate).toFixed(2));
      } catch (error) {
        setError("Failed to fetch exchange rate");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 flex-col justify-center h-52">
      <div className="flex flex-col w-full gap-4 border-[1px] border-gray-200 bg-gray-100 p-5 rounded-md">
        <label className="">Sell</label>
        <div className="flex gap-5 justify-between">
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value), setError(null);
            }}
            placeholder="0"
            className="bg-transparent w-44 text-3xl appearance-none outline-none border-none"
          />
          <select
            className="bg-white rounded-full px-2 outline-none border-none"
            onChange={(e) =>
              setFromCrypto(cryptos.find((c) => c.id === e.target.value))
            }
          >
            <option value="" className="bg-gray-50 ">
              Select Cryptocurrency
            </option>
            {cryptos.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 border-[1px] border-gray-200 bg-gray-100 p-5 rounded-md">
        <label>Buy</label>
        <div className="flex justify-between">
          {estimatedAmount ? (
            <>
              {estimatedAmount && (
                <p className="bg-transparent w-20 text-3xl">
                  {estimatedAmount}{" "}
                </p>
              )}
            </>
          ) : (
            <p className="bg-transparent w-20 text-3xl text-gray-400">0</p>
          )}
          <select
            className="bg-[#fc72ff] active:bg-[#eca9ed] text-white rounded-full px-2 cursor-pointer outline-none border-none"
            onChange={(e) =>
              setToCrypto(cryptos.find((c) => c.id === e.target.value))
            }
          >
            <option value="">token</option>
            {cryptos.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleSwap}
        className="w-full border-2 border-[#fc72ff] rounded-full py-2 text-xl text-[#fc30ff] hover:border-none hover:bg-[#fc72ff] hover:text-white transition-all duration-500"
      >
        {loading ? "Swapping" : "Swap"}
      </button>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default Swap;
