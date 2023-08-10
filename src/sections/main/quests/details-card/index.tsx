import NextLink from "next/link";

import { FaEdit } from "react-icons/fa";

import { Card, Link, Stack } from "@mui/material";

import ProfileCover from "@sections/student-profile/ProfileCover";
import { BaseResponseInterface } from "@utils";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { IClass } from "src/redux/interfaces/class.interface";
import { Role } from "src/redux/services/enums/role.enum";

import AboutTribe from "./AboutTribe";
import GeneralInfo from "./GeneralInfo";

interface IDetailsTabProps {
  classData: IClass & BaseResponseInterface;
}

export default function DetailsTab({
  classData,
}: IDetailsTabProps): React.ReactElement {
  return (
    <>
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: "relative",
        }}
      >
        <ProfileCover
          name={classData.name}
          cover={classData.cover ?? ""}
          avatar={classData.avatar ?? ""}
        />
        <RoleBasedGuard roles={[Role.Manager, Role.Admin, Role.Owner]}>
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
        </RoleBasedGuard>
      </Card>
      <Stack gap={2}>
        <GeneralInfo students={classData.students} />
        <AboutTribe
          description={classData.description}
          city={classData.city}
          country={classData.country}
          createdAt={classData.createdAt}
          schoolName={classData.school_name}
        />
      </Stack>
    </>
  );
}
