import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
  useSnackbar,
} from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { createRandomAvatar, getRandomColor } from "@utils";
import { MuiColorInput } from "mui-color-input";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useGetSchoolListQuery } from "src/redux/services/admin/school-amdin";
import {
  useCreateClassesMutation,
  useUpdateClassesAvatarMutation,
} from "src/redux/services/manager/classes-manager";
import * as Yup from "yup";

const CreateClassSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

export interface FormAddClassProps {
  name: string;
  description: string;
  cover: string;
  avatar?: File;
  schoolId: string;
}
interface Props {
  children: React.ReactElement;
}

export default function CreateClassModal({
  children,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpenDialog] = useState<boolean>(false);
  const [createClassByManager, { isLoading: createClassLoading }] =
    useCreateClassesMutation();
  const [updateClassAvatar] = useUpdateClassesAvatarMutation();
  const { data } = useGetSchoolListQuery({});

  const methods = useForm<FormAddClassProps>({
    resolver: yupResolver(CreateClassSchema),
  });
  const onSubmit = async ({
    schoolId,
    cover,
    name,
    description,
    avatar,
  }: FormAddClassProps): Promise<void> => {
    try {
      const data = await createClassByManager({
        schoolId,
        name,
        description,
        cover,
      }).unwrap();
      const file = new FormData();
      if (avatar) {
        file.append("file", avatar);
        await updateClassAvatar({ schoolId, classId: data.id, file }).unwrap();
      } else {
        const randomAvatar = await createRandomAvatar();
        file.append("file", randomAvatar);
        await updateClassAvatar({ schoolId, classId: data.id, file }).unwrap();
      }
      enqueueSnackbar(`Tribe ${name} created successfuly!`);
    } catch (error: any) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        methods.setValue("avatar", newFile, { shouldValidate: false });
      }
    },
    [methods.setValue]
  );
  return (
    <>
      <Box
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <DialogTitle variant="h5" sx={{ pb: 1, pt: 2 }}>
          Add Class
        </DialogTitle>
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <DialogContent sx={{ p: 0, height: { xs: "560px", sm: "400px" } }}>
            <Stack sx={{ flexDirection: { xs: "column", sm: "row" } }}>
              <Box
                sx={{
                  pl: 2,
                  pt: 1,
                  mr: { xs: 0, sm: 3 },
                  mb: { xs: 2, sm: 0 },
                }}
              >
                <RHFUploadAvatar name="avatar" onDrop={handleDrop} />
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, ml: 1, mt: 1 }}>
                    Cover:
                  </Typography>
                  <Controller
                    control={methods.control}
                    name="cover"
                    defaultValue={getRandomColor()}
                    render={({ field, fieldState }) => (
                      <MuiColorInput
                        sx={{ width: "100%" }}
                        {...field}
                        value={field.value}
                        helperText={
                          fieldState.invalid ? "Color is invalid" : ""
                        }
                        error={fieldState.invalid}
                        isAlphaHidden
                        format="hex"
                      />
                    )}
                  />
                </Box>
              </Box>

              <Stack direction="column" sx={{ gap: 3, width: "100%", pr: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, ml: 1 }}>
                    Name:
                  </Typography>
                  <RHFTextField name="name" required />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, ml: 1 }}>
                    Description:
                  </Typography>
                  <RHFTextField
                    name="description"
                    required
                    multiline
                    rows={3}
                  />
                </Box>
                <RHFSelect native name="school" label="School">
                  {data?.data ? (
                    <>
                      {data.data.map((el) => (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      ))}
                    </>
                  ) : null}
                </RHFSelect>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                onClick={() => {
                  setOpenDialog(false);
                }}
              >
                Close
              </Button>
              <LoadingButton type="submit" variant="contained" loading={false}>
                Save
              </LoadingButton>
            </Box>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
