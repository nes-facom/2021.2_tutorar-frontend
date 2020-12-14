/**
 * Tipagem para regras validação de campos string
 * usados no v-text-field
 */
export type StringFieldRule = (fieldValue?: string) => true | string
export type NumberFieldRule = (fieldValue?: number) => true | string