import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function WelcomeSection() {
  return (
    <>
      <Stack
        borderRadius="16px"
        bgcolor="#E6FBFC"
        width="728px"
        height="260px"
        display="flex"
        flexDirection="row"
        sx={{
          ml: { xs: 0, sm: 0, md: "40px" },
          mb: { xs: 3, sm: 3, md: 0 },
          maxWidth: { xs: "344px", sm: "344px", md: "none" },
        }}
      >
        <Stack
          ml="40px"
          mt="38px"
          sx={{ maxWidth: { xs: "120px", sm: "120px", md: "none" } }}
        >
          <Typography
            fontSize="24"
            color="#212B36"
            variant="subtitle1"
            fontWeight="700"
            mb="8px"
          >
            Welcome to the Maker Suite
          </Typography>
          <Typography fontSize="14" color="#212B36">
            Make a fun lesson or a course and share it with friends or everyone.
          </Typography>
        </Stack>
        <Stack m="21px 24px 22px 25px">
          <Image
            src="/assets/seo.svg"
            alt={""}
            width="300"
            height="257"
          ></Image>
        </Stack>
      </Stack>
    </>
  );
}
