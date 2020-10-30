import { BaseRepository } from "@/api/repositories/base-repository"
import { UserTutor } from "@/store/modules/auth"
import { AxiosInstance } from "axios"

import createAxiosInstance from "@/api/axios-instance-creator"
import handleAxiosError from "@/api/axios-error-handler"

export class TutorRepository extends BaseRepository<UserTutor> {
  axiosInstance: AxiosInstance = createAxiosInstance()

  create(tutor: UserTutor, foto: File) {
    const formData = new FormData()
    formData.append("user", JSON.stringify(tutor))
    formData.append("foto_perfil", foto)

    return new Promise<boolean>((resolve, reject) => {
      this.axiosInstance.post("users", formData).then(res => {
        res ? resolve(true) : reject()
      })
    })
  }

  update(id: number, tutoria: UserTutor) {
    return new Promise<boolean>((resolve, reject) => {
      this.axiosInstance.post("", { id, tutoria }).then(res => {
        res ? resolve(true) : reject()
      })
    })
  }

  delete(id: number) {
    return new Promise<boolean>((resolve, reject) => {
      this.axiosInstance.post("", id).then(res => {
        res ? resolve(true) : reject()
      })
    })
  }

  get(options?: object) {
    return new Promise<UserTutor[]>((resolve, reject) => {
      this.axiosInstance
        .post("", options)
        .then(res => {
          res ? resolve([]) : reject()
        })
        .catch(error => {
          const errorMessage = handleAxiosError(error, "Ocorreu um erro ao buscar as Tutorias")
          reject(errorMessage)
        })
    })
  }

  find(id: number) {
    return new Promise<UserTutor>((resolve, reject) => {
      this.axiosInstance.post("", id).then(res => {
        reject()
      })
    })
  }
}
