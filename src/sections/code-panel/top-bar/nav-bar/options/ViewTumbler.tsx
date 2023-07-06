import { Iconify } from "@components";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";

interface ViewToomblerProps {
  fullScreenView: boolean;
  allColumnsVisible: boolean;
  onChangeSreenView: (value: boolean) => void;
  onChangeColumnVisability: (value: boolean) => void;
  fullScreenOpen: () => void;
  fullScreenClose: () => void;
}

const ViewTumbler = ({
  fullScreenView,
  allColumnsVisible,
  onChangeSreenView,
  onChangeColumnVisability,
  fullScreenOpen,
  fullScreenClose,
}: ViewToomblerProps): React.ReactElement => {
  const columnIcon = allColumnsVisible
    ? "iconoir:view-columns-3"
    : "iconoir:view-columns-2";
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
          onChangeColumnVisability(!allColumnsVisible);
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
