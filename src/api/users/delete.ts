import { api } from "@/api/axios-instance-creator"

export function deleteUserService(userId: string) {
  return api().delete(`users/${userId}`)
}
