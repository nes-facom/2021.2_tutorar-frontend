/**
 * Tipagem para regras validação de campos string
 * usados no v-text-field
 */
export type StringFieldRules = ((fieldValue: string | undefined) => true | string)[]
