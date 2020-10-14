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
// export default (username: string, password: string): Promise<ExpectedResponseData> => {
//   return new Promise((resolve, reject) => {
//     axios.post("auth/login", { username, password })
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(error => {
//         const errorMessage = handleAxiosError(error, "Erro do servidor ao realizar login");
//         reject(errorMessage);
//       });
//   });
// }

export default (
  username: string,
  password: string
): Promise<ExpectedResponseData> => {
  return new Promise((resolve, reject) => {
    resolve({
      user: {
        role: 'professor',

        cpf: '03690208122',
        nome: 'Fulano Da Silva Sanches',
        email: 'fulano.silva@hotmail.com',
        celular: '67998801996',
        dataNascimento: '23/10/1996',
        genero: 'masculino',

        dataInicioEnsino: '12/04/2015',
        formacaoAcademica: "superior",
        nivelLecionamento: "superior"
      },
      token: "ASJDIOAJS"
    });
  });
};
