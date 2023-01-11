import axios from "axios";

const client = axios.create({
  baseURL: "https://authentication-autherization.vercel.app/api",
});

export default client;
