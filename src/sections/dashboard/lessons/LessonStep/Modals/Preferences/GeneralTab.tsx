import { Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";

import { RHFSelect, RHFSwitch, RHFTextField } from "@components";
import { LessonContentComplexity } from "src/redux/services/enums/lesson-content-complexity.enum";

export const GeneralTab = (): React.ReactElement => {
  return (
    <Grid item xs={12} md={8}>
      <Stack>
        <RHFTextField sx={{ mb: 3 }} name="title" label="Title" />
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          sx={{ mb: 3 }}
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          }}
        >
          <RHFTextField name="slug" label="Slug" />
          <RHFSelect native name="complexity" label="Complexity">
            {Object.keys(LessonContentComplexity).map((c) => (
              <option
                key={
                  LessonContentComplexity[
                    c as keyof typeof LessonContentComplexity
                  ]
                }
                value={
                  LessonContentComplexity[
                    c as keyof typeof LessonContentComplexity
                  ]
                }
              >
                {c}
              </option>
            ))}
          </RHFSelect>
        </Box>

        <RHFTextField
          multiline
          rows={3}
          name="description"
          label="Description"
        />

        <Stack mt={2} direction="row" justifyContent="end">
          <RHFSwitch name="active" label="Active" />
          <RHFSwitch name="draft" label="Draft" />
        </Stack>
      </Stack>
    </Grid>
  );
};
