import { Stack, Tooltip, Typography } from "@mui/material";

import GalleryDialog from "../GalleryDialog";
import HomeButton from "../HomeButton";

interface Props {
  name: string | undefined;
  lastName: string | undefined;
  title: string;
  description: string;
  code: string;
  setCode: (value: string) => void;
  onUpdate: () => Promise<void>;
}

export default function ElementInfo({
  name,
  lastName,
  title,
  description,
  code,
  setCode,
  onUpdate,
}: Props): React.ReactElement {
  return (
    <>
      <Stack direction="row" sx={{ position: "relative", gap: 1 }}>
        <GalleryDialog
          name={name ?? ""}
          lastName={lastName ?? ""}
          title={title}
          code={code}
          setCode={setCode}
          onUpdate={onUpdate}
        >
          <HomeButton />
        </GalleryDialog>
        <Typography variant="body2" sx={{ ml: "67px" }} gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {lastName}
        </Typography>
      </Stack>
      <Tooltip
        title={
          title.length > 98 ? (
            <Typography variant="subtitle1" sx={{ p: 1 }}>
              {title}
            </Typography>
          ) : (
            ""
          )
        }
      >
        <Typography
          variant="subtitle1"
          sx={{
            mt: 1,
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box !important",
            "-webkit-line-clamp": "2",
            "-webkit-box-orient": "vertical",
            whiteSpace: "normal",
            height: "50px",
            maxHeight: "50px",
          }}
        >
          {title}
        </Typography>
      </Tooltip>
      <Tooltip
        title={
          description.length > 115 ? (
            <Typography variant="body2" sx={{ p: 1 }}>
              {description}
            </Typography>
          ) : (
            ""
          )
        }
      >
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box !important",
            "-webkit-line-clamp": "2",
            "-webkit-box-orient": "vertical",
            whiteSpace: "normal",
            height: "40px",
            maxHeight: "40px",
          }}
        >
          {description}
        </Typography>
      </Tooltip>
    </>
  );
}
