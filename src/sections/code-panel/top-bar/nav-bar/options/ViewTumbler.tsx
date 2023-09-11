import { IconButton } from "@mui/material";
import { Box } from "@mui/system";

import { Iconify } from "@components";

interface ViewToomblerProps {
  fullScreenView: boolean;
  isColumnHidden: boolean;
  onChangeSreenView: (value: boolean) => void;
  onChangeColumnVisability: (value: boolean) => void;
  fullScreenOpen: () => void;
  fullScreenClose: () => void;
}

const ViewTumbler = ({
  fullScreenView,
  isColumnHidden,
  onChangeSreenView,
  onChangeColumnVisability,
  fullScreenOpen,
  fullScreenClose,
}: ViewToomblerProps): React.ReactElement => {
  const columnIcon = isColumnHidden ? "tabler:columns-3" : "tabler:columns-1";
  const screenViewIcon = fullScreenView
    ? "la:compress-arrows-alt"
    : "mdi:arrow-expand-all";

  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor="#FBDD3F"
      borderRadius="50px"
      padding="0 12px"
      height="41px"
    >
      <IconButton
        onClick={() => {
          onChangeColumnVisability(!isColumnHidden);
        }}
      >
        <Iconify icon={columnIcon} />
      </IconButton>
      <IconButton
        onClick={() => {
          fullScreenView ? fullScreenClose() : fullScreenOpen();
          onChangeSreenView(!fullScreenView);
        }}
      >
        <Iconify icon={screenViewIcon} />
      </IconButton>
    </Box>
  );
};

export default ViewTumbler;
