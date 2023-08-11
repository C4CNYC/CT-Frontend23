import { useSnackbar } from "notistack";

import { Box, Button, Card, Stack } from "@mui/material";

import ClassPreferences from "@sections/dashboard/classes/modal";
import ProfileCover from "@sections/student-profile/ProfileCover";
import { BaseResponseInterface } from "@utils";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { IClass } from "src/redux/interfaces/class.interface";
import { Role } from "src/redux/services/enums/role.enum";
import {
  useUpdateClassesAvatarMutation,
  useUpdateClassesMutation,
} from "src/redux/services/manager/classes-manager";

import AboutTribe from "./AboutTribe";
import GeneralInfo from "./GeneralInfo";

interface IDetailsTabProps {
  classData: IClass & BaseResponseInterface;
}

export default function DetailsTab({
  classData,
}: IDetailsTabProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [updateClassByManager, { isLoading: updateResult }] =
    useUpdateClassesMutation();
  const [updateClassAvatar] = useUpdateClassesAvatarMutation();

  const handleEditClass = async (
    id: string,
    name: string,
    description: string,
    cover: string,
    uploadedFile?: File
  ): Promise<void> => {
    try {
      await updateClassByManager({
        schoolId: classData.school_id,
        classId: id,
        name,
        description,
        cover,
      }).unwrap();
      if (uploadedFile) {
        const file = new FormData();
        file.append("file", uploadedFile);
        await updateClassAvatar({
          schoolId: classData.school_id,
          classId: id,
          file,
        }).unwrap();
      }
      enqueueSnackbar("Class updated successfuly!");
    } catch (error: any) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

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
          <Box sx={{ position: "absolute", top: "10px", right: "20px" }}>
            <ClassPreferences
              updateClass={(
                name: string,
                description: string,
                cover: string,
                uploadedFile?: File
              ) => {
                handleEditClass(
                  classData.class_id,
                  name,
                  description,
                  cover,
                  uploadedFile
                );
              }}
              defaultValues={{
                name: classData.name,
                description: classData.description ?? "",
                cover: classData.cover ?? "",
              }}
              rowId={classData.class_id}
              updateResult={updateResult}
            >
              <Button
                variant="text"
                sx={(theme) => ({ color: theme.palette.primary.contrastText })}
              >
                Edit
              </Button>
            </ClassPreferences>
          </Box>
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
