import NextLink from "next/link";
import { useRouter } from "next/router";

import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import {
  Box,
  Button,
  Divider,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import {
  IModuleContent,
  LastVisitedData,
} from "src/redux/interfaces/content.interface";

import ActionsBlock from "./ActionsBlock";
import ImageLightBox from "./ImageLightBox";
import ModuleProgress from "./ModuleProgress";

interface IModuleItemProps {
  unit: IModuleContent;
  lastVisitedData?: LastVisitedData;
}

export default function ModuleItem({
  unit,
  lastVisitedData,
}: IModuleItemProps): React.ReactElement {
  const theme = useTheme();
  const { query } = useRouter();

  return (
    <Stack
      direction="row"
      sx={{
        background: "#fff",
        height: "200px",
        position: "relative",
        zIndex: 5,
        borderRadius: "25px",
      }}
    >
      <ImageLightBox image={unit.avatar ?? "/assets/projects/bg1.png"}>
        <Box
          sx={{
            flexShrink: "0",
            borderRadius: "25px 25px 0 25px",
            overflow: "hidden",
            width: "150px",
            height: "100%",
            background: `no-repeat url(${
              unit.avatar ?? "/assets/projects/bg1.png"
            }) center / cover`,
            position: "relative",
            [theme.breakpoints.down(1050)]: {
              width: "100px",
            },
            [theme.breakpoints.down(450)]: {
              width: "50px",
            },
          }}
        />
      </ImageLightBox>
      <Stack
        sx={{
          p: 2,
          pr: 3,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <ModuleProgress progress={unit.progress ?? "2"} />
        <Box maxWidth={400}>
          <Typography
            variant="h4"
            noWrap
            gutterBottom
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordWrap: "break-word",
            }}
          >
            {unit.name}
          </Typography>
          <Typography variant="body1">
            {unit.description && unit.description?.length > 85
              ? `${unit.description.slice(0, 80)} ...`
              : unit.description}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center">
          <Button
            sx={{
              display: "inline-flex",
              alignSelf: "flex-start",
              gap: 1,
              fontSize: "1.2rem",
              color: "#364954",
              "&:hover": {
                background: "none",
              },
            }}
            variant="text"
          >
            Get Coding Again
            <HiOutlineArrowNarrowRight size={24} />
          </Button>
          <Link
            href={STUDENT_PATH_DASHBOARD.courses.unit(
              query.id as string,
              unit.id
            )}
            component={NextLink}
            sx={{ ml: 3, color: "inherit" }}
          >
            See more
          </Link>
        </Stack>
      </Stack>
      <Divider orientation="horizontal" sx={{ borderRightWidth: 2, my: 4 }} />
      <ActionsBlock certificate={2700} likes={12000} rated={4300} />
    </Stack>
  );
}
