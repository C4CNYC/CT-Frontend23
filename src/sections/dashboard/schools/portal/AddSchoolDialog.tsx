import * as React from "react";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { FormProvider, RHFSelect, RHFTextField } from "@components";
import { useCreateOrganizationSchoolMutation } from "src/redux/services/admin/school-amdin";

import { countries } from "../../../../assets/data";
import { useLocales } from "../../../../locales";

interface FormValuesProps {
  name: string;
  country: string;
  city: string;
}

export default function AddSchoolDialog(): React.ReactElement {
  const { translate } = useLocales();

  const [createSchool, { isLoading }] = useCreateOrganizationSchoolMutation();
  const [open, setOpen] = useState(false);
  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  const { enqueueSnackbar } = useSnackbar();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
  });

  const defaultValues = {
    name: "",
    country: "",
    city: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await createSchool({
        ...data,
      }).unwrap();
      enqueueSnackbar(
        `${translate("organizations.schools_page.create_dialog.success_msg", {
          name: data.name,
        })}`
      );
      handleClose();
      methods.reset();
    } catch (error: any) {
      enqueueSnackbar(`${translate("messages_error")}`, { variant: "error" });
    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        startIcon={<AddIcon />}
      >
        {`${translate("organizations.schools_page.create_school_btn")}`}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add School</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box rowGap={3} display="grid">
                    <RHFTextField
                      name="name"
                      label={`${translate(
                        "organizations.schools_page.create_dialog.inputs.school_name"
                      )}`}
                      required
                    />
                    <RHFSelect
                      native
                      name="country"
                      label={`${translate(
                        "organizations.schools_page.create_dialog.inputs.country"
                      )}`}
                      placeholder={`${translate(
                        "organizations.schools_page.create_dialog.inputs.country"
                      )}`}
                    >
                      <option value="" />
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.label}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFTextField
                      name="city"
                      label={`${translate(
                        "organizations.schools_page.create_dialog.inputs.city"
                      )}`}
                      required
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      mt: 7,
                    }}
                  >
                    <Button onClick={handleClose}>{`${translate(
                      "actions_close"
                    )}`}</Button>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isLoading}
                    >
                      {`${translate("actions_save_changes")}`}
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
