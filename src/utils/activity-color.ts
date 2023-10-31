import { ActivityStatus } from "../types/activity-status";

export function getActivityColor(status: ActivityStatus | undefined) {
  switch (status) {
    case ActivityStatus.ACTIVE:
      return "#0EBE37";
    case ActivityStatus.INACTIVE:
      return "#E27510";
    case ActivityStatus.IDLE:
      return "#C0521A";
    case ActivityStatus.AWAY:
      return "#C4C4C4";
    default:
      return "transparent";
  }
}
