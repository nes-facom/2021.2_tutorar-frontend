import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

export function api(options?: AxiosRequestConfig): AxiosInstance {
  const token = localStorage.getItem("api_token")
  // http://localhost:5005/
  // https://tutorar-api.herokuapp.com/
  const defaultOptions: AxiosRequestConfig = {
    baseURL: "http://localhost:80/",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: token ? `Bearer ${token}` : null
    }
  }

  return axios.create({ ...defaultOptions, ...options })
}
