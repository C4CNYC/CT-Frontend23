import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

export enum HomePageType {
  Custom = 'custom',
  Default = 'default',
  Authorization = 'authorization',
  Catalog = 'catalog',
}

export enum HomePageTargetType {
  Catalog = 'catalog',
  Tribe = 'tribe',
}

export const homePageTargetList: Record<HomePageTargetType, string> = {
  [HomePageTargetType.Catalog]: STUDENT_PATH_DASHBOARD.courses.root,
  [HomePageTargetType.Tribe]: STUDENT_PATH_DASHBOARD.tribes.root,
}
