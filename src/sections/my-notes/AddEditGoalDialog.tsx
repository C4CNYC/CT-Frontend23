import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { MuiColorInput } from "mui-color-input";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Box, Stack } from "@mui/system";

import { FormProvider, RHFTextField } from "@components";
import { getRandomColor } from "@utils";
import { APIError } from "src/redux/interfaces/custom-error.interface";
import { IGoals } from "src/redux/interfaces/goals.interface";
import {
  usePostGoalMutation,
  useUpdateGoalMutation,
} from "src/redux/services/manager/goals-student";

interface FormValuesProps {
  title: string;
  description: string;
  color: string;
  id?: string;
}

interface IAddEditNotesDialogProps {
  children: React.ReactElement;
  note?: IGoals;
}

const AddEditNotesDialog = ({
  children,
  note,
}: IAddEditNotesDialogProps): React.ReactElement => {
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const [postNote, { isLoading }] = usePostGoalMutation();
  const [editNote, { isLoading: isEditing }] = useUpdateGoalMutation();

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  const defaultValues = {
    title: note?.title ?? "",
    description: note?.description ?? "",
    color: note?.color ?? getRandomColor(),
  };
  const CreateGoalSchema = Yup.object().shape({
    title: Yup.string(),
    description: Yup.string(),
    color: Yup.string(),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateGoalSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      if (note) {
        await editNote({ id: note.id as string, ...data }).unwrap();
      } else {
        await postNote(data).unwrap();
      }

      enqueueSnackbar(`${note ? "Edited" : "Added"} successfully!`);
      methods.reset();
    } catch (error) {
      const typedError = error as APIError;
      enqueueSnackbar(typedError.data.message, {
        variant: "error",
      });
    }
    handleClose();
  };

  return (
    <>
      <Box
        onClick={handleClickOpen}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
      <Dialog
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{
          zIndex: 1101,
        }}
      >
        <DialogTitle>{note ? "Edit" : "Create"}</DialogTitle>
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <DialogContent>
            <Stack gap={3} p={1}>
              <RHFTextField name="title" label="Title" />
              <RHFTextField
                multiline
                rows={3}
                name="description"
                label="Description"
              />
              <Controller
                control={methods.control}
                name="color"
                render={({ field, fieldState }) => (
                  <MuiColorInput
                    sx={{ maxWidth: "250px" }}
                    {...field}
                    value={field.value}
                    helperText={fieldState.invalid ? "Color is invalid" : ""}
                    error={fieldState.invalid}
                    isAlphaHidden
                    format="hex"
                  />
                )}
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button color="error" onClick={handleClose}>
              CANCEL
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading || isEditing}
            >
              SAVE
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default AddEditNotesDialog;
