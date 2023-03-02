import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardInfo from "@components/card-info";

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
      >
        <Stack
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack mt="24px" ml="24px">
            <Typography fontWeight="700" variant="h5">
              How Slides Work: Choose your format !!!
            </Typography>
          </Stack>
        </Stack>

        <Stack
          display="flex"
          direction="row"
          justifyContent="space-between"
          p="24px"
        >
          <CardInfo />
        </Stack>
      </Stack>
    </>
  );
}
