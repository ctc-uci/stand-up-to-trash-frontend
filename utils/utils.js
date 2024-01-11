import axios from "axios";

const Backend = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: false, //previously true but was giving me problems
});

export default Backend;