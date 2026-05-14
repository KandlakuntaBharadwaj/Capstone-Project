import axios from "axios";

const api = axios.create({
  baseURL: "https://capstone-backend-3bgm.onrender.com",
  withCredentials: true,
});

export default api;
