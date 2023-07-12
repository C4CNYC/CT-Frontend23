import type { Meta } from "@storybook/react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { DateRangePicker } from "./DateRangePicker";
import { useDateRangePicker } from "./useDateRangePicker";

const Component: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  title: "DateRangePicker",
};

export default Component;

const ExampleComponent = ({ startDate, endDate, ...props }: any) => {
  const {
    startDate: startDateNew,
    endDate: endDateNew,
    onChangeStartDate,
    onChangeEndDate,
    onClose: onClosePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(startDate, endDate);

  return (
    <DateRangePicker
      startDate={startDateNew}
      endDate={endDateNew}
      onChangeEndDate={onChangeEndDate}
      onChangeStartDate={onChangeStartDate}
      onClose={onClosePicker}
      isError={isError}
      shortLabel={shortLabel}
      {...props}
    />
  );
};

export const Default = {
  render: (args: any) => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ExampleComponent {...args} />
    </LocalizationProvider>
  ),
  args: {
    startDate: new Date(
      "Wed Jun 28 2023 15:24:11 GMT+0300 (Eastern European Summer Time)"
    ),
    endDate: new Date(
      "Wed Jul 28 2023 15:24:11 GMT+0300 (Eastern European Summer Time)"
    ),
    variant: "calendar",
    open: true,
  },
};
