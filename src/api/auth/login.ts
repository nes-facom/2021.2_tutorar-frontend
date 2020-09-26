import axios from "axios";
import handleAxiosError from "@/api/axiosErrorHandler";

import { User } from "@/store/modules/auth";

export interface ExpectedResponseData {
  user: User;
  token: string;
}

/**
 * @param username - O username do usuário
 * @param password - A senha do usuario
 */
export default (username: string, password: string): Promise<ExpectedResponseData> =>
  new Promise((resolve, reject) => {
    axios
      .post("auth/login", { username, password })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        const errorMessage = handleAxiosError(error, "Erro do servidor ao realizar login");
        reject(errorMessage);
      });
  });