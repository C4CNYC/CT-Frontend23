import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Button, Stack } from "@mui/material";
import { Container } from "@mui/system";

import { FormProvider, useSnackbar } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import ChooseShoolModal from "@sections/main/create-class/ChooseShoolModal";
import CreateHeader from "@sections/main/create-class/createHeader";
import CreatePalette, {
  CLASS_PALETTE,
} from "@sections/main/create-class/createPalette";
import { createRandomAvatar } from "@utils";
import { randomInArray } from "src/_mock";
import { useStudentJoinClassMutation } from "src/redux/services/manager/students-manager";
import { useSelector } from "src/redux/store";
import { useCreateClassesMutation, useUpdateClassesAvatarMutation } from "src/redux/services/manager/classes-manager";

CreateClass.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

interface FormValueProps {
  name: string;
  description: string;
}

export default function CreateClass(): React.ReactElement {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(true);
  const [schoolId, setSchoolId] = useState("");
  const [choosenColor, setChoosenColor] = useState(
    randomInArray(CLASS_PALETTE)
  );
  const studentId = useSelector(
    (state) => state.global.user?.student_profile.id
  );
  const [createClassByManager, { isLoading: createClassLoading }] =
    useCreateClassesMutation();
  const [studentJoin] = useStudentJoinClassMutation();
  const [updateClassAvatar] = useUpdateClassesAvatarMutation();
  const CreateEmailSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });
  const methods = useForm<FormValueProps>({
    resolver: yupResolver(CreateEmailSchema),
  });

  const onSubmit = async (data: FormValueProps) => {
    try {
      if (schoolId && choosenColor) {
        const classInfo = await createClassByManager({
          schoolId,
          name: data.name,
          description: data.description,
          cover: choosenColor,
        }).unwrap();
        enqueueSnackbar("Class created successfully");
        await studentJoin({
          classId: classInfo.id,
          student_id: studentId as string,
        }).unwrap();
        const file = new FormData();
        const randomAvatar = await createRandomAvatar();
        file.append("file", randomAvatar);
        await updateClassAvatar({
          schoolId,
          classId: classInfo.id,
          file,
        }).unwrap();
        push(STUDENT_PATH_DASHBOARD.class.id(classInfo.id));
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <>
      <Head>
        <title>Create class | CodeTribe</title>
      </Head>
      <Container maxWidth={false} disableGutters>
        <ChooseShoolModal
          openDialog={openDialog}
          setOpenDialog={(open: boolean) => { setOpenDialog(open); }}
          schoolId={schoolId}
          setSchoolId={(id: string) => { setSchoolId(id); }}
        />
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <CreateHeader choosenColor={choosenColor} />
          <CreatePalette
            choosenColor={choosenColor}
            setChoosenColor={(color: string) => { setChoosenColor(color); }}
          />
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 3,
              pr: 6,
            }}
          >
            <Button
              size="large"
              variant="soft"
              color="error"
              onClick={async () => await push(STUDENT_PATH_DASHBOARD.class.root)}
            >
              Cancel
            </Button>
            <LoadingButton
              size="large"
              variant="contained"
              color="secondary"
              type="submit"
              loading={createClassLoading}
            >
              Create
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </>
  );
}
