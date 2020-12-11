import { api } from '../axios-instance-creator'
import handleAxiosError from '@/api/axios-error-handler'
export interface DadosMatching {
    tutorId: string
    professorId: string
    tutoringDate: string
    tutoringHour: string
}
export function requestTutoring(dados: DadosMatching) {
    return new Promise((resolve, reject) => {
        api()
            .post('tutoring/', dados)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                const apiError = handleAxiosError(error)
                reject(apiError)
            })
    })
}
