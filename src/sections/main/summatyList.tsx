import { Divider, Stack } from "@mui/material";

import SummaryItem from "./summaryItem";

export default function SummatyList(): React.ReactElement {
  const sumDate = [
    {
      title: "Course Completion",
      subTitle: "72%",
      updated: true,
      color: "secondary",
      iconColor: "blue",
      icon: "fluent:tasks-app-28-filled",
    },
    {
      title: "Modules Submited",
      subTitle: "6/10",
      updated: false,
      color: "primary",
      iconColor: "green",
      icon: "ep:success-filled",
    },
    {
      title: "Weeks Left",
      subTitle: "2 weeks",
      updated: false,
      color: "warning",
      iconColor: "orange",
      icon: "material-symbols:nest-clock-farsight-analog-rounded",
    },
  ];
  return (
    <Stack
      divider={
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderStyle: "dashed" }}
        />
      }
      direction="row"
      spacing={1}
      sx={{ py: 2, boxShadow: 2, borderRadius: 2 }}
    >
      {sumDate.map((item) => (
        <SummaryItem
          title={item.title}
          subTitle={item.subTitle}
          updated={item.updated}
          color={item.color}
          icon={item.icon}
          iconColor={item.iconColor}
          key={item.title}
        />
      ))}
    </Stack>
  );
}
