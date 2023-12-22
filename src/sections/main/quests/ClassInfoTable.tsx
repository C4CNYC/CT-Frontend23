import NextLink from "next/link";
import { useState } from "react";

import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { CiMountain1, CiShare1 } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";

import {
  Badge,
  Button,
  Link,
  MenuItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";

import { Iconify, MenuPopover } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { BaseResponseInterface } from "@utils";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { useAuthContext } from "src/auth/useAuthContext";
import CustomTabPanel, {
  customTabProps,
} from "src/components/custom-tab-panel";
import { IClass } from "src/redux/interfaces/class.interface";
import { Role } from "src/redux/services/enums/role.enum";
import { useTranslate } from "src/utils/translateHelper";

import DetailsTab from "./details-card";
import MemberCard from "./members-card";
import ProgressCard from "./progress-card";
import QuestsTab from "./quest-card";

interface IClassInfoTable {
  classData: IClass & BaseResponseInterface;
}

export default function ClassInfoTable({ classData }: IClassInfoTable) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = useState(0);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const translate = useTranslate();
  const { user } = useAuthContext();
  const isStudent = user?.role === Role.Student;

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const addQuestPagePath = STUDENT_PATH_DASHBOARD.class.addQuest(classData.id, {
    schoolId: classData?.school?.id as string,
  });

  return (
    <Stack sx={{ px: 2, pt: 1, flexGrow: 1 }}>
      <Stack direction="row" alignItems="center" pb={2}>
        <Tabs
          value={value}
          onChange={(_: any, newValue: number) => {
            setValue(newValue);
          }}
          scrollButtons={false}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#43D4DD",
            },
          }}
        >
          <Tab
            label={!isMobile && translate("quests")}
            icon={<CiMountain1 size={20} />}
            {...customTabProps(0)}
            sx={{ fontSize: "1.1rem" }}
          />
          {!isStudent ? (
            <Tab
              label={!isMobile && translate("members")}
              icon={<IoPeopleOutline size={20} />}
              sx={{ fontSize: "1.1rem" }}
              {...customTabProps(1)}
            />
          ) : null}
          <Tab
            label={!isMobile && translate("details")}
            icon={<IoSettingsOutline size={20} />}
            sx={{ fontSize: "1.1rem" }}
            {...customTabProps(isStudent ? 1 : 2)}
          />
          <Tab
            label={!isMobile && translate("progress")}
            icon={<GiProgression size={20} />}
            sx={{ fontSize: "1.1rem" }}
            {...customTabProps(isStudent ? 2 : 3)}
          />
        </Tabs>
        <Stack
          direction="row"
          sx={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "end",
            gap: 2,
          }}
        >
          {/* <Link
            noWrap
            href={STUDENT_PATH_DASHBOARD.gallery.root}
            variant="body2"
            underline="none"
            sx={GALLERY_SX}
          >
            <Iconify icon="solar:gallery-wide-broken" width={20} />
            {!isMobile && (
              <Typography color="#637381" fontSize="1.1rem" mr="10px">
                {translate("gallery")}
                <CiShare1 size={15} style={{ margin: "0 0 3px 3px" }} />
              </Typography>
            )}
          </Link> */}
          <RoleBasedGuard roles={[Role.Owner, Role.Admin, Role.Manager]}>
            <Button
              onClick={handleOpenPopover}
              sx={{
                gap: 1,
                p: isMobile ? 1 : "",
                minWidth: 0,
                whiteSpace: "nowrap",
              }}
              variant="outlined"
              color="info"
            >
              <FaPlus size={15} style={{ marginBottom: "2px" }} />
              {!isMobile && translate("actions_add_quest")}
            </Button>
          </RoleBasedGuard>
        </Stack>
      </Stack>
      <CustomTabPanel value={value} index={0}>
        <QuestsTab
          classId={classData.id}
          schoolId={classData.school?.id ?? ""}
          activeTab={value === 0}
        />
      </CustomTabPanel>
      {!isStudent ? (
        <CustomTabPanel value={value} index={1}>
          <MemberCard activeTab={value === 1} />
        </CustomTabPanel>
      ) : null}
      <CustomTabPanel value={value} index={isStudent ? 1 : 2}>
        <DetailsTab classData={classData} activeTab={value === 1} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={isStudent ? 2 : 3}>
        <ProgressCard activeTab={value === 2 || value === 3} />
      </CustomTabPanel>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        disabledArrow
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: -5, horizontal: 5 }}
        sx={{ p: 2 }}
      >
        <Link
          component={NextLink}
          href={addQuestPagePath}
          underline="none"
          color="initial"
        >
          <MenuItem>
            <SiGoogleclassroom size={10} />
            {translate("home_assign_course")}
          </MenuItem>
        </Link>
        <RoleBasedGuard roles={[Role.Admin, Role.Manager, Role.Owner]}>
          <MenuItem sx={{ pl: "5px" }}>
            <Badge
              sx={BADGE_SX}
              badgeContent={
                <Typography sx={{ fontSize: "11px", fontWeight: 700 }}>
                  {translate("coming_soon")}
                </Typography>
              }
              color="success"
            >
              <AiOutlineFundProjectionScreen size={20} />
              {translate("home_assign_project")}
            </Badge>
          </MenuItem>
        </RoleBasedGuard>
      </MenuPopover>
    </Stack>
  );
}

const BADGE_SX = {
  "& .MuiBadge-badge": {
    left: 55,
    top: 28,
    padding: 0,
    height: 14,
    width: "85px",
  },
};

const GALLERY_SX = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  color: "inherit",
  maxWidth: 360,
  ml: 3.25,
  justifyContent: "center",
};
