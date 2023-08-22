import axios from "axios";

const ax = axios.create({
  baseURL: "http://localhost:3001/api/v1",
});

ax.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default ax;