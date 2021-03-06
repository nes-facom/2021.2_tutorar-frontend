import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { AgendaHorarios } from "@/pages/tutor/agenda/agenda"

export function updateAgendaTutorService(idTutor: string, dadosAgenda: AgendaHorarios): Promise<AgendaHorarios> {
  return new Promise((resolve, reject) => {
    api()
      .post(`users/tutores/${idTutor}/agenda`, dadosAgenda)
      .then(res => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, __v, ...agenda } = res.data.tutor.agenda
        resolve(agenda)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
