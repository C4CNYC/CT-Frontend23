import { Stack } from "@mui/material";

import LessonItem from "./lesson-item";

export default function LessonsList(): React.ReactElement {
  return (
    <Stack gap={2} mt={4}>
      <LessonItem
        lesson={{
          active: true,
          description:
            "some random text some random text some random text some random text some random text",
          id: "",
          name: "Lesson name",
        }}
        unitId="12909123091"
      />
      <LessonItem
        lesson={{
          active: true,
          description:
            "some random text some random text some random text some random text some random text",
          id: "",
          name: "Lesson name",
        }}
        unitId="12909123091"
      />
      <LessonItem
        lesson={{
          active: true,
          description:
            "some random text some random text some random text some random text some random text",
          id: "",
          name: "Lesson name",
        }}
        unitId="12909123091"
      />
    </Stack>
  );
}
