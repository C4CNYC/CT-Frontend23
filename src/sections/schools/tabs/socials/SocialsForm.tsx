import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Box, Grid, MenuItem } from "@mui/material";

import { FormProvider, RHFSelect, RHFTextField } from "@components";
import { useCreateSchoolSocialMutation } from "src/redux/services/manager/schools-manager";

import { Socials } from "../../../../assets/data";
import { SchoolSocials } from "../../../../redux/services/interfaces/school.interface";

const URL =
  // eslint-disable-next-line no-useless-escape
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const UpdateUserSchema = Yup.object().shape({
  link: Yup.string().matches(URL, "Enter a valid url"),
  type: Yup.string().required("Network is required"),
});

interface FormValuesProps {
  schoolId: string;
  socialID: string;
  link: string;
  name: string;
  type: string;
  id: string;
  socials?: SchoolSocials;
}

interface SocialFormProps {
  schoolId: string;
  socialLinks?: [] | null;
}

export default function SocialsForm({
  schoolId,
}: SocialFormProps): React.ReactElement {
  const [createSocial, { isLoading }] = useCreateSchoolSocialMutation();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    schoolId,
    link: "",
    name: "",
    type: "youtube",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await createSocial({
        schoolId,
        socialID: data?.id,
        link: data?.link,
        name: data?.name,
        type: data?.type,
      }).unwrap();
      enqueueSnackbar("Update success!");
      methods.reset();
    } catch (error: any) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box rowGap={0} columnGap={0} display="flex" sx={{
            width: { xs: "100%", sm: "350px", md: "max-content" }
          }}>
            <RHFSelect
              name="type"
              sx={{
                width: "125px !important",
                height: "40px !important",
                borderRight: "none",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                "& .MuiOutlinedInput-root": {
                  padding: "0 !important",
                  height: "40px",
                  border: "none",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
                "& .MuiSelect-select": {
                  display: "flex",
                  justifyContent: "center",
                },
              }}
            >
              {Socials.map((anObjectMapped, index) => {
                return (
                  <MenuItem
                    value={anObjectMapped.name}
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {anObjectMapped.icon}
                  </MenuItem>
                );
              })}
            </RHFSelect>
            <RHFTextField
              name="link"
              label="Link"
              size="small"
              sx={{
                width: { xs: "100%", sm: "100%", md: "350px" },
                height: "86px",
                borderLeft: "none",
                "& fieldset": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              }}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{
                height: "40px",
                pl: 1,
                pr: 1,
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              Add
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
