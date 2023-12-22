import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";

import { FormProvider, RHFTextField } from "@components";
import {
  useCreateLessonContentValidationManagerMutation,
  useUpdateLessonContentValidationManagerMutation,
} from "src/redux/services/manager/lesson-content-validation-manager";
import { useTranslate } from "src/utils/translateHelper";

interface FormValuesProps {
  regex: string;
  name: string;
}

interface Props {
  children?: React.ReactElement;
  stepId: string;
  id?: string;
  defaultValues?: FormValuesProps;
}

export default function CreateEditValidation({
  children,
  stepId,
  id,
  defaultValues = {
    regex: "",
    name: "",
  },
}: Props): React.ReactElement {
  const [open, setOpenDialog] = useState<boolean>(false);
  const isEdit = Boolean(id);
  const translate = useTranslate();
  const CreateLessonDemonSchema = Yup.object().shape({
    regex: Yup.string().required(translate("required_regex")),
    name: Yup.string().required(translate("required_name")),
  });

  const { enqueueSnackbar } = useSnackbar();
  const [updateRule, { isLoading: updageLoading }] =
    useUpdateLessonContentValidationManagerMutation();
  const [createRule, { isLoading: createLoading }] =
    useCreateLessonContentValidationManagerMutation();
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateLessonDemonSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      if (isEdit) {
        await updateRule({
          contentId: stepId,
          id: id as string,
          ...data,
        }).unwrap();
      } else {
        await createRule({
          id: stepId,
          ...data,
        }).unwrap();
      }
      enqueueSnackbar(
        id
          ? translate("validation_rule_updated")
          : translate("validation_rule_created")
      );
      setOpenDialog(false);
    } catch (e: any) {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
    }
  };

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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <DialogTitle variant="h5" sx={{ pb: 1, pt: 2 }}>
            {id
              ? translate("actions_update_rule")
              : translate("actions_create_rule")}
          </DialogTitle>
          <IconButton
            onClick={() => {
              setOpenDialog(false);
            }}
            sx={{ mb: "5px", mr: "14px" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <RHFTextField
                  sx={{ mb: 3 }}
                  name="name"
                  label={translate("name")}
                />
                <RHFTextField
                  sx={{ mb: 3 }}
                  name="regex"
                  label={translate("regex")}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 7,
                  }}
                >
                  <Button
                    onClick={() => {
                      setOpenDialog(false);
                    }}
                  >
                    {translate("actions_close")}
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={updageLoading || createLoading}
                  >
                    {translate("actions_save")}
                  </LoadingButton>
                </Box>
              </Card>
            </Grid>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
