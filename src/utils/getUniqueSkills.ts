import { ISkill } from '@/redux/interfaces/content.interface'

export function getUniqueSkills(data: ISkill[]) {
  const unique = data.reduce(
    (acc: any, current: ISkill) => {
      if (!acc.tempNames.includes(current.name)) {
        acc.tempNames.push(current.name)
        acc.uniqueItems.push(current)
      }
      return acc
    },
    { uniqueItems: [], tempNames: [] }
  )

  return unique.uniqueItems
}
