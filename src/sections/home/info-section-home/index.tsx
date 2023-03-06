import CardInfo from "@components/card-info";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function InfoSectionHome(): React.ReactElement {
  return (
    <>
      <Stack
        width="1100px"
        ml="40px"
        mt="24px"
        mr="40px"
        borderRadius="24px"
        boxShadow="0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)"
        sx={{
          width: { xs: "auto", sm: "auto", md: "auto", lg: "1100px" },
          ml: { xs: "0", sm: "0", md: "0", lg: "40px" },
          mt: { xs: "0", sm: "0", md: "0", lg: "24px" },
          mr: { xs: "0", sm: "0", md: "0", lg: "40px" },
          p: 3,
        }}
      >
        <Stack>
          <Typography fontWeight="700" variant="h5">
            How Slides Work: Choose your format !!!
          </Typography>
        </Stack>

        <Stack
          display="flex"
          direction="row"
          justifyContent="space-between"
          sx={{
            pt: 3,
            flexWrap: { xs: "wrap", sm: "wrap", md: "wrap", lg: "nowrap" },
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "center",
              lg: "space-between",
            },
            gap: { xs: 3, sm: 3, md: 3, lg: 0 },
          }}
        >
          <CardInfo />
        </Stack>
      </Stack>
    </>
  );
}
