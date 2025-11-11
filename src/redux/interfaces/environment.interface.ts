import { BaseSearchInterface } from '@/utils'

export interface IEnvironment {
  name: string
  description?: string
  head?: string
  scripts?: string
  configuration?: Record<string, any>
  active?: boolean
  zipFile?: string
}

export interface IEnvironmentSearch extends BaseSearchInterface {
  name?: string
  active?: boolean
}
