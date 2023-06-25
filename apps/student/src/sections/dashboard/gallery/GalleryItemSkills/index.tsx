import { Box, Chip } from "@mui/material";

export default function GalleryItemSkills(): React.ReactElement {
  return (
    <Box sx={{ display: "flex", gap: 1, mb: "16px" }}>
      <Chip label="P1" size="small" />
      <Chip label="Fun" size="small" />
      <Chip label="JS\HTML" size="small" />
      <Chip label="U16" size="small" />
    </Box>
  );
}
