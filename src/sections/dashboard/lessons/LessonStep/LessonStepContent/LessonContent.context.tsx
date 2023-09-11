import { createContext } from "react";

interface ILessonContentContext {
  locked: boolean;
  lockedHandler: (locked: boolean) => void;
}

export const LessonContentContext = createContext<ILessonContentContext>({
  locked: false,
  lockedHandler: () => {
    throw new Error("pls provide lockedHandler to LessonContentContext");
  },
});
