import { useContext } from "react";
import { LessonUserContext } from "src/context/lesson-context";

export function useLessonStatus() {
  return useContext(LessonUserContext)
}
