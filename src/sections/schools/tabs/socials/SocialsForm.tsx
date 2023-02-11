import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Grid, Box, MenuItem } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import FormProvider, {
  RHFSelect,
  RHFTextField
} from "../../../../components/hook-form";
import { SchoolSocials } from "../../../../redux/services/interfaces/school.interface";
import { useCreateSchoolSocialMutation } from "../../../../redux/services/manager";
import { yupResolver } from "@hookform/resolvers/yup";
import { Socials } from "../../../../assets/data";


const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const UpdateUserSchema = Yup.object().shape({
  link: Yup.string().matches(URL, "Enter a valid url"),
  type: Yup.string().required("Network is required")
});

type FormValuesProps = {
  school_id: string;
  social_id: string;
  link: string;
  name: string;
  type: string;
  id: string;
  socials?: SchoolSocials;
};

type SocialFormProps = {
  school_id: string;
  socialLinks?: [] | null;
};

export default function SocialsForm({ school_id }: SocialFormProps) {
  const [createSocial, { isLoading }] = useCreateSchoolSocialMutation();
  const { enqueueSnackbar } = useSnackbar();


  const defaultValues = {
    school_id: school_id,
    link: "",
    name: "",
    type: "youtube"
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await createSocial({
        school_id: school_id,
        social_id: data?.id,
        link: data?.link,
        name: data?.name,
        type: data?.type
      });
      enqueueSnackbar("Update success!");
      methods.reset();
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            rowGap={1}
            columnGap={2}
            display="flex"
          >
            <RHFSelect
              name="type"
              label="Network"
              sx={{
                width: "106px", height: "44px !important",
                "& .MuiOutlinedInput-root": {
                  padding: "0 !important",
                  height: "56px"
                },
                "& .MuiSelect-select": {
                  display: "flex",
                  justifyContent: "center"
                }
              }}>
              {Socials.map((anObjectMapped, index) => {
                return (
                  <MenuItem
                    value={anObjectMapped.name}
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "center"
                    }}>
                    {anObjectMapped.icon}
                  </MenuItem>
                );
              })}
            </RHFSelect>
            <RHFTextField name="link" label="Link" sx={{ maxWidth: "410px", height: "86px" }} />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{ height: "54px", pl: 4, pr: 4 }}
            >
              Add
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
