import { Button, Divider, Stack } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import TribeListItem from "./TribesListItem";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { Role } from "src/redux/services/enums/role.enum";
import { useGetClassesQuery } from "src/redux/services/student/classes-manager";
import { useRouter } from "next/router";

export default function MenuTribesList(): React.ReactElement {
  const { data: tribes } = useGetClassesQuery({});
  const { query } = useRouter();
  return (
    <Stack sx={{}}>
      <Divider sx={{ borderBottomWidth: "4px", mb: 2, ml: 2 }} />

      <Stack
        sx={{
          gap: 1,
          maxHeight: "150px",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            width: 0,
          },
        }}
      >
        <RoleBasedGuard
          roles={[
            Role.Owner,
            Role.Admin,
            Role.Manager
          ]}
        >
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
        </RoleBasedGuard>
        <Stack gap={1} ml={2}>
          {
            tribes?.data.map(t => (
              <TribeListItem active={t.id === query.id} key={t.id} tribe={t} />
            ))
          }
        </Stack>
      </Stack>
      <Divider sx={{ borderBottomWidth: "4px", mt: 2, ml: 2 }} />
    </Stack>
  );
}
