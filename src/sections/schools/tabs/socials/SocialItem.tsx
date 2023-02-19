import React, { useState } from "react";
import { Link, Stack, FormGroup, Box } from "@mui/material";
import {
  useDeleteSchoolSocialMutation,
  useUpdateSchoolSocialMutation,
} from "src/redux/services/manager";
import { SOCIAL_ICONS } from "../../../../assets/data";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import FormProvider, { RHFTextField } from "@components/hook-form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValuesProps = {
  social_id: string;
  school_id: string;
  link: string;
};

type Props = {
  school_id: string;
  socialItem: {
    type: string;
    id: string;
    social_id: string;
    link: string;
  };
  defaultValues?: FormValuesProps;
};

const URL =
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const UpdateLinkSchema = Yup.object().shape({
  link: Yup.string().matches(URL, "Enter a valid url"),
});

export default function SocialItem({ school_id, socialItem }: Props) {
  const [edit, setEdit] = useState(true);
  const [deleteSocial] = useDeleteSchoolSocialMutation();
  const [editSocial] = useUpdateSchoolSocialMutation();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    link: socialItem?.link || "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateLinkSchema),
    defaultValues,
  });

  const { formState } = methods;

  const isFormEdited = formState.isDirty;

  const handleEditSocial = async (data: FormValuesProps) => {
    try {
      await editSocial({
        school_id: school_id,
        social_id: socialItem.id,
        link: data?.link,
      }).unwrap();
      enqueueSnackbar("Social link edited");
      setEdit(!edit);
    } catch (e) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };
  const handleDeleteSocial = async (social_id: string) => {
    try {
      await deleteSocial({
        school_id: school_id,
        social_id: social_id,
      }).unwrap();
      enqueueSnackbar("Social link deleted");
    } catch (e) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{ wordBreak: "break-all" }}
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
                border: "1px solid #919eab42",
                borderRight: "none",
                color: "#627380",
                borderRadius: "8px",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                alignItems: "center",
                padding: "0 10px",
                height: "40px",
              }}
            >
              {SOCIAL_ICONS[socialItem.type]}
            </Box>
            <RHFTextField
              size="small"
              sx={{
                width: "350px",
                "& fieldset": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              }}
              name="link"
              label="Link"
              required
              disabled={edit}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              disabled={edit || !isFormEdited}
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                textTransform: "lowercase",
                height: "40px",
              }}
            >
              Save
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              onClick={() => setEdit(!edit)}
              sx={{ ml: 2, height: "40px" }}
            >
              {edit ? "Edit" : "Cancel"}
            </LoadingButton>
            <LoadingButton
              sx={{ ml: 2, mr: 2, height: "40px" }}
              variant="outlined"
              color="error"
              onClick={() => handleDeleteSocial(socialItem.id)}
            >
              Delete
            </LoadingButton>
          </FormGroup>
        </FormProvider>
      </Stack>
    </>
  );
}
