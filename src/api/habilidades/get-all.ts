import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { Habilidade } from "@/store/modules/habilidades-module"

export function getAllHabilidadesService(): Promise<Habilidade[]> {
  return new Promise((resolve, reject) => {
    api()
      .get("habilidades")
      .then(res => {
        const habilidades: Habilidade[] = res.data
        resolve(habilidades)
      })
      .catch(err => {
        const apiError = handleAxiosError(err)
        reject(apiError)
      })
  })
}
