import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { AgendaHorarios } from "@/pages/tutor/agenda/agenda"

export function getAgendaTutorService(idTutor: string): Promise<AgendaHorarios> {
  return new Promise((resolve, reject) => {
    api()
      .get(`users/tutores/${idTutor}/agenda`)
      .then(res => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, __v, ...agenda } = res.data
        resolve(agenda)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
