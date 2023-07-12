import { useState } from "react";

import { getYear, isBefore, isSameDay, isSameMonth } from "date-fns";

// utils
import { fDate } from "@utils";

//
import { DateRangePickerProps } from "./types";

// ----------------------------------------------------------------------

type ReturnType = DateRangePickerProps;

export function useDateRangePicker(
  start: Date | null,
  end: Date | null
): ReturnType {
  const [open, setOpen] = useState(false);

  const [endDate, setEndDate] = useState(end);

  const [startDate, setStartDate] = useState(start);

  const isError =
    (startDate &&
      endDate &&
      isBefore(new Date(endDate), new Date(startDate))) ??
    false;

  const currentYear = new Date().getFullYear();

  const startDateYear = startDate ? getYear(startDate) : null;

  const endDateYear = endDate ? getYear(endDate) : null;

  const isCurrentYear =
    currentYear === startDateYear && currentYear === endDateYear;

  const isSameDays =
    startDate && endDate
      ? isSameDay(new Date(startDate), new Date(endDate))
      : false;

  const isSameMonths =
    startDate && endDate
      ? isSameMonth(new Date(startDate), new Date(endDate))
      : false;

  const standardLabel = `${fDate(startDate)} - ${fDate(endDate)}`;

  const getShortLabel = (): string => {
    if (isCurrentYear) {
      if (isSameMonths) {
        if (isSameDays) {
          return fDate(endDate, "dd MMM yy");
        }
        return `${fDate(startDate, "dd")} - ${fDate(endDate, "dd MMM yy")}`;
      }
      return `${fDate(startDate, "dd MMM")} - ${fDate(endDate, "dd MMM yy")}`;
    }
    return `${fDate(startDate, "dd MMM yy")} - ${fDate(endDate, "dd MMM yy")}`;
  };

  const onChangeStartDate = (newValue: Date | null): void => {
    setStartDate(newValue);
  };

  const onChangeEndDate = (newValue: Date | null): void => {
    if (isError) {
      setEndDate(null);
    }
    setEndDate(newValue);
  };

  const onReset = (): void => {
    setStartDate(null);
    setEndDate(null);
  };

  return {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    //
    open,
    onOpen: () => {
      setOpen(true);
    },
    onClose: () => {
      setOpen(false);
    },
    onReset,
    //
    isSelected: !!startDate && !!endDate,
    isError,
    //
    label: standardLabel || "",
    shortLabel: getShortLabel() || "",
    //
    setStartDate,
    setEndDate,
  };
}
