import axios from "axios";

const baseURL = "http://localhost:8001/api";
const headers = {
  "Content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
export const axiosClient = axios.create({
  baseURL,
  headers,
});
