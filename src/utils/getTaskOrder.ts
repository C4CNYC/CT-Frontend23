import { type DropResult } from '@hello-pangea/dnd'

import { ILessonContent } from '@/redux/services/interfaces/courseUnits.interface'
import { type IAssignmentsCard } from '@/types/assignments'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

// solution for count order depend of new position

export function getOrder(
  result: DropResult,
  destColumn: {
    id?: string
    name?: string
    cardIds: string[]
  },
  cards: Record<string, IAssignmentsCard | (ILessonContent & BaseResponseInterface)>,
  isSameColumn: boolean
): number {
  const { cardIds } = destColumn
  const { destination, draggableId } = result

  // case: when you put your task as first on in column
  if (!destination?.index) {
    const nextId = cardIds[Number(destination?.index)]
    return nextId ? parseFloat(cards[nextId].meta.order || '0') / 2 : 1
  }

  // case: when you put your task as last on in the same column
  if (isSameColumn && destination?.index >= cardIds.length - 1) {
    const lastId = cardIds[cardIds.length - 1]
    return parseFloat(cards[lastId].meta.order || '0') + 1
  }

  // case: when you put your task as last on in another column
  if (!isSameColumn && destination?.index >= cardIds.length) {
    const lastId = cardIds[cardIds.length - 1]
    return parseFloat(cards[lastId].meta.order || '0') + 1
  }

  // case: when you put your task as after next task.
  if (cardIds[Number(destination?.index) - 1] === draggableId) {
    const prevId = cardIds[Number(destination?.index)]
    const nextId = cardIds[Number(destination?.index) + 1]

    return nextId
      ? (parseFloat(cards[nextId].meta.order || '0') +
          parseFloat(cards[prevId].meta.order || '0')) /
          2
      : parseFloat(cards[prevId].meta.order || '0') + 1
  }

  // case: all other cases

  const nextId = cardIds[Number(destination?.index)]
  const prevId = cardIds[Number(destination?.index) - 1]

  return (parseFloat(cards[nextId].meta.order) + parseFloat(cards[prevId].meta.order)) / 2
}
