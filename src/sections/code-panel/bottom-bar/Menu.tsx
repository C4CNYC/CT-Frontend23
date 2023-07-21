import nextLink from "next/link";
import { useContext, useState } from "react";

import { BsFolder2Open } from "react-icons/bs";
import { GiSave } from "react-icons/gi";
import { IoSaveOutline } from "react-icons/io5";
import { MdOutlinePhotoLibrary, MdOutlineUpload } from "react-icons/md";

import {
  Chip,
  Link,
  SpeedDial,
  SpeedDialAction,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Box } from "@mui/system";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";

import { CodePanelContext } from "../context/CodePanel.context";
import PublishModal from "./modals/Publish";

const tooltipRewrite = makeStyles(() => ({
  tooltip: {
    color: "#364954",
    background: "transparent",
  },
}));

const Menu = (): React.ReactElement => {
  const classes = tooltipRewrite();
  const { code, language } = useContext(CodePanelContext);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [speedDial, setSpeedDial] = useState<boolean>(false);
  const { publicPage } = useContext(CodePanelContext);
  const openSpeedDial = () => {
    setSpeedDial(true);
  };
  const closeSpeedDial = () => {
    setSpeedDial(false);
  };

  const actions = [
    {
      icon: (
        <PublishModal isPublic={true} code={code} language={language}>
          <MdOutlineUpload size="24px" color="#FBDD3F" />
        </PublishModal>
      ),
      name: "Publish to Gallery",
      color: "#FBDD3F",
      isPublic: true,
    },
    {
      icon: (
        <Link
          component={nextLink}
          href={STUDENT_PATH_DASHBOARD.gallery.publicProject}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MdOutlinePhotoLibrary size="22px" color="#FBDD3F" />
        </Link>
      ),
      name: "Go to Gallery",
      color: "#FBDD3F",
      isPublic: true,
    },

    {
      icon: (
        <PublishModal isPublic={false} code={code} language={language}>
          <IoSaveOutline size="22px" color="#43D4DD" />
        </PublishModal>
      ),
      name: "Save to 'My Folder'",
      color: "#43D4DD",
      isPublic: false,
    },
    {
      icon: (
        <Link
          component={nextLink}
          href={STUDENT_PATH_DASHBOARD.gallery.privateProject}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BsFolder2Open size="22px" color="#43D4DD" />
        </Link>
      ),
      name: "Open 'My Folder'",
      color: "#43D4DD",
      isPublic: false,
    },
  ];
  return (
    <Box
      className="tourBottombarMenu"
      sx={{ width: "50px", display: !isDesktop ? "none" : "flex" }}
    >
      {publicPage ?? !isDesktop ? null : (
        <SpeedDial
          aria-describedby={"popper"}
          ariaLabel="SpeedDial menu bottom"
          open={speedDial}
          onClose={closeSpeedDial}
          onOpen={openSpeedDial}
          FabProps={{
            size: "small",
            sx: {
              background: speedDial ? "#155275" : "white",
              boxShadow: "none",
              border: !speedDial ? "2px solid #b3b3b3" : "none",
              "&:hover": {
                background: "#155275",
              },
            },
          }}
          sx={{
            position: "absolute",
            bottom: "10px",
            right: 18,
            zIndex: 20,
            "& .MuiSpeedDial-actions": {
              gap: 0,
            },
          }}
          direction="up"
          icon={
            <GiSave
              size="20px"
              style={{ color: speedDial ? "#43D4DD" : "#b3b3b3" }}
            />
          }
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              TooltipClasses={{ tooltip: classes.tooltip }}
              tooltipTitle={
                <Box sx={{ position: "relative" }}>
                  <Chip
                    label={action.isPublic ? "Public" : "Private"}
                    sx={{
                      position: "absolute",
                      left: "-80px",
                      top: "calc(50% - 10px)",
                      zIndex: 1000,
                      background: action.color,
                      height: "20px",
                      width: "68px",
                      "& .MuiChip-label": {
                        whiteSpace: "nowrap",
                      },
                    }}
                  />
                  <Typography variant="subtitle2">{action.name}</Typography>
                </Box>
              }
              FabProps={{
                size: "small",
                sx: {
                  boxShadow: "none",
                  background: "#155275",
                  display: "flex",
                  mb: "0px",
                  "&:hover": {
                    background: "#155275",
                  },
                },
              }}
            />
          ))}
        </SpeedDial>
      )}
    </Box>
  );
};

export default Menu;
