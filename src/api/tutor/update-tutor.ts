import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { Tutor } from "@/store/modules/auth-types"
import { DadosTutor, RawTutor } from "@/store/modules/users-types"
import { AgendaHorarios } from "@/pages/tutor/agenda/agenda"
import { updateAgendaTutorService } from "@/api/tutor/update-agenda-tutor"

interface RequestBody {
  cpf?: string
  nome?: string
  genero?: "M" | "F"
  email?: string
  celular?: string
  password?: string
  isActive?: boolean
  isMonitor?: boolean
  fotoPerfil?: string
  dataNascimento?: string

  tutor?: Partial<DadosTutor>
}

export function updateTutorService(id: string, tutor: Tutor): Promise<RawTutor> {
  const { universidade, cursoLicensiatura, semestreAtual, habilidades, agenda, ...copiaTutor } = tutor
  const body: RequestBody = { ...copiaTutor, tutor: { universidade, cursoLicensiatura, semestreAtual, habilidades } }


  return new Promise((resolve, reject) => {
    api()
      .put(`users/tutores/${id}`, body)
      .then(res => {
        // seria interessante integrar a agenda ao body da req de updateTutor, mas na versão atual da API
        // esse fomarto de body não é aceitavel, logo devem ser realizadas duas requisições
        if (agenda){
          updateAgendaTutorService(id, agenda)
          res.data = {...res.data, agenda}
        }
        resolve(res.data)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
