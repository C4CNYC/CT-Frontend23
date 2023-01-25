import * as React from 'react';
import {useState} from 'react';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormProvider, {RHFSelect, RHFTextField, RHFUploadAvatar} from "../../../../components/hook-form";
import {Box, Card, Grid, Stack, Typography} from "@mui/material";
import {countries} from "../../../../assets/data";
import {LoadingButton} from "@mui/lab";
import {useSnackbar} from "../../../../components/snackbar";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCallback} from "react";
import AddIcon from "@mui/icons-material/Add";
import { useCreateOrganizationSchoolMutation } from 'src/redux/services/admin';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

type FormValuesProps = {
  name: string;
  country: string;
  city: string;
};

export default function AddSchoolDialog() {
  const organizationId = useSelector((state: RootState) => state.global.organizationId)
  const [createSchool, { isLoading }] = useCreateOrganizationSchoolMutation()
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {enqueueSnackbar} = useSnackbar();

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

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await createSchool({
        org_Id: organizationId,
        ...data
      });
      enqueueSnackbar(`School ${data.name} created successfuly!`);
      methods.reset()
      handleClose() 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        startIcon={<AddIcon/>}
      >
        Add School
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add School</DialogTitle>
        <DialogContent sx={{p: 0}}>
          <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{p: 3}}>
                  <Box
                    rowGap={3}
                    display="grid"
                  >
                    <RHFTextField name="name" label="School name" required/>

                    <RHFSelect
                      native
                      name="country"
                      label="Country"
                      placeholder="Country"
                    >
                      <option value=""/>
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.label}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFTextField name="city" label="City" required/>
                  </Box>
                  <Box sx={{display: "flex", justifyContent: "flex-end", gap: 2, mt: 7}}>
                    <Button onClick={handleClose}>Close</Button>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isLoading}
                    >
                      Save Changes
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
