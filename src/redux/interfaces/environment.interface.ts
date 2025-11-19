import { BaseSearchInterface } from '@/utils'

export interface IEnvironment {
  name: string
  style?: string
  script?: string
  active?: boolean
  zipFile?: string
}

export interface IEnvironmentSearch extends BaseSearchInterface {
  name?: string
  active?: boolean
}
