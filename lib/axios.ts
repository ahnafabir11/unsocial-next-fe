import { BASE_URL } from "@/constant/api";
import _axios from "axios";

const axios = _axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axios;
