import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axiosInstance.defaults.baseURL = "http://127.0.0.1:80/api/";

export default axiosInstance;
