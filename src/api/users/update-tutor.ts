import { Tutor } from "@/store/modules/auth-types"
import handleAxiosError from "@/api/axios-error-handler"
import axios from "@/api/axios-instance-creator"

interface RequestBody {
  nome?: string
  cpf?: string
  dataNascimento?: string
  genero?: "M" | "F"
  email?: string
  celular?: string
  password?: string
  fotoPerfil?: string
  isMonitor?: boolean
  isActive?: boolean

  tutor?: {
    universidade?: string
    cursoLicensiatura?: string
    semestreAtual?: number
    habilidades?: string[]
  }
}

export default (id: string, tutor: Tutor): any => {
  const { universidade, cursoLicensiatura, semestreAtual, habilidades, ...copiaTutor } = tutor
  const body: RequestBody = { ...copiaTutor, tutor: { universidade, cursoLicensiatura, semestreAtual, habilidades } }

  return new Promise((resolve, reject) => {
    axios()
      .put(`users/tutores/${id}`, body)
      .then(res => {
        console.log(res.data)
        resolve(res.data)
      })
      .catch(error => {
        console.log(error)
        const errorMessage = handleAxiosError(error, "Erro ao atualizar tutor")
        reject(errorMessage)
      })
  })
}
