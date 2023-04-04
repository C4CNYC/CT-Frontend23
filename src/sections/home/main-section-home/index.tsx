import CardModule from "@components/card-module";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardTypes } from "src/redux/services/enums/card-types.enum";

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
        sx={{
          width: { xs: "auto", sm: "auto", md: "auto", lg: "1100px" },
          ml: { xs: "0", sm: "0", md: "0", lg: "40px" },
          mt: { xs: "0", sm: "0", md: "0", lg: "24px" },
          mr: { xs: "0", sm: "0", md: "0", lg: "40px" },
          p: 3,
        }}
      >
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            <Typography fontWeight="700" variant="h4">
              What are you gonna create today?
            </Typography>
          </Stack>
        </Stack>
        <Stack
          display="flex"
          direction="row"
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
          <CardModule
            type={CardTypes.lesson}
            image="/assets/images/card-image.png"
          />
          <CardModule
            type={CardTypes.course}
            image="/assets/images/card-image.png"
          />
          <CardModule
            type={CardTypes.module}
            image="/assets/images/card-image.png"
          />
        </Stack>
      </Stack>
    </>
  );
}
