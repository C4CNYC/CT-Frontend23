import { BaseRequestHandler } from "next/dist/server/base-server";

import { ILesson } from "./content.interface";

export interface IProgress {
  completed_lessons: Array<ILesson & BaseRequestHandler>;
  progress_meta: {
    step_ids: string[];
    body: string;
  };
}
