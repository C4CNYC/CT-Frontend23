import { useEffect, useState } from "react";

import { Stack } from "@mui/material";

import { BaseResponseInterface } from "@utils";
import { ILesson } from "src/redux/interfaces/content.interface";

import LessonItem from "./lesson-item";

interface ILessonListProps {
  lessons: (ILesson & BaseResponseInterface)[];
  unitId: string;
  lastVisitedData: string;
}

export default function LessonsList({
  lessons,
  unitId,
  lastVisitedData,
}: ILessonListProps): React.ReactElement {
  const [lastActiveIndex, setLastActiveIndex] = useState(0);

  useEffect(() => {
    if (lessons) {
      lessons.map((el, i) => {
        if (el.id === lastVisitedData) {
          setLastActiveIndex(i);
        }
      });
    }
  }, [lessons]);

  return (
    <Stack gap={2} mt={4}>
      {lessons.map((l, i) => (
        <LessonItem
          lesson={l}
          unitId={unitId}
          lastVisitedData={l.id === lastVisitedData}
          key={l.id}
          locked={i >= lastActiveIndex + 1}
        />
      ))}
    </Stack>
  );
}
