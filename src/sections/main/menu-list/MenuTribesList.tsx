import nextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { FaCampground, FaPlus } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";

import {
  Button,
  Divider,
  Link,
  MenuItem,
  Skeleton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";

import { MenuPopover, Scrollbar, useSettingsContext } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { Role } from "src/redux/services/enums/role.enum";
import { useGetStudentClassesQuery } from "src/redux/services/manager/classes-student";
import { useTranslate } from "src/utils/translateHelper";

import JoinClassModal from "./JoinTribeModal";
import TribeListItem from "./TribesListItem";
import { getAddTribeButtonSx } from "./constants";

export default function MenuTribesList(): React.ReactElement {
  const theme = useTheme();
  const { themeLayout } = useSettingsContext();
  const isMobile = useMediaQuery(theme.breakpoints.down(1200));
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
    <Stack>
      {!isNavMini && (
        <Divider
          sx={{
            mb: 2,
            mt: 1,
            ml: 2,
          }}
        />
      )}
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
                  pl={isNavMini ? 0 : 2}
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
      {isNavMini ? (
        <Divider sx={{ margin: "16px auto 8px", width: "24px" }} />
      ) : (
        <Divider sx={{ mt: 2, ml: 2, mb: 1.5 }} />
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
