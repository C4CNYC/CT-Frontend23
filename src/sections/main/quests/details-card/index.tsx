import NextLink from "next/link";

import { FaEdit } from "react-icons/fa";

import { Card, Link, Stack } from "@mui/material";

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
        <Link
          component={NextLink}
          underline="none"
          typography="subtitle2"
          href="#"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            color: "inherit",
            ml: "auto",
            zIndex: 16,
            position: "absolute",
            top: "15px",
            right: "15px",
          }}
        >
          <FaEdit size={18} style={{ marginBottom: "2px" }} />
          Edit
        </Link>
      </Card>
      <Stack gap={2}>
        <GeneralInfo />
        <AboutTribe />
      </Stack>
    </>
  );
}
