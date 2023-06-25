export function convertDuration(duration?: {
  hours: string;
  minutes: string;
}): string | null {
  let durationString = "";
  if (!duration) return null;
  if (duration.hours) {
    durationString = duration.hours + " H";
  }
  if (duration.minutes) {
    durationString = `${durationString ? durationString + " " : ""}${
      duration.minutes
    } M`;
  }

  return durationString;
}
