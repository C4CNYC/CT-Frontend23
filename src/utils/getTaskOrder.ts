import { type DropResult } from "@hello-pangea/dnd";

import { BaseResponseInterface } from "@utils";
import { type IAssignmentsCard } from "src/@types/assignments";
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";

// solution for count order depend of new position

export function getOrder(
  result: DropResult,
  destColumn: {
    id?: string;
    name?: string;
    cardIds: string[];
  },
  cards: Record<
    string,
    IAssignmentsCard | (ILessonContent & BaseResponseInterface)
  >,
  isSameColumn: boolean
): number {
  const { cardIds } = destColumn;
  const { destination, draggableId } = result;

  // case: when you put your task as first on in column
  if (!destination?.index) {
    const nextId = cardIds[Number(destination?.index)];
    return nextId ? parseFloat(cards[nextId].meta.order as string) / 2 : 1;
  }

  // case: when you put your task as last on in the same column
  if (isSameColumn && destination?.index >= cardIds.length - 1) {
    const lastId = cardIds[cardIds.length - 1];
    return parseFloat(cards[lastId].meta.order as string) + 1;
  }

  // case: when you put your task as last on in another column
  if (!isSameColumn && destination?.index >= cardIds.length) {
    const lastId = cardIds[cardIds.length - 1];
    return parseFloat(cards[lastId].meta.order as string) + 1;
  }

  // case: when you put your task as after next task.
  if (cardIds[Number(destination?.index) - 1] === draggableId) {
    const prevId = cardIds[Number(destination?.index)];
    const nextId = cardIds[Number(destination?.index) + 1];

    return nextId
      ? (parseFloat(cards[nextId].meta.order as string) +
          parseFloat(cards[prevId].meta.order as string)) /
          2
      : parseFloat(cards[prevId].meta.order as string) + 1;
  }

  // case: all other cases

  const nextId = cardIds[Number(destination?.index)];
  const prevId = cardIds[Number(destination?.index) - 1];

  return (
    (parseFloat(cards[nextId].meta.order as string) +
      parseFloat(cards[prevId].meta.order as string)) /
    2
  );
}
