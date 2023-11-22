import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityStatus } from "../types/activity-status";
import { useRealtimeConnection } from "./useRealTimeConnection";
import { RoomActivity } from "../types/room-activity";

export function useRoomActivity(roomId?: string) {
  const [activityStatus, setActivityStatus] = useState<RoomActivity>({});

  const realtimeConnection = useRealtimeConnection();

  useEffect(() => {
    if (roomId) {
      const onActivityStatusAvailable = async (_: string, roomActivity: RoomActivity) => {
        setActivityStatus(roomActivity);
      };

      realtimeConnection.onActivityStatusAvailable(onActivityStatusAvailable);

      return () => {
        realtimeConnection.onActivityStatusAvailable(onActivityStatusAvailable);
      }
    }
    return undefined;
  }, [realtimeConnection, roomId]);

  useEffect(() => {
    if (roomId) {
      const onActivityStatusChange = (userId: string, activityStatus: ActivityStatus) => {
        setActivityStatus((prev) => ({
          ...prev,
          [userId]: activityStatus,
        }));
      };

      realtimeConnection.onActivityStatusChange(onActivityStatusChange);

      return () => {
        realtimeConnection.offActivityStatusChange(onActivityStatusChange);
      }
    }
    return undefined;
  }, [realtimeConnection, roomId]);

  const getActivityStatus = useCallback<((socketId: string) => ActivityStatus | undefined)>((socketId) => {
    return activityStatus[socketId];
  }, [activityStatus]);

  return useMemo(() => ({
    getActivityStatus,
    activityStatus
  }), [getActivityStatus, activityStatus]);
}
