import { 
  useForm,
  Controller, 
} from "react-hook-form";
import * as Yup from "yup";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { MuiColorInput } from "mui-color-input";
import { yupResolver } from "@hookform/resolvers/yup";

import { 
  Box, 
  Stack,
 } from "@mui/system";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { 
  FormProvider, 
  RHFTextField,
} from "@components";

import { getRandomColor } from "@utils";

import {
  usePostGoalMutation,
  useUpdateGoalMutation,
} from "src/redux/services/student/goals-student";
import { IGoals } from "src/redux/interfaces/goals.interface";
import { APIError } from "src/redux/interfaces/custom-error.interface";

interface FormValuesProps {
  title: string;
  description: string;
  color: string;
  id?: string;
}

interface Props {
  children: React.ReactElement;
  goal?: IGoals;
}

const AddEditGoalDialog = ({ children, goal }: Props): React.ReactElement => {
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const [postGoal, { isLoading }] = usePostGoalMutation();
  const [editGoal, { isLoading: isEditing }] = useUpdateGoalMutation();

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  const defaultValues = {
    title: goal?.title ?? "",
    description: goal?.description ?? "",
    color: goal?.color ?? getRandomColor(),
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
      if (goal) {
        await editGoal({ id: goal.id as string, ...data }).unwrap();
      } else {
        await postGoal(data).unwrap();
      }

      enqueueSnackbar(`${goal ? "Edited" : "Added"} successfully!`);
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
        <DialogTitle>{goal ? "Edit" : "Create"}</DialogTitle>
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

export default AddEditGoalDialog;
