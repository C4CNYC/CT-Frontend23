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
import { useTranslate } from "src/utils/translateHelper";

import { countries } from "../../../../assets/data";

interface FormValuesProps {
  name: string;
  country: string;
  city: string;
}

export default function AddSchoolDialog(): React.ReactElement {
  const translate = useTranslate();

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
    name: Yup.string().required(translate("required_name")),
    country: Yup.string().required(translate("required_country")),
    city: Yup.string().required(translate("required_city")),
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
        translate("add_school_success_smg", {
          name: data.name,
        })
      );
      handleClose();
      methods.reset();
    } catch (error: any) {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        startIcon={<AddIcon />}
      >
        {translate("schools_add_aschool")}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{translate("schools_add_aschool")}</DialogTitle>
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
                      label={translate("add_school_name")}
                      required
                    />
                    <RHFSelect
                      native
                      name="country"
                      label={translate("country")}
                      placeholder={translate("country")}
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
                      label={translate("city")}
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
                    <Button onClick={handleClose}>
                      {translate("actions_close")}
                    </Button>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isLoading}
                    >
                      {translate("actions_save_changes")}
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
