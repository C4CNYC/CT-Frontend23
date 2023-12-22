import { Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";

import { RHFSelect, RHFSwitch, RHFTextField } from "@components";
import { LessonContentComplexity } from "src/redux/services/enums/lesson-content-complexity.enum";
import { useTranslate } from "src/utils/translateHelper";

export const GeneralTab = (): React.ReactElement => {
  const translate = useTranslate();
  return (
    <Grid item xs={12} md={8}>
      <Stack>
        <RHFTextField sx={{ mb: 3 }} name="title" label={translate("title")} />
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
          <RHFTextField name="slug" label={translate("slug")} />
          <RHFSelect native name="complexity" label={translate("complexity")}>
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
          label={translate("description")}
        />

        <Stack mt={2} direction="row" justifyContent="end">
          <RHFSwitch name="active" label={translate("active")} />
          <RHFSwitch name="draft" label={translate("draft")} />
        </Stack>
      </Stack>
    </Grid>
  );
};
