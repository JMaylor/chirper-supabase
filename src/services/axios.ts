import axios from "axios";

const api = axios.create({
  baseURL: "https://finnhub.io/api/v1/",
});

console.log(import.meta.env.VITE_FINNHUB_TOKEN);

api.interceptors.request.use((config) => {
  config.params = {
    token: import.meta.env.VITE_FINNHUB_TOKEN,
    ...config.params,
  };
  return config;
});

export { api };
