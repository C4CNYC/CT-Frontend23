import React, { useState } from "react";

import { javascript } from "@codemirror/lang-javascript";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";

import {
  FormProvider,
  ModalCodeFullscreen,
  RHFCode,
  RHFTextField,
} from "@components";
import {
  useCreateIntegrationMutation,
  useEditIntegrationMutation,
} from "src/redux/services/manager/integration-manager";
import { useTranslate } from "src/utils/translateHelper";

const IntegrationSchema = Yup.object().shape({
  name: Yup.string().required("Tenant name is required"),
});

interface IntegrationForm {
  name: string;
  head: string;
  scripts: string;
}

interface Prop {
  id?: string;
  defaultValues?: IntegrationForm;
  children: React.ReactElement;
  isEdit?: boolean;
}
// RHFCode
export function ModalIntegration({
  isEdit = false,
  children,
  id,
  defaultValues = {
    name: "",
    scripts: "",
    head: "",
  },
}: Prop): React.ReactElement {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const [createIntegration, { isLoading: creatLoading }] =
    useCreateIntegrationMutation();
  const [updateIntegration, { isLoading: updateLoading }] =
    useEditIntegrationMutation();
  const translate = useTranslate();

  const methods = useForm<IntegrationForm>({
    resolver: yupResolver(IntegrationSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: IntegrationForm): Promise<void> => {
    try {
      enqueueSnackbar(
        id
          ? translate("integrations_updated_msg")
          : translate("integrations_created_msg")
      );
    } catch (e: any) {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
    }
    if (id) {
      await updateIntegration({
        id,
        ...data,
      }).unwrap();
    } else {
      await createIntegration(data).unwrap();
    }
    methods.reset();
    handleClose();
  };
  const onCancel = (): void => {
    methods.reset();
    handleClose();
  };

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ pb: 2 }}>
          {translate("integrations_create_int")}
        </DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {isEdit ? (
              <Stack gap={2}>
                <Box>
                  <RHFTextField placeholder={translate("name")} name="name" />
                </Box>
                <Box>
                  <ModalCodeFullscreen
                    title={translate("integrations_head_links_plh")}
                    name="head"
                  />
                  <RHFCode
                    placeholder={translate("integrations_head_links_plh")}
                    name="head"
                    height="180px"
                    extensions={[javascript({ jsx: true })]}
                  />
                </Box>
                <Box>
                  <ModalCodeFullscreen
                    title={translate("integrations_body_links_plh")}
                    name="scripts"
                  />
                  <RHFCode
                    placeholder={translate("integrations_body_links_plh")}
                    name="scripts"
                    height="180px"
                    extensions={[javascript({ jsx: true })]}
                  />
                </Box>
              </Stack>
            ) : (
              <Stack gap={2}>
                <Box>
                  <RHFTextField placeholder={translate("name")} name="name" />
                </Box>
                <Box>
                  <ModalCodeFullscreen
                    title={translate("integrations_head_links_plh")}
                    name="head"
                  />
                  <RHFCode
                    placeholder={translate("integrations_head_links_plh")}
                    name="head"
                    height="180px"
                    extensions={[javascript({ jsx: true })]}
                  />
                </Box>
                <Box>
                  <ModalCodeFullscreen
                    title={translate("integrations_body_links_plh")}
                    name="scripts"
                  />
                  <RHFCode
                    placeholder={translate("integrations_body_links_plh")}
                    name="scripts"
                    height="180px"
                    extensions={[javascript({ jsx: true })]}
                  />
                </Box>
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="inherit" onClick={onCancel}>
              {translate("actions_cancel")}
            </Button>
            <LoadingButton
              loading={creatLoading || updateLoading}
              variant="contained"
              color="primary"
              type="submit"
            >
              {translate("actions_save")}
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
