import { memo, useState } from "react";

import { ImMinus, ImPlus } from "react-icons/im";

import { Box, Collapse, Stack, Typography } from "@mui/material";

interface CollapsedItemProps {
  title: string;
  children: React.ReactElement;
}

const CollapsedItem = ({ title, children }: CollapsedItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box onClick={handleOpen} sx={{ "& :hover": { cursor: "pointer" } }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h6" sx={{ userSelect: "none" }}>
          {title}
        </Typography>
        {!isOpen ? <ImPlus /> : <ImMinus />}
      </Stack>
      <Collapse in={isOpen}>{children}</Collapse>
    </Box>
  );
};

export default memo(CollapsedItem);
