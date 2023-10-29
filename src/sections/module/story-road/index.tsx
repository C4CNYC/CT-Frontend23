import { useMediaQuery, useTheme } from "@mui/material";

import { BaseResponseInterface } from "@utils";
import { ILesson } from "src/redux/interfaces/content.interface";

import RoadItem from "./RoadItem";
import RoadItemMobile from "./RoadItemMobile";

interface StoryRoadProps {
  lessons: Array<ILesson & BaseResponseInterface>;
  lastActiveIndex: number;
}

const StoryRoad = ({ lessons, lastActiveIndex }: StoryRoadProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(660));

  return (
    <>
      {isMobile
        ? lessons.map((l, i) => (
            <RoadItemMobile
              key={l.id}
              locked={i === lastActiveIndex || i > lastActiveIndex}
              compleated={l.progress ? l.progress > 90 : false}
              progress={l.progress ?? 0}
              lastActive={lastActiveIndex === i}
              firstItem={i === 0}
              lastItem={i === lessons.length - 1}
              name={l.name}
              description={l.description}
              lessonId={l.id}
            />
          ))
        : lessons.map((l, i) => (
            <RoadItem
              key={l.id}
              locked={i === lastActiveIndex || i > lastActiveIndex}
              compleated={l.progress ? l.progress > 90 : false}
              progress={l.progress ?? 0}
              oddItem={!!(i % 2)}
              firstItem={i === 0}
              lastActive={lastActiveIndex === i}
              lastItem={i === lessons.length - 1}
              name={l.name}
              description={l.description}
              lessonId={l.id}
            />
          ))}
    </>
  );
};

export default StoryRoad;
