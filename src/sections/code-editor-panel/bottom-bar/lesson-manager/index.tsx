import { type FC, useState } from "react";

import SkeletonDrawer from "../skeleton-drawer";
import LessonManagerButton from "./lesson-manager-button";
import LessonManagerSideBar from "./lesson-manger-side-bar";
import LessonItem from "./lesson-item";

import { type BaseResponseInterface } from "@utils";
import { type ILesson } from "src/redux/interfaces/content.interface";
import { type IChallanges } from "src/redux/interfaces/challenges.interface";

export interface LessonManagerProps {
  lesson?: ILesson & BaseResponseInterface
  linkHref: string
  data?: IChallanges & BaseResponseInterface
  isLoading: boolean
  onChooseLesson: (lessonId: string, moduleId: string) => void
}

const LessonManager: FC<LessonManagerProps> = ({
  lesson,
  onChooseLesson,
  linkHref,
  isLoading,
  data 
})=> {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <>
      <LessonManagerButton
        onOpen={() => setIsOpenDrawer(true)}
        lesson={lesson}
      />

      <LessonManagerSideBar
        onClose={() => setIsOpenDrawer(false)}
        isOpen={isOpenDrawer}
        linkHref={linkHref}
      >
        {isLoading
          ? <SkeletonDrawer />
          : data?.units.map((module) => (
            <LessonItem key={module.id} module={module} onClick={onChooseLesson} />
          ))
        }
      </LessonManagerSideBar>
    </>
  );
};

export default LessonManager;
