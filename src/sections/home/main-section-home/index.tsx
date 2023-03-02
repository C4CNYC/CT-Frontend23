import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardModule from "@components/card-module";

export default function MainSectionHome(): React.ReactElement {
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
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack pl="24px" mt="24px">
            <Typography fontWeight="700" variant="h4">
              What are you gonna create today?
            </Typography>
          </Stack>
        </Stack>
        <Stack
          display="flex"
          direction="row"
          justifyContent="space-around"
          p="24px"
        >
          <Stack ml="24px">
            <CardModule type="lesson" id="some" image="/assets/images/card-image.png"/>
          </Stack>
          <Stack mr="-17px" ml="-17px">
            <CardModule type="course" id="some" image="/assets/images/card-image.png"/>
          </Stack>
          <Stack mr="24px">
            <CardModule type="module" id="some" image="/assets/images/card-image.png"/>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
