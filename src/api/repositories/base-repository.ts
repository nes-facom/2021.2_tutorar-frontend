import createAxiosInstance from "@/api/axios-instance-creator"

export type IdentifiableItem = {
  id: number
}

export abstract class BaseRepository<I extends IdentifiableItem> {
  axiosInstance = createAxiosInstance({})

  abstract find(id: number): Promise<I>

  abstract get(options?: object): Promise<I[]>

  abstract create(item: I): Promise<boolean>

  abstract delete(id: number): Promise<boolean>

  abstract update(id: number, item: I): Promise<boolean>
}
