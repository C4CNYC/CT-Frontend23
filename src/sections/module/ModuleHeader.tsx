import { Chip, Stack, Typography } from "@mui/material";

import { Image } from "@components";
import ImageLightBox from "@sections/course/modules-list/module-item/ImageLightBox";

export default function ModuleHeader(): React.ReactElement {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        <Stack>
          <Typography variant="h4" maxWidth={500} mb={2}>
            My Web Resume
          </Typography>
          <Typography variant="body2" maxWidth={500} mb={2}>
            Introduces you to building a website. The outcome is a simple,
            colorful landing page.Introduces you to building a website. The
            outcome is a simple, colorful landing page.
          </Typography>
          <Stack direction="row" gap={2} my={2} flexWrap="wrap">
            <Chip
              label="HTML"
              sx={{
                background: "transparent",
                border: "1px solid #919EAB52",
                borderRadius: 1,
              }}
            />
            <Chip
              label="CSS"
              sx={{
                background: "transparent",
                border: "1px solid #919EAB52",
                borderRadius: 1,
              }}
            />
            <Chip
              label="BASICS"
              sx={{
                background: "transparent",
                border: "1px solid #919EAB52",
                borderRadius: 1,
              }}
            />
            <Chip
              label="AUTO-CHECKED"
              sx={{
                background: "transparent",
                border: "1px solid #919EAB52",
                borderRadius: 1,
              }}
            />
          </Stack>
        </Stack>
        <ImageLightBox image={"/assets/projects/bg1.png"}>
          <Image
            alt="module cover"
            src={"/assets/projects/bg1.png" ?? "/assets/courses/courseImg.png"}
            sx={{
              flexShrink: 0,
              width: "250px",
              height: "250px",
              m: "0 auto",
              borderRadius: "25px",
            }}
          />
        </ImageLightBox>
      </Stack>
    </>
  );
}
