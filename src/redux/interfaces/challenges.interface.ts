import { BaseResponseInterface, BaseSearchInterface } from '@/utils'

import { ILesson, IModule } from './content.interface'

export type Unit = IModule &
  BaseResponseInterface & {
    lessons: Array<ILesson & BaseResponseInterface>
  }

export interface IChallenges {
  name?: string
  description: string
  units: Unit[]
}

export interface IChallengesSearchParams extends BaseSearchInterface {
  id: string
}
