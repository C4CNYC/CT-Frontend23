import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Box, FormGroup, Stack } from "@mui/material";

import { FormProvider, RHFTextField } from "@components";
import {
  useDeleteSchoolSocialMutation,
  useUpdateSchoolSocialMutation,
} from "src/redux/services/manager/schools-manager";
import { useTranslate } from "src/utils/translateHelper";

import { SOCIAL_ICONS } from "../../../../assets/data";

interface FormValuesProps {
  socialID: string;
  schoolId: string;
  link: string;
}

interface Props {
  schoolId: string;
  socialItem: {
    type: string;
    id: string;
    socialID: string;
    link: string;
  };
  defaultValues?: FormValuesProps;
}

const URL =
  // eslint-disable-next-line no-useless-escape
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const UpdateLinkSchema = Yup.object().shape({
  link: Yup.string().matches(URL, "Enter a valid url"),
});

export default function SocialItem({
  schoolId,
  socialItem,
}: Props): React.ReactElement | null {
  const [edit, setEdit] = useState(true);
  const [deleteSocial] = useDeleteSchoolSocialMutation();
  const [editSocial] = useUpdateSchoolSocialMutation();
  const { enqueueSnackbar } = useSnackbar();
  const translate = useTranslate();

  const defaultValues = {
    link: socialItem?.link ?? "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateLinkSchema),
    defaultValues,
  });

  const { formState } = methods;

  const isFormEdited = formState.isDirty;

  const handleEditSocial = async (data: FormValuesProps): Promise<void> => {
    try {
      await editSocial({
        schoolId,
        socialID: socialItem.id,
        link: data?.link,
      }).unwrap();
      enqueueSnackbar(translate("networks_tab_edited_msg"));
      setEdit(!edit);
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };
  const handleDeleteSocial = async (socialID: string): Promise<void> => {
    try {
      await deleteSocial({
        schoolId,
        socialID,
      }).unwrap();
      enqueueSnackbar(translate("networks_tab_deleted_msg"));
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
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
          <FormGroup row sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                width: { xs: "100%", sm: "350px", md: "max-content" },
              }}
            >
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
              <RHFTextField
                size="small"
                sx={{
                  width: { xs: "100%", sm: "100%", md: "350px" },
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
                disabled={edit ?? !isFormEdited}
                sx={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  textTransform: "lowercase",
                  height: "40px",
                }}
              >
                {translate("actions_save")}
              </LoadingButton>
            </Box>
            <Box sx={{ mt: { xs: 2, sm: 0, md: 0 } }}>
              <LoadingButton
                variant="outlined"
                onClick={() => {
                  setEdit(!edit);
                }}
                sx={{ ml: { xs: 0, sm: 2, md: 2 }, height: "40px" }}
              >
                {edit ? translate("actions_edit") : translate("actions_cansel")}
              </LoadingButton>
              <LoadingButton
                sx={{ ml: 2, mr: 2, height: "40px" }}
                variant="outlined"
                color="error"
                onClick={async () => {
                  await handleDeleteSocial(socialItem.id);
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
