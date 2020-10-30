/* eslint-disable @typescript-eslint/no-explicit-any */
import createAxiosInstance from "@/api/axios-instance-creator"
import { AxiosInstance } from "axios"

export type IdentifiableItem = {
  id: string | number
}

export abstract class BaseRepository<I extends IdentifiableItem> {
  abstract axiosInstance: AxiosInstance = createAxiosInstance()

  abstract find(id: number): Promise<I>

  abstract get(...args: any): Promise<I[]>

  abstract create(...args: any): Promise<boolean>

  abstract delete(id: number): Promise<boolean>

  abstract update(id: number, item: I): Promise<boolean>
}
