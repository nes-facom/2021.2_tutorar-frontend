import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

export function api(options?: AxiosRequestConfig): AxiosInstance {
  const token = localStorage.getItem("api_token")
  const defaultOptions: AxiosRequestConfig = {
    baseURL: "http://localhost:5006/",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: token ? `Bearer ${token}` : null
    }
  }

  return axios.create({ ...defaultOptions, ...options })
}
