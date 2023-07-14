import { useRouter } from "next/router";

import { FaPlus } from "react-icons/fa";

import { Button, Divider, Stack } from "@mui/material";

import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { Role } from "src/redux/services/enums/role.enum";
import { useGetClassesQuery } from "src/redux/services/student/classes-manager";

import CreateClassModal from "./CreateClassModal";
import TribeListItem from "./TribesListItem";

export default function MenuTribesList(): React.ReactElement {
  const { data } = useGetClassesQuery({});
  const { query } = useRouter();
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
        <RoleBasedGuard roles={[Role.Owner, Role.Admin, Role.Manager]}>
          <CreateClassModal>
            <Button
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
          </CreateClassModal>
        </RoleBasedGuard>
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
    </Stack>
  );
}
