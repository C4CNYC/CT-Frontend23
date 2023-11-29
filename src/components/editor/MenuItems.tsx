import Preferences from "@sections/dashboard/lessons/LessonStep/Modals/Preferences";
import { ChallengeBtn, MediaBtn, SettingsBtn, TipsBtn } from "./controls-btn";
import { Stack, SxProps } from "@mui/material";
import { ILessonContent } from "../../redux/services/interfaces/courseUnits.interface";
import { BaseResponseInterface } from "@utils";
import { Theme } from "@mui/system";
import Validation from "@sections/dashboard/lessons/LessonStep/Modals/Validation";

const MenuItems = ({
  data,
  lessonId,
  style = {},
}: {
  data: (ILessonContent & BaseResponseInterface);
  lessonId: string;
  style?: SxProps<Theme>;
}) => {
  return (
    <Stack
      direction="row"
      sx={{
        maxWidth: "450px",
        gap: 1,
        flexWrap: "wrap",
        justifyContent: "space-between",
        ...style,
      }}
    >
      <Preferences
        defaultValues={{ ...data }}
        contentId={data.id}
        lessonId={lessonId}
        defaultTab={3}
      >
        <TipsBtn />
      </Preferences>
      <Validation
        stepId={data.id}
        stepTitle={data.title}
        setHasValidation={() => {}}
      >
        <ChallengeBtn />
      </Validation>
      <Preferences
        defaultValues={{ ...data }}
        contentId={data.id}
        lessonId={lessonId}
        defaultTab={0}
      >
        <SettingsBtn />
      </Preferences>
      <MediaBtn />
    </Stack>
  )
}

export default MenuItems
