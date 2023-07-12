import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Input, InputAdornment, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Image, UploadImageModal } from "@components";
import { bgBlur, voidFunction } from "@utils";

const StyledRoot = styled("div")(({ theme }) => ({
  position: "absolute",
  left: "0",
  top: "0",
  display: "flex",
  height: "100%",
  maxHeight: "225px",
  borderRadius: "25px",
  "&:before": {
    ...bgBlur({
      opacity: 0.2,
    }),
    top: 0,
    zIndex: 1,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: "25px",
  },
}));

const StyledInfo = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "140px",
  zIndex: 3,
  left: 0,
}));

export function InviteCover(): React.ReactElement {
  const onUpload = async (data: File): Promise<void> => {
    voidFunction();
  };
  return (
    <Stack>
      <Stack
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 10,
          mt: "10px",
          mr: "10px",
        }}
      >
        <UploadImageModal onUpload={onUpload} color="#fff" />
      </Stack>
      <StyledInfo>
        <Box
          sx={{
            ml: 3,
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Input
            id="input-with-icon-adornment"
            placeholder="Edit Session Name"
            sx={{
              background: "#36495466",
              borderRadius: "5px",
              px: 0.5,
              py: 0,
              color: "#fff",
              input: {
                "&::placeholder": {
                  color: "#fff",
                },
              },
            }}
            disableUnderline
            endAdornment={
              <InputAdornment position="end">
                <EditOutlinedIcon style={{ color: "#fff" }} />
              </InputAdornment>
            }
          />
          <Typography sx={{ color: "#fff", textAlign: "left" }} variant="h4">
            CreativeLalaby23
          </Typography>
        </Box>
      </StyledInfo>
      <StyledRoot>
        <Image
          alt="cover"
          src="/assets/on-boarding/usa.png"
          sx={{ height: "100%", borderRadius: "25px" }}
        />
      </StyledRoot>
    </Stack>
  );
}
