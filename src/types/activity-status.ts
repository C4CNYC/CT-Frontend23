export enum ActivityStatus {
  // Activity in the past <2 minutes
  ACTIVE = "ACTIVE",
  // Activity in the past <5 minutes
  INACTIVE = "INACTIVE",
  // Activity in the past <15 minutes
  IDLE = "IDLE",
  // No activity in the past >15 minutes
  AWAY = "AWAY",
}
