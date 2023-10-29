import { useEffect, useState } from "react";

import { HiMenuAlt2 } from "react-icons/hi";

import { Button, Stack } from "@mui/material";

import { BaseResponseInterface } from "@utils";
import { ILesson } from "src/redux/interfaces/content.interface";

import { LESSON_LIST_SX } from "./constants";
import RoadIcon from "./icons/RoadIcon";
import LessonItem from "./lesson-item";
import StoryRoad from "./story-road";

interface ILessonListProps {
  lessons: Array<ILesson & BaseResponseInterface>;
  unitId: string;
  lastVisitedData: string;
}

export default function LessonsList({
  lessons,
  unitId,
  lastVisitedData,
}: ILessonListProps): React.ReactElement {
  const [isList, setIsList] = useState(true);
  const [lastActiveIndex, setLastActiveIndex] = useState(0);

  useEffect(() => {
    if (lessons) {
      lessons.map((el, i) => {
        if (el.id === lastVisitedData) {
          setLastActiveIndex(i);
        }
        return;
      });
    }
  }, [lessons]);

  return (
    <Stack sx={LESSON_LIST_SX}>
      <Stack direction="row" alignSelf="flex-end" mr={-4} gap={0.5}>
        <Button
          onClick={() => {
            setIsList(true);
          }}
          sx={{
            minWidth: "auto",
            background: "#fff",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <HiMenuAlt2 size={25} color={isList ? "#EE467A" : "#C4C4C4"} />
        </Button>
        <Button
          onClick={() => {
            setIsList(false);
          }}
          sx={{
            minWidth: "auto",
            background: "#fff",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          <RoadIcon
            width={23}
            height={23}
            color={!isList ? "#EE467A" : "#C4C4C4"}
          />
        </Button>
      </Stack>
      {isList ? (
        lessons.map((l, i) => (
          <LessonItem
            lesson={l}
            unitId={unitId}
            lastVisitedData={l.id === lastVisitedData}
            key={l.id}
            locked={i >= lastActiveIndex + 1}
          />
        ))
      ) : (
        <StoryRoad lessons={lessons} lastActiveIndex={lastActiveIndex} />
      )}
    </Stack>
  );
}
