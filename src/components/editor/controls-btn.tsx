import { CgIfDesign } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { TbPhoto } from "react-icons/tb";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

import { Button } from "@mui/material";
import { MediaModal } from "@sections/dashboard/medias/MediaModal";

export function TemplateBtn(): React.ReactElement {
  return (
    <Button
      sx={{
        maxHeight: "40px",
        borderRadius: "20px",
        border: "2px solid #364954",
        color: "#364954",
        gap: 1,
        textTransform: "capitalize",
        "&:hover": {
          border: "2px solid #364954",
        },
      }}
    >
      Template <CgIfDesign size={20} />
    </Button>
  );
}
export function ChallengeBtn(): React.ReactElement {
  return (
    <Button
      sx={{
        maxHeight: "40px",
        borderRadius: "20px",
        border: "2px solid #364954",
        color: "#364954",
        textTransform: "capitalize",
        gap: 1,
        "&:hover": {
          border: "2px solid #364954",
        },
      }}
    >
      Challenge <IoCheckmarkDoneCircleOutline size={20} />
    </Button>
  );
}
export function SettingsBtn(): React.ReactElement {
  return (
    <Button
      sx={{
        maxHeight: "40px",
        borderRadius: "20px",
        border: "2px solid #364954",
        color: "#364954",
        textTransform: "capitalize",
        gap: 1,
        "&:hover": {
          border: "2px solid #364954",
        },
      }}
    >
      Settings <FiSettings size={20} />
    </Button>
  );
}
export function MediaBtn(): React.ReactElement {
  return (
    <MediaModal>
      <Button
        sx={{
          maxHeight: "40px",
          borderRadius: "20px",
          border: "2px solid #364954",
          color: "#364954",
          textTransform: "capitalize",
          gap: 1,
          "&:hover": {
            border: "2px solid #364954",
          },
        }}
      >
        Media <TbPhoto size={20} />
      </Button>
    </MediaModal>
  );
}
