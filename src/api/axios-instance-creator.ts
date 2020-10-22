import axios, { AxiosInstance } from "axios"

interface Options {
  baseUrl?: string
}

export default (options: Options): AxiosInstance => {
  const token = localStorage.getItem("api_token")

  const defaultOptions = {
    baseURL: "http://localhost:7000/",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: token ? `Bearer ${token}` : null
    }
  }

  return axios.create({ ...defaultOptions, ...options })
}
