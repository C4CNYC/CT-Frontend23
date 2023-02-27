import { useState } from "react";
import FormProvider, {
    RHFSelect,
    RHFSwitch,
    RHFTextField,
  } from "@components/hook-form";
import { Box, Button, Card, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";

interface FormValuesProps {
    name: string;
    description: string;
    active: boolean;
    type: string;
}
interface Props {
    defaultValues?: FormValuesProps;
    children: React.ReactElement;
    isEdit?: boolean;
    id?: string;
}

export default function CreateTaskDialog({
    id,
    isEdit,
    children,
    defaultValues,
}: Props): React.ReactElement {
    const [open, setOpen] = useState(false);

    const handleOpen = (): void => {
        setOpen(true);
    };
    const handleClose = (): void => {
        setOpen(false);
    };

    const methods = useForm<FormValuesProps>({
      });
    return (
        <>
            <Box onClick={handleOpen}>
                {children}
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {isEdit ? "Edit" : "Create"} Task
                </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <FormProvider methods={methods}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <Card sx={{ p: 3 }}>
                                    <Box rowGap={3} display="grid">
                                    <RHFTextField
                                        style={{ width: "350px" }}
                                        name="name"
                                        label="Task name"
                                        required
                                    />

                                    <RHFTextField
                                        name="description"
                                        label="Task description"
                                        required
                                        multiline
                                        rows={3}
                                    />

                                    <RHFSelect name="type" required native label="Task type">
                                        <option key="empty" value="empty"></option>
                                        <option key="multy_media" value="multy_media">
                                            MultyMedia
                                        </option>
                                    </RHFSelect>

                                    <RHFSwitch name="active" label="Task active" />
                                    </Box>
                                    <Box
                                        sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: 2,
                                        mt: 7,
                                        }}
                                    >
                                        <Button onClick={handleClose}>Close</Button>
                                        <LoadingButton type="submit" variant="contained">
                                        Save
                                        </LoadingButton>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </DialogContent>
            </Dialog>
        </>
    )
}
