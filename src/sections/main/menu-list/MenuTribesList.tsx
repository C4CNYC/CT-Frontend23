import nextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { t } from "i18next";
import { FaCampground } from "@react-icons/all-files/fa/FaCampground";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { IoPeople } from "@react-icons/all-files/io5/IoPeople";

import {
  Button,
  Divider,
  Link,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";

import { MenuPopover, Scrollbar, useSettingsContext } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { StyledSubheader } from "src/components/nav-section/vertical/styles";
import { Role } from "src/redux/services/enums/role.enum";
import { useGetStudentClassesQuery } from "src/redux/services/manager/classes-student";
import { useTranslate } from "src/utils/translateHelper";

import JoinClassModal from "./JoinTribeModal";
import TribeListItem from "./TribesListItem";
import { getAddTribeButtonSx } from "./constants";

export default function MenuTribesList(): React.ReactElement {
  const theme = useTheme();
  const { themeLayout } = useSettingsContext();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isNavMini = themeLayout === "mini" && !isMobile;
  const translate = useTranslate();

  const [containerHeignt, setContainerHeignt] = useState("auto");
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const { data, isLoading } = useGetStudentClassesQuery({});
  const { query } = useRouter();

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  useEffect(() => {
    if (data) {
      setContainerHeignt(data.data.length < 4 ? "auto" : "150px");
    }
  }, [isLoading]);
  return (
    <Stack sx={{ width: "100%" }}>
      {!isNavMini && (
        <Divider
          sx={{
            ml: 2,
          }}
        />
      )}
      <StyledSubheader sx={{ background: "transparent" }}>
        {translate("sidebar_menu_tribes")}
      </StyledSubheader>
      <Stack
        sx={{
          gap: 1,
        }}
      >
        {isLoading ? (
          <Stack gap={1} ml={isNavMini ? 0 : 2} sx={{ maxWidth: "150px" }}>
            <Skeleton variant="rounded" height={40} width={40} />
            {Array.from("12").map((el) => (
              <Skeleton variant="rounded" height={32} key={el} />
            ))}
          </Stack>
        ) : (
          <>
            <Button
              onClick={handleOpenPopover}
              sx={(theme) => ({ ...getAddTribeButtonSx(theme, isNavMini) })}
            >
              <FaPlus size={20} />
            </Button>
            <Stack
              sx={{
                gap: 1,
                height: containerHeignt,
                width: "auto",
              }}
            >
              <Scrollbar sx={{ overflowX: "unset" }}>
                <Stack
                  pl={2}
                  gap={1}
                  alignItems={isNavMini ? "center" : "start"}
                >
                  {data?.data.map((c, i) => {
                    return (
                      <TribeListItem
                        active={c.id === query.id}
                        key={c.id}
                        classItem={c}
                      />
                    );
                  })}
                </Stack>
              </Scrollbar>
            </Stack>
          </>
        )}
      </Stack>
      {!isNavMini && (
        <Divider
          sx={{
            mb: 0,
            mt: 2,
            ml: 2,
          }}
        />
      )}
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        disabledArrow
        transformOrigin={{ vertical: -5, horizontal: "center" }}
      >
        <RoleBasedGuard roles={[Role.Admin, Role.Manager, Role.Owner]}>
          <Link
            component={nextLink}
            href={STUDENT_PATH_DASHBOARD.class.createClass}
            onClick={handleClosePopover}
            underline="none"
            sx={{ color: "inherit" }}
          >
            <MenuItem>
              <IoPeople size="20px" />
              {translate("tribes_create_group")}
            </MenuItem>
          </Link>
        </RoleBasedGuard>
        <JoinClassModal>
          <MenuItem>
            <FaCampground size="20px" />
            {translate("tribes_join_group")}
          </MenuItem>
        </JoinClassModal>
      </MenuPopover>
    </Stack>
  );
}
