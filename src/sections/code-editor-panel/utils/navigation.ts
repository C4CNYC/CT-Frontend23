import { BaseResponseInterface } from "@utils";
import { Unit } from "src/redux/interfaces/challenges.interface";
import { ILesson } from "src/redux/interfaces/content.interface";

export function getNextLessonId(
  courseContent: Unit[],
  currentLessonId: string,
  currentUnitId: string
): {
  path: string;
  lessonId: string;
  unitId: string;
} | null {
  const units = courseContent.map((c) => c.id);
  const content = courseContent.reduce<
    Record<string, Array<ILesson & BaseResponseInterface>>
  >(
    (acc, curr) => ({
      ...acc,
      [curr.id]: curr.lessons,
    }),
    {}
  );
  const moduleIndex = units.findIndex((u) => u === currentUnitId);
  const lessonIndex = content[currentUnitId].findIndex(
    (l) => l.id === currentLessonId
  );
  if (content[currentUnitId].length > lessonIndex + 1) {
    return {
      path: `${currentUnitId}/${content[currentUnitId][lessonIndex + 1].id}`,
      unitId: currentUnitId,
      lessonId: content[currentUnitId][lessonIndex + 1].id,
    };
  }
  if (moduleIndex + 1 === units.length) return null;
  const nextUnitIndex = units[moduleIndex + 1];
  return {
    path: `${nextUnitIndex}/${content[nextUnitIndex][0].id}`,
    unitId: nextUnitIndex,
    lessonId: content[nextUnitIndex][0].id,
  };
}
