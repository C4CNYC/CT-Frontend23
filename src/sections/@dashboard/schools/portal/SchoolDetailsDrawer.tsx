import {useState} from 'react';
import {
  Box,
  Stack,
  Drawer,
  Button,
  Divider,
  Typography,
  IconButton,
  StackProps,
  DrawerProps,
  List
} from "@mui/material";
import { IFile } from "../../../../@types/file";
import Iconify from "../../../../components/iconify";
import Scrollbar from "../../../../components/scrollbar";
import SchoolIcon from "@mui/icons-material/School";
import FormProvider, {RHFSelect, RHFTextField} from "../../../../components/hook-form";
import {countries} from "../../../../assets/data";
import {LoadingButton} from "@mui/lab";
import * as React from "react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FileInvitedItem from '../FileInvitedItem';
import FileShareDialog from '../FileShareDialog';

// ----------------------------------------------------------------------

interface Props extends DrawerProps {
  item: IFile;
  onClose: VoidFunction;
  onDelete: VoidFunction;
  onCopyLink: VoidFunction;
}

type FormValuesProps = {
  organizationName: string;
  country: string | null;
  address: string | null;
  city: string | null;
};


export default function SchoolDetailsDrawer({
  item,
  open,
  onClose,
  onDelete,
                                              onCopyLink,
  ...other
}: Props) {
  const { name, shared } = item;
  const [openShare, setOpenShare] = useState(false);

  const UpdateUserSchema = Yup.object().shape({
    schoolName: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
  });

  const defaultValues = {
    schoolName: "",
    phoneNumber: "",
    country: "",
    address: "",
    city: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: {isSubmitting},
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar("Update success!");
      console.log("DATA", data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleChangeInvite = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(event.target.value);
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: 320 },
        }}
        {...other}
      >
        <Scrollbar sx={{ height: 1,
          bgcolor: "background.neutral",
          "& .simplebar-content": {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh'
          }, }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2.5 }}
          >
            <Typography variant="h6"> School Info </Typography>
          </Stack>

          <Stack
            spacing={2.5}
            justifyContent="center"
            sx={{ p: 2.5 }}
          >
            <SchoolIcon/>
            <Typography variant="h6" sx={{ wordBreak: "break-all" }}>
              {name}
            </Typography>
            <Divider sx={{ borderStyle: "dashed" }} />
          </Stack>
          <Stack spacing={2.5}
                 sx={{ p: 2.5, bgcolor: "background.neutral" }}

          >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Box
                rowGap={4}
                display="grid"
                gridTemplateRows="repeat(4, 1fr)"
              >
                <RHFTextField name="schoolName" label="School name" required/>

                <RHFSelect
                  native
                  name="country"
                  label="Country"
                  placeholder="Country"
                >
                  <option value=""/>
                  {countries.map((country) => (
                    <option key={country.code} value={country.label}>
                      {country.label}
                    </option>
                  ))}
                </RHFSelect>
                <RHFTextField name="cite" label="City" required/>
              </Box>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2.5 }}>
                <Typography variant="subtitle2"> School admins </Typography>
                <IconButton
                  size="small"
                  color="success"
                  onClick={handleOpenShare}
                  sx={{
                    p: 0,
                    width: 24,
                    height: 24,
                    color: 'common.white',
                    bgcolor: 'success.main',
                    '&:hover': {
                      bgcolor: 'success.main',
                    },
                  }}
                >
                  <Iconify icon="eva:plus-fill" />
                </IconButton>
              </Stack>
              <List disablePadding>
                {shared.map((person: any) => (
                  <FileInvitedItem key={person.id} person={person} />
                ))}
              </List>
              <Box sx={{mt: 2, position: 'absolute', bottom: '15px', left:  '15px'}}>
                <LoadingButton
                  fullWidth
                  variant="soft"
                  color="primary"
                  size="large"
                  type="submit"
                  loading={isSubmitting}
                  sx={{mb: 2}}
                  startIcon={<Iconify icon="eva:save-outline" />}
                >
                  Save Changes
                </LoadingButton>
                <Button
                  fullWidth
                  variant="soft"
                  color="error"
                  size="large"
                  startIcon={<Iconify icon="eva:trash-2-outline" />}
                  onClick={onDelete}
                >
                  Archive
                </Button>
              </Box>
            </FormProvider>
          </Stack>

        </Scrollbar>
        <FileShareDialog
          open={openShare}
          shared={shared}
          inviteEmail='email@codetribe.io'
          onChangeInvite={handleChangeInvite}
          onCopyLink={onCopyLink}
          onClose={() => {
            handleCloseShare();
          }}
        />
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

interface PanelProps extends StackProps {
  label: string;
  toggle: boolean;
  onToggle: VoidFunction;
}

function Panel({ label, toggle, onToggle, ...other }: PanelProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      {...other}
    >
      <Typography variant="subtitle2"> {label} </Typography>

      <IconButton size="small" onClick={onToggle}>
        <Iconify
          icon={toggle ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
        />
      </IconButton>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type RowProps = {
  label: string;
  value: string;
};

function Row({ label, value = "" }: RowProps) {
  return (
    <Stack
      direction="row"
      sx={{ typography: "caption", textTransform: "capitalize" }}
    >
      <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
        {label}
      </Box>

      {value}
    </Stack>
  );
}
