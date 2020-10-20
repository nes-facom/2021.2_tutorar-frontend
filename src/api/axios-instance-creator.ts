import axios, { AxiosInstance } from "axios"

interface Options {
  baseUrl?: string
}

export default (options: Options): AxiosInstance => {
  const axiosInstance = axios.create()

  axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
  axiosInstance.defaults.baseURL = `http://127.0.0.1:7000/${options.baseUrl}`
  return axiosInstance
}
