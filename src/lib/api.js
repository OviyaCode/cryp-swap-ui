import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

export const getCryptoCurrencies = async () => {
  const response = await axios.get(`${API_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 100,
      page: 1,
    },
  });

  return response.data;
};

export const getExchangeRate = async (fromId, toId) => {
  const response = await axios.get(`${API_URL}/simple/price`, {
    params: {
      ids: `${fromId},${toId}`,
      vs_currencies: "usd",
    },
  });
  return response.data;
};
