import { RHFTextField } from "@components";

import { INPUT_SX } from "./constants";

const SettingsTab = (): React.ReactElement => {
  return (
    <>
      <RHFTextField sx={INPUT_SX} name="duration" label="Module duration" />
      <RHFTextField
        sx={INPUT_SX}
        name="initial_likes"
        label="Initial likes"
        type="number"
      />
      <RHFTextField
        sx={INPUT_SX}
        name="initial_stars"
        label="Initial stars"
        type="number"
      />
      <RHFTextField
        sx={INPUT_SX}
        name="initial_enrolled"
        label="Initial enrolled"
        type="number"
      />
      <RHFTextField
        sx={INPUT_SX}
        name="teacher_slides"
        label="Teacher slides link"
      />
      <RHFTextField
        sx={INPUT_SX}
        name="teacher_forum"
        label="Teacher forum link"
      />
      <RHFTextField
        sx={INPUT_SX}
        name="lesson_plans"
        label="Lesson plans link"
      />
    </>
  );
};
export default SettingsTab;
