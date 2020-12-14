import { RawProfessor, DadosProfessor } from "@/store/modules/users-types"
import handleAxiosError from "@/api/axios-error-handler"
import { Professor } from "@/store/modules/auth-types"
import { api } from "@/api/axios-instance-creator"

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

  professor?: Partial<DadosProfessor>
}

export function updateProfessorService(id: string, professor: Professor): Promise<RawProfessor> {
  const { formacaoAcademica, nivelLecionamento, inicioLecionamento, ...copiaProfessor } = professor
  const body: RequestBody = {
    ...copiaProfessor,
    professor: { formacaoAcademica, nivelLecionamento, inicioLecionamento }
  }

  return new Promise((resolve, reject) => {
    api()
      .put(`users/professores/${id}`, body)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        const apiError = handleAxiosError(error)
        reject(apiError)
      })
  })
}
