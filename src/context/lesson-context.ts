import { createContext } from "react";

import { ILessonUserStatus } from "@types";

// We will ensure that the context is never undefined by always providing a value in the provider
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion

export const LessonUserContext = createContext<ILessonUserStatus[]>([]);
