import { SetStateAction, useState } from "react";

import Hamburger from "hamburger-react";
import { FaUsers } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";

import { Box, Divider, Link, List, ListItem, Typography } from "@mui/material";

import { MenuPopover } from "@components";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";

export const TopBarMenu = (): React.ReactElement => {
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (
    event: React.SyntheticEvent<SetStateAction<any>>
  ): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  return (
    <Box>
      <Box onClick={handleOpenPopover}>
        <Hamburger size={18} toggled={Boolean(openPopover)} />
      </Box>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{
          minWidth: 200,
          p: 0,
        }}
      >
        <List>
          <Link
            href={MANAGER_PATH_DASHBOARD.school.students}
            sx={{
              color: "#637381",
              "&:hover": { color: "#333", textDecoration: "none" },
            }}
          >
            <ListItem>
              <FaUsers size={19} />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Students
              </Typography>
            </ListItem>
          </Link>
          <Divider />
          <Link
            href={MANAGER_PATH_DASHBOARD.school.classes}
            sx={{
              color: "#637381",
              "&:hover": { color: "#333", textDecoration: "none" },
            }}
          >
            <ListItem sx={{ pl: 1.5 }}>
              <IoMdSchool size={25} />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Classes
              </Typography>
            </ListItem>
          </Link>
        </List>
      </MenuPopover>
    </Box>
  );
};
