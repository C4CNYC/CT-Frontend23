import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";

import { FormProvider, RHFTextField, RHFUploadAvatar } from "@components";
import {
  useCreateAuthorMutation,
  useUpdateAuthorCoverMutation,
  useUpdateAuthorMutation,
} from "src/redux/services/manager/author-manager";
import { useTranslate } from "src/utils/translateHelper";

const LINK_URL =
  // eslint-disable-next-line no-useless-escape
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

interface FormValuesProps {
  name: string;
  about: string;
  linkedin: string;
  email: string;
  avatar?: File;
  id?: string;
}
interface IAuthorFormProps {
  isEdit?: boolean;
  courseId: string;
  defaultValues?: Omit<FormValuesProps, "avatar">;
  setFormVisible: (close: boolean) => void;
}
export default function AuthorForm({
  isEdit = false,
  courseId,
  setFormVisible,
  defaultValues = { name: "", about: "", linkedin: "", email: "" },
}: IAuthorFormProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [postAuthor, { isLoading }] = useCreateAuthorMutation();
  const [editAuthor, { isLoading: isEditing }] = useUpdateAuthorMutation();
  const [postCover] = useUpdateAuthorCoverMutation();
  const translate = useTranslate();

  const CreateAuthorSchema = Yup.object().shape({
    name: Yup.string().required(translate("required_name")),
    about: Yup.string(),
    linkedin: Yup.string().matches(LINK_URL, translate("enter_valid_url_msg")),
    email: Yup.string().email(translate("must_be_valid_email")),
    avatar: Yup.mixed(),
  });
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateAuthorSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      const file = new FormData();
      if (isEdit && defaultValues?.id) {
        await editAuthor({
          id: defaultValues.id,
          name: data.name,
          linkedin: data.linkedin,
          about: data.about,
        }).unwrap();
        if (data.avatar) {
          file.append("file", data.avatar);
          await postCover({ id: defaultValues.id, file }).unwrap();
        }
      } else {
        const author = await postAuthor({
          name: data.name,
          about: data.about,
          linkedin: data.linkedin,
          email: data.email,
          course_id: courseId,
        }).unwrap();
        if (data.avatar) {
          file.append("file", data.avatar);
          await postCover({ id: author.id, file }).unwrap();
        }
      }
      enqueueSnackbar(
        !isEdit
          ? translate("messages_create_success")
          : translate("messages_update_success")
      );
      setFormVisible(false);
      methods.reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
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
    <Stack sx={{ py: { xs: 1, sm: 3 }, px: { xs: 2, sm: 3 }, height: "100%" }}>
      <FormProvider methods={methods}>
        <Stack direction="column" sx={{ gap: 2, width: "100%" }}>
          <RHFUploadAvatar name="avatar" onDrop={handleDrop} />
          <RHFTextField name="name" label={translate("name")} required />
          <RHFTextField
            name="email"
            label={translate("email")}
            disabled={isEdit}
          />
          <RHFTextField name="linkedin" label="Linkedin" />
          <RHFTextField
            name="about"
            label={translate("about")}
            multiline
            rows={3}
          />
        </Stack>
      </FormProvider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: "auto",
          mb: 2,
        }}
      >
        <Button
          onClick={() => {
            setFormVisible(false);
          }}
          color="error"
          variant="soft"
        >
          {translate("actions_cancel")}
        </Button>
        <LoadingButton
          onClick={methods.handleSubmit(onSubmit)}
          variant="contained"
          loading={isEditing || isLoading}
        >
          {translate("actions_save")}
        </LoadingButton>
      </Box>
    </Stack>
  );
}
