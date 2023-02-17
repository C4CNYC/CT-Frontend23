export function convertDuration(duration?: { hours: string; minutes: string }) {
  let duration_string = "";
  if (!duration) return null;
  if (duration.hours) {
    duration_string = duration.hours + " H";
  }
  if (duration.minutes) {
    duration_string = `${duration_string ? duration_string + " " : ""}${
      duration.minutes
    } M`;
  }

  return duration_string;
}
