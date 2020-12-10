import { api } from "@/api/axios-instance-creator"

// TODO error handling
export function deleteUserService(userId: string) {
  return api().delete(`users/${userId}`)
}
