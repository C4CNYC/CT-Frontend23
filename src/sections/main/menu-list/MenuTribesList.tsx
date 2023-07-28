import nextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { FaCampground, FaPlus } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";

import { Button, Divider, Link, MenuItem, Stack } from "@mui/material";

import { MenuPopover } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { Role } from "src/redux/services/enums/role.enum";
import { useGetClassesQuery } from "src/redux/services/student/classes-manager";

import JoinClassModal from "./JoinTribeModal";
import TribeListItem from "./TribesListItem";

export default function MenuTribesList(): React.ReactElement {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const { data } = useGetClassesQuery({});
  const { query } = useRouter();

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };
  return (
    <Stack>
      <Divider sx={{ borderBottomWidth: "4px", mb: 2, mt: 1, ml: 2 }} />
      <Stack
        sx={{
          gap: 1,
          maxHeight: "185px",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            width: 0,
          },
        }}
      >
        <Button
          onClick={handleOpenPopover}
          sx={(theme) => ({
            alignSelf: "flex-start",
            borderRadius: 1,
            minWidth: "30px",
            p: 0,
            ml: 2,
            minHeight: "30px",
            height: "30px",
            color: theme.palette.info.light,
            border: `2px solid ${theme.palette.info.light}`,
          })}
        >
          <FaPlus size={20} />
        </Button>
        <Stack gap={1} ml={2}>
          {data?.data.map((c, i) => {
            if (i < 4) {
              return (
                <TribeListItem
                  active={c.id === query.id}
                  key={c.id}
                  classItem={c}
                />
              );
            }
          })}
        </Stack>
      </Stack>
      <Divider sx={{ borderBottomWidth: "4px", mt: 2, ml: 2, mb: 1.5 }} />
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
              Create a group
            </MenuItem>
          </Link>
        </RoleBasedGuard>
        <JoinClassModal>
          <MenuItem>
            <FaCampground size="20px" />
            Join a group
          </MenuItem>
        </JoinClassModal>
      </MenuPopover>
    </Stack>
  );
}
