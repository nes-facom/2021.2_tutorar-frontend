import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"
import { Tutor } from "@/store/modules/auth-types"
import { DadosTutor, RawTutor } from "@/store/modules/users-types"

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
  const { universidade, cursoLicensiatura, semestreAtual, habilidades, ...copiaTutor } = tutor
  const body: RequestBody = { ...copiaTutor, tutor: { universidade, cursoLicensiatura, semestreAtual, habilidades } }

  return new Promise((resolve, reject) => {
    api()
      .put(`users/tutores/${id}`, body)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
