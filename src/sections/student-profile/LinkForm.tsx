import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";

import { FormProvider, RHFTextField } from "@components";
import { ISocials } from "src/redux/interfaces/socials.interface";
import { usePostSocialMutation } from "src/redux/services/manager/socials-student";
import { useTranslate } from "src/utils/translateHelper";

import LinkSelect from "./LinkSelect";

const URL =
  // eslint-disable-next-line no-useless-escape
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const UpdateUserSchema = Yup.object().shape({
  link: Yup.string().matches(URL, "Enter a valid url"),
  type: Yup.string().required("Network is required"),
});

interface FormValuesProps {
  socialID: string;
  link: string;
  name: string;
  type: string;
  id: string;
  socials?: ISocials;
}

interface Props {
  studentId: string;
}

export default function LinkForm({ studentId }: Props): React.ReactElement {
  const [createSocial] = usePostSocialMutation();
  const { enqueueSnackbar } = useSnackbar();
  const translate = useTranslate();

  const defaultValues = {
    studentId,
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
        studentId,
        link: data?.link,
        name: data?.name,
        type: data?.type,
      }).unwrap();
      enqueueSnackbar(translate("messages_update_success"));
      methods.reset();
    } catch (error: any) {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RHFTextField
            name="name"
            label={translate("name")}
            size="small"
            sx={{
              pb: 2,
              width: "100%",
              maxWidth: { xs: "230px", sm: "430px" },
            }}
          />
          <Box rowGap={0} columnGap={0} display="flex">
            <LinkSelect />
            <RHFTextField
              name="link"
              label={translate("link")}
              size="small"
              sx={{
                maxWidth: { xs: "150px", sm: "350px", md: "350px" },
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
              loading={false}
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
              {translate("actions_add")}
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
