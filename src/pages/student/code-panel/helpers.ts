import { LastVisitedState } from "@pages/student/code-panel/interfaces";
import { LastVisitedBody } from "../../../redux/interfaces/content.interface";

export function isValidLastVisitedData(data: LastVisitedState): data is LastVisitedBody {
  return data.lessonId !== null && data.unitId !== null;
}
