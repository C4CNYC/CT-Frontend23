import { useCallback, useMemo } from "react";

import { ActivityStatus } from "../types/activity-status";
import { PermissionError } from "../types/errors/permission-error";
import { RoomActivity } from "../types/room-activity";
import { useSocket } from "./useSocket";

export function useRealtimeConnection() {
  const socket = useSocket();

  const getOwnActivity = useCallback<
    () => Promise<ActivityStatus>
  >(async () => {
    return await new Promise((resolve) => {
      socket.emit("getOwnActivityStatus", (activityStatus: ActivityStatus) => {
        resolve(activityStatus);
      });
    });
  }, [socket]);

  const getActivityOfRoom = useCallback<
    (roomId: string) => Promise<RoomActivity>
  >(
    async (roomId) => {
      return await new Promise((resolve, reject) => {
        socket.emit(
          "getActivityStatus",
          roomId,
          (activityStatus: RoomActivity | PermissionError) => {
            if (!("error" in activityStatus)) {
              resolve(activityStatus);
            } else {
              reject(activityStatus);
            }
          }
        );
      });
    },
    [socket]
  );

  const onActivityStatusAvailable = useCallback<
    (callback: (roomId: string, roomActivity: RoomActivity) => void) => void
  >(
    (callback) => {
      socket.on("activityStatusAvailable", callback);
    },
    [socket]
  );

  const offActivityStatusAvailable = useCallback<
    (callback?: (roomId: string, roomActivity: RoomActivity) => void) => void
  >(
    (callback) => {
      socket.off("activityStatusAvailable", callback);
    },
    [socket]
  );

  const onActivityStatusChange = useCallback<
    (callback: (userId: string, activityStatus: ActivityStatus) => void) => void
  >(
    (callback) => {
      socket.on("activityStatus", callback);
    },
    [socket]
  );

  const offActivityStatusChange = useCallback<
    (
      callback?: (userId: string, activityStatus: ActivityStatus) => void
    ) => void
  >(
    (callback) => {
      socket.off("activityStatus", callback);
    },
    [socket]
  );

  return useMemo(
    () => ({
      socket,
      getOwnActivity,
      getActivityOfRoom,
      onActivityStatusAvailable,
      offActivityStatusAvailable,
      onActivityStatusChange,
      offActivityStatusChange,
    }),
    [
      socket,
      getOwnActivity,
      getActivityOfRoom,
      onActivityStatusAvailable,
      offActivityStatusAvailable,
      onActivityStatusChange,
      offActivityStatusChange,
    ]
  );
}
