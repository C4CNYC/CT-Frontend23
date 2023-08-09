import { add } from "date-fns";

export const ASSIGNMENT_DATE_PARSER = (date?: Date, increment: number = 0) =>
  date ? new Date(date) : add(new Date(), { days: increment });
