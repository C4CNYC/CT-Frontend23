import * as React from "react";

import { useSnackbar } from "notistack";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import { useUpdateOrgMemberMutation } from "src/redux/services/admin/members-admin";
import { Role } from "src/redux/services/enums/role.enum";

interface Props {
  userId: string;
  role: Role;
  email: string;
}

export function RoleSelector({
  userId,
  role,
  email,
}: Props): React.ReactElement | null {
  const { enqueueSnackbar } = useSnackbar();
  const [updateUser] = useUpdateOrgMemberMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async (role: Role): Promise<void> => {
    setAnchorEl(null);
    try {
      await updateUser({
        user_id: userId,
        role,
        first_name: "",
        last_name: "",
      }).unwrap();
      enqueueSnackbar(`${email} updated to ${role} `);
    } catch {}
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disabled={role === Role.Owner}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        {role}
      </Button>
      <Menu
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorEl={anchorEl}
        sx={{ padding: "0 !important" }}
      >
        {Object.keys(Role).map((r) =>
          r === "Owner" || role === Role[r as keyof typeof Role] ? null : (
            <MenuItem
              onClick={async () => {
                await handleClose(Role[r as keyof typeof Role]);
              }}
              value={Role[r as keyof typeof Role]}
              sx={{ padding: "5px 40px 5px 20px" }}
              key={r}
            >
              {r}
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
}
