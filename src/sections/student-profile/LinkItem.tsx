import React, { useState } from "react";

import { SOCIAL_ICONS } from "@assets/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Box, FormGroup, Stack } from "@mui/material";

import { FormProvider, RHFTextField } from "@components";
import { APIError } from "src/redux/interfaces/custom-error.interface";
import { ISocials } from "src/redux/interfaces/socials.interface";
import {
  useRemoveSocialsMutation,
  useUpdateSocialsMutation,
} from "src/redux/services/manager/socials-student";
import { useTranslate } from "src/utils/translateHelper";

import LinkSelect from "./LinkSelect";

interface FormValuesProps {
  link: string;
  name: string;
  type: string;
}

interface Props {
  studentId: string;
  socialItem: ISocials;
}

const URL =
  // eslint-disable-next-line no-useless-escape
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const UpdateLinkSchema = Yup.object().shape({
  link: Yup.string().matches(URL, "Enter a valid url"),
});

export default function LinkItem({
  studentId,
  socialItem,
}: Props): React.ReactElement {
  const [edit, setEdit] = useState(true);
  const [removeSocial, { isLoading: isRemoveLoading }] =
    useRemoveSocialsMutation();
  const [editSocial, { isLoading: isUpdateLoading }] =
    useUpdateSocialsMutation();
  const { enqueueSnackbar } = useSnackbar();
  const translate = useTranslate();

  const defaultValues = {
    link: socialItem.link,
    name: socialItem.name,
    type: socialItem.type,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateLinkSchema),
    defaultValues,
  });

  const handleEditSocial = async (data: FormValuesProps): Promise<void> => {
    try {
      await editSocial({
        socialId: socialItem.id ?? "",
        ...data,
        studentId,
      }).unwrap();
      enqueueSnackbar(translate("networks_tab_edited_msg"));
      setEdit(!edit);
    } catch (error) {
      const typedError = error as APIError;
      enqueueSnackbar(typedError.data.message, {
        variant: "error",
      });
    }
  };
  const handleDeleteSocial = async (socialId: string): Promise<void> => {
    try {
      await removeSocial({
        socialId,
        studentId,
      }).unwrap();
      enqueueSnackbar(translate("networks_tab_deleted_msg"));
    } catch (error) {
      const typedError = error as APIError;
      enqueueSnackbar(typedError.data.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        sx={{
          wordBreak: "break-all",
        }}
        key={socialItem.type}
      >
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(handleEditSocial)}
        >
          <RHFTextField
            size="small"
            sx={{
              width: { xs: "150px", sm: "350px" },
              pb: 2,
            }}
            name="name"
            label={translate("name")}
            disabled={edit}
          />
          <FormGroup row sx={{ mb: 4 }}>
            {edit ? (
              <Box
                sx={{
                  display: "flex",
                  border: "1px solid #919eab42",
                  borderRight: "none",
                  color: "#627380",
                  borderRadius: "8px",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  alignItems: "center",
                  padding: "0 10px",
                  height: "40px",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                {SOCIAL_ICONS[socialItem.type]}
              </Box>
            ) : (
              <LinkSelect defaultValue={socialItem.type} />
            )}
            <RHFTextField
              size="small"
              sx={{
                width: { xs: "150px", sm: "350px" },
                "& fieldset": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              }}
              name="link"
              label={translate("link")}
              required
              disabled={edit}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              disabled={edit ?? !methods.formState.isDirty}
              loading={isUpdateLoading}
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                textTransform: "lowercase",
                height: "40px",
              }}
            >
              {translate("actions_save")}
            </LoadingButton>
            <Box sx={{ mt: { xs: 2, sm: 2, md: 0 } }}>
              <LoadingButton
                variant="outlined"
                onClick={() => {
                  setEdit(!edit);
                }}
                sx={{ ml: { xs: 0, sm: 0, md: 2 }, height: "40px" }}
              >
                {edit ? translate("actions_edit") : translate("actions_cancel")}
              </LoadingButton>
              <LoadingButton
                sx={{ ml: 2, mr: 2, height: "40px" }}
                variant="outlined"
                color="error"
                loading={isRemoveLoading}
                onClick={async () => {
                  await handleDeleteSocial(socialItem.id ?? "");
                }}
              >
                {translate("actions_delete")}
              </LoadingButton>
            </Box>
          </FormGroup>
        </FormProvider>
      </Stack>
    </>
  );
}
