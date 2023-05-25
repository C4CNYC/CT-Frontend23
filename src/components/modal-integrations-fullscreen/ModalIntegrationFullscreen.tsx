import { javascript } from "@codemirror/lang-javascript";
import FormProvider, { RHFTextField } from "@components/hook-form";
import { RHFCode } from "@components/hook-form/RHFCode";
import Iconify from "@components/iconify";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateIntegrationMutation } from "src/redux/services/manager/integration-manager";
import * as Yup from "yup";

const IntegrationSchema = Yup.object().shape({
  name: Yup.string().required("Tenant name is required"),
});
interface IntegrationForm {
  name: string;
  head: string;
  scripts: string;
}
interface Props {
  id?: string;
  defaultValues: IntegrationForm;

}
export default function ModalIntegrationFullscreen({
  id,
  defaultValues = {
    name: "",
    scripts: "",
    head: "",
  }
}: Props): React.ReactElement {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  const [updateIntegration, { isLoading: updateLoading }] = useUpdateIntegrationMutation();

  const methods = useForm<IntegrationForm>({
    resolver: yupResolver(IntegrationSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: IntegrationForm): Promise<void> => {
    if (id) {
      await updateIntegration({
        id,
        ...data,
      }).unwrap();
    }
    methods.reset();
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon="icons8:resize-four-directions" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle sx={{ pb: 2 }}>Edit Integration</DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack gap={3}>
              <Box>
                <RHFTextField placeholder="Name" name="name" />
              </Box>
              <Box>
                <RHFCode
                  placeholder="Head links or scripts"
                  name="head"
                  height="35vh"
                  extensions={[javascript({ jsx: true })]}
                />
              </Box>
              <Box>
                <RHFCode
                  placeholder="Body links or scripts"
                  name="scripts"
                  height="30vh"
                  extensions={[javascript({ jsx: true })]}
                />
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={updateLoading}
              variant="contained"
              color="primary"
              type="submit"
            >
              Save
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};
