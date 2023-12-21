import NextLink from "next/link";
import { useRouter } from "next/router";

import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { MdIosShare } from "react-icons/md";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { IModuleContent } from "src/redux/interfaces/content.interface";
import { useTranslate } from "src/utils/translateHelper";

import ActionsBlock from "./ActionsBlock";
import ImageLightBox from "./ImageLightBox";
import ModuleProgress from "./ModuleProgress";

interface IModuleItemProps {
  unit: IModuleContent;
  lastVisited: boolean;
}

export default function ModuleItem({
  unit,
  lastVisited,
}: IModuleItemProps): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  const { query } = useRouter();
  const translate = useTranslate();

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      sx={{
        background:
          theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.paper,
        // height: isMobile ? "auto" : "200px",
        position: "relative",
        zIndex: 5,
        borderRadius: "25px",
      }}
    >
      {isMobile ? (
        <IconButton sx={{ alignSelf: "flex-end", mb: -4, mt: 0.5, mr: 0.5 }}>
          <MdIosShare />
        </IconButton>
      ) : null}
      <ImageLightBox
        sx={isMobile ? { alignSelf: "center" } : {}}
        image={unit.avatar ?? "/assets/projects/bg1.png"}
      >
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
            [theme.breakpoints.down(800)]: {
              m: 2,
              width: "200px",
              minHeight: "200px",
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
        <Box>
          <Typography
            variant="h5"
            noWrap
            gutterBottom
            sx={{
              maxWidth: { lg: "200px", xl: "300px" },
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
        <Stack
          direction={isMobile ? "column-reverse" : "row"}
          alignItems="center"
        >
          <Button
            component={NextLink}
            href={`${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
              query.id as string
            )}?${unit.id}`}
            sx={{
              display: "inline-flex",
              alignSelf: isMobile ? "flex-end" : "flex-start",
              gap: 0.3,
              fontSize: "1.0rem",
              color: theme.palette.mode === "light" ? "#364954" : "#fff",
              background: lastVisited
                ? "-webkit-linear-gradient(150deg,#61F3F3,#00B8D9)"
                : "",
              "-webkit-background-clip": lastVisited ? "text" : "",
              "-webkit-text-fill-color": lastVisited ? "transparent" : "",
              "&:hover": {},
            }}
            variant="text"
          >
            {translate("get_coding", {
              time: lastVisited ? "Again" : "",
            })}
            <svg width="0" height="0">
              <linearGradient
                id="blue-gradient"
                x1="100%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop stopColor="#61F3F3" offset="0%" />
                <stop stopColor="#00B8D9" offset="100%" />
              </linearGradient>
            </svg>
            <HiOutlineArrowNarrowRight
              size={24}
              style={lastVisited ? { stroke: "url(#blue-gradient)" } : {}}
            />
          </Button>
          <Link
            href={STUDENT_PATH_DASHBOARD.courses.unit(
              query.id as string,
              unit.id
            )}
            component={NextLink}
            sx={{
              ml: isMobile ? 0 : 3,
              mt: isMobile ? 2 : 0,
              color: "inherit",
              alignSelf: isMobile ? "flex-start" : "center",
            }}
          >
            {translate("actions_see_more")}
          </Link>
        </Stack>
      </Stack>
      {!isMobile ? (
        <>
          <Divider
            orientation="horizontal"
            sx={{ borderRightWidth: 2, my: 4 }}
          />
          <ActionsBlock
            certificate={unit.initial_enrolled}
            likes={unit.initial_likes}
            rated={unit.initial_stars}
          />
        </>
      ) : null}
    </Stack>
  );
}
