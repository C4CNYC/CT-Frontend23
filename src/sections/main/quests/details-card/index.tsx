import { Card, Stack } from "@mui/material";
import ProfileCover from "@sections/student-profile/ProfileCover";
import AboutTribe from "./AboutTribe";
import GeneralInfo from "./GeneralInfo";

export default function DetailsTab(): React.ReactElement {
  return (
    <>
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: "relative",
        }}
      >
        <ProfileCover name="name" cover="" avatar="" />
      </Card>
      <Stack gap={2}>
        <GeneralInfo />
        <AboutTribe />
      </Stack>
    </>
  );
}
