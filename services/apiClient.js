import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com/", // URL dasar API dari .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
