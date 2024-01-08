import axios from "axios";

const Backend = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export default Backend;