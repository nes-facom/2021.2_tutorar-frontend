import Vue from "vue"

export interface MongoDocument {
  _id: string
  __v?: number
  [x: string]: unknown
}

export interface AddNormalizedItemsPayload<E> {
  items: Record<string, E>
  options?: {
    overwriteExistingRecords?: boolean
  }
}

/**
 * Metadados sobre o estado das entidades armazenadas
 */
export interface CrudMeta {
  /**
   * Indica se todos os recursos foram pegos
   */
  allFetched: boolean

  /**
   * Data do ultimo fetch
   */
  lastFetchDate: Date | null
}

/**
 * Estado mínimo que um módulo crud deve ter
 */
export interface BaseCrudModuleState<E> {
  byId: Record<string, E>

  meta: CrudMeta
}

/**
 * Classe base de um módulo crud do Vuex
 */
export abstract class CrudModule<E> {
  byId: Record<string, E> = {}

  meta: CrudMeta = { allFetched: false, lastFetchDate: null }

  abstract RESET_STATE(): void

  abstract MARK_AS_FETCHED(): void

  abstract UPDATE_META(meta: Partial<CrudMeta>): void

  abstract REMOVE_ITEMS_BY_ID(ids: string[] | string): void

  abstract ADD_NORMALIZED_ITEMS(payload: AddNormalizedItemsPayload<E>): void
}

/**
 * Adiciona items não normalizados ao estado
 */
export function addItems<E extends MongoDocument>(ctx: CrudModule<E>, items: E[]) {
  items.map(item => {
    const id = item._id
    Vue.set(ctx.byId, id, item)
  })
}

/**
 * Seta os metadads para afirmar que todas as entidades ja foram
 * buscadas em 'lastFetchDate'
 */
export function markAsFetched<E>(ctx: CrudModule<E>) {
  ctx.meta.allFetched = true
  ctx.meta.lastFetchDate = new Date()
}

/**
 * Atualiza metadados
 */
export function updateMeta<E>(ctx: CrudModule<E>, payload: Partial<CrudMeta>) {
  ctx.meta = { ...ctx.meta, ...payload }
}

/**
 * Reseta o estado dos items e metadados
 */
export function resetState<E>(ctx: CrudModule<E>) {
  ctx.byId = {}
  ctx.meta = { allFetched: false, lastFetchDate: null }
}

/**
 * Adiciona items ja normalizados ao estado
 */
export function addNormalizedItems<E>(ctx: CrudModule<E>, payload: AddNormalizedItemsPayload<E>) {
  const { items, options } = payload

  if (!items || Object.values(items).length === 0) return

  const defaultOptions = { overwriteExistingRecords: true }

  const { overwriteExistingRecords } = { ...defaultOptions, ...options }

  ctx.byId = overwriteExistingRecords ? { ...ctx.byId, ...items } : { ...items, ...ctx.byId }
}

/**
 * Remove items por id do estado
 */
export function removeItemsById<E>(ctx: CrudModule<E>, ids: string[] | string) {
  if (!Array.isArray(ids)) ids = [ids]

  ids.forEach(id => Vue.delete(ctx.byId, id))
}
