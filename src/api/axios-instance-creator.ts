import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

export default (options?: AxiosRequestConfig): AxiosInstance => {
  const token = localStorage.getItem("api_token")

  const defaultOptions: AxiosRequestConfig = {
    baseURL: "http://localhost:8625/",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: token ? `Bearer ${token}` : null,
      "Access-Control-Allow-Origin": "*"
    }
  }

  return axios.create({ ...defaultOptions, ...options })
}
