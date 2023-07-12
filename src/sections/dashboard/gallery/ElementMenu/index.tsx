import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Button, Divider } from "@mui/material";

import { MenuPopover } from "@components";
import { IGallery } from "src/redux/interfaces/gallary.interface";

import EditProjectDialog from "../EditProjectDialog";

interface Props {
  openPopover: HTMLElement | null;
  handleClosePopover: () => void;
  handleOpenConfirm: () => void;
  item: IGallery;
}

export default function ElementMenu({
  openPopover,
  handleClosePopover,
  item,
  handleOpenConfirm,
}: Props): React.ReactElement {
  return (
    <MenuPopover
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={openPopover}
      onClose={handleClosePopover}
    >
      <EditProjectDialog
        title={item.title}
        publicProject={item.public ?? false}
        description={item.description}
        id={item.id ?? ""}
      >
        <Button
          color="primary"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          Edit
          <AiTwotoneEdit size="20px" />
        </Button>
      </EditProjectDialog>
      <Divider flexItem sx={{ my: 1 }} />
      <Button
        color="error"
        onClick={handleOpenConfirm}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        Delete
        <RiDeleteBin6Line size="20px" style={{ marginLeft: "5px" }} />
      </Button>
    </MenuPopover>
  );
}
