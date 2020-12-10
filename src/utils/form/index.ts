/**
 * Tipagem para regras validação de campos string
 * usados no v-text-field
 */
export type StringFieldRules = ((fieldValue?: string) => true | string)[]
export type NumberFieldRules = ((fieldValue?: number) => true | string)[]
