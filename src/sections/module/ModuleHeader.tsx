import {
  Chip,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Image } from "@components";
import ImageLightBox from "@sections/course/modules-list/module-item/ImageLightBox";

import { CHIP_SX, HEADER_IMG_SX, getHeaderContainerSx } from "./constants";

interface IModuleHeaderProps {
  name: string;
  description: string;
  avatar: string | null;
}

export default function ModuleHeader({
  name,
  description,
  avatar,
}: IModuleHeaderProps): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));
  return (
    <Stack sx={getHeaderContainerSx(isMobile, theme)}>
      <Stack>
        <Typography variant="h4" maxWidth={400} mb={2}>
          {name}
        </Typography>
        <Typography variant="body1" maxWidth={400} mb={2}>
          {description}
        </Typography>
        <Stack direction="row" gap={2} my={2} flexWrap="wrap">
          <Chip label="HTML" sx={CHIP_SX} />
          <Chip label="CSS" sx={CHIP_SX} />
          <Chip label="BASICS" sx={CHIP_SX} />
          <Chip label="AUTO-CHECKED" sx={CHIP_SX} />
        </Stack>
      </Stack>
      <ImageLightBox image={avatar ?? "/assets/courses/courseImg.png"}>
        <Image
          alt="module cover"
          src={avatar ?? "/assets/courses/courseImg.png"}
          sx={HEADER_IMG_SX}
        />
      </ImageLightBox>
    </Stack>
  );
}
