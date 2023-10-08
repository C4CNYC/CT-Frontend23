import { differenceInDays } from "date-fns";
import { Timestamp } from "firebase/firestore";

export function convertTimestamp(timestamp?: Timestamp): string {
  if (!timestamp) return "";
  const dateNow = new Date();
  const date = timestamp.toDate();

  if (differenceInDays(date, dateNow) > 1) {
    return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
  } else {
    return (
      `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}` +
      "." +
      `${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`
    );
  }
}
