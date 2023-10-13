// node modules
import { type SetStateAction, type FC, useState } from "react";

// @mui
import { Divider, IconButton, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

// components
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Iconify,
  MenuPopover,
} from "@components";

import HelpQuestionModal from "./modals/HelpQuestion";
import Solution from "./options/solution";
import Tips from "./options/tips";
import Unstack from "./options/unstack-dialogs/Unstuck";

const MENU_POPOVER_STYLES = {
  width: 350,
  p: 0,
  mr: "30px",
}

const MENU_ITEM_STYLES = {
  pl: "22px!important", height: 52
}

const ICONIFY_STYLES = {
  width: "30px!important",
  height: "30px!important"
}

const HelpPopup: FC = () => {
  const [expanded, setExpanded] = useState<string | false>();
  const [openPopover, setOpenPopover] = useState(null);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  // check better solution for event type
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
      <IconButton onClick={handleOpenPopover}>
        <Iconify icon="clarity:help-line" />
      </IconButton>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={MENU_POPOVER_STYLES}
      >
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Iconify width="27px" mr="15px" icon="icons8:idea" />
            <Typography variant="h6">TIPS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Tips />
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Iconify
              width="27px"
              mr="15px"
              icon="fluent:square-hint-sparkles-16-regular"
            />
            <Typography variant="h6">SOLUTIONS</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Solution />
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Iconify width="27px" mr="15px" icon="ion:help-buoy-outline" />
            <Typography variant="h6">GET UNSTUCK</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Unstack />
          </AccordionDetails>
        </Accordion>
        <Divider />
        <HelpQuestionModal>
          <MenuItem sx={MENU_ITEM_STYLES}>
            <Iconify
              sx={ICONIFY_STYLES}
              icon="mdi:chat-outline"
            />
            <Typography variant="h6">I NEED HELP WITH</Typography>
          </MenuItem>
        </HelpQuestionModal>
      </MenuPopover>
    </Box>
  );
};

export default HelpPopup;
