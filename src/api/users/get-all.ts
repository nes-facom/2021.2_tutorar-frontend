import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { User } from "@/store/modules/auth-types"
import { RawUser } from "@/store/modules/users-types"

export function findAllUsersService(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    api()
      .get("users")
      .then(res => {
        const users: RawUser[] = res.data

        const formatedUsers: User[] = users.map(user => {
          const { tutor: dadosTutor, professor: dadosProfessor, ...dadosUsuario } = user

          const formatedUser: any = { ...dadosTutor, ...dadosProfessor, ...dadosUsuario }

          if (user.isAdmin) formatedUser.role = "monitor"
          if (dadosTutor) formatedUser.role = "tutor"
          if (dadosProfessor) formatedUser.role = "professor"

          return formatedUser
        })

        resolve(formatedUsers)
      })
      .catch(err => {
        const apiError = handleAxiosError(err)
        reject(apiError)
      })
  })
}
