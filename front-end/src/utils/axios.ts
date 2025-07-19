import axios from "axios";

const BASE_URL_API =
  import.meta.env.BASE_URL_API || "http://localhost:3001/api";

const apiInstance = axios.create({
  baseURL: BASE_URL_API,
  timeout: 3000,
});

export default apiInstance;
