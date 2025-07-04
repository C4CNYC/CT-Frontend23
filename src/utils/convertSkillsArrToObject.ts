import { ISkill } from '@/redux/interfaces/content.interface'

export const convertSkillsArrToObject = (arr: string[]): ISkill[] => {
  return arr.map((value) => ({
    id: value,
    name: value,
    description: value,
  }))
}
