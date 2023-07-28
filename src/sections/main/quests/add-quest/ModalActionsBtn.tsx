import { useRouter } from "next/router";

import { useSnackbar } from "notistack";

import { LoadingButton } from "@mui/lab";
import { Button, Stack } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useDeleteAssignmentMutation } from "src/redux/services/manager/assignments-manager";

export default function ModalActionsBtn(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const { query, push } = useRouter();

  const [deleteAssignmet, { isLoading }] = useDeleteAssignmentMutation();

  const handleDelete = () => {
    try {
      deleteAssignmet({
        schoolId: query.schoolId as string,
        assignmentId: query.assignmentId as string,
      }).unwrap();
      enqueueSnackbar("Assignment deleted!");
      push(STUDENT_PATH_DASHBOARD.class.id(query.id as string));
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "flex-end",
        mt: 3,
      }}
    >
      {query.assignmentId && (
        <LoadingButton
          onClick={handleDelete}
          loading={isLoading}
          variant="soft"
          color="error"
          sx={{
            mr: "auto",
            fontSize: "1.1rem",
            textTransform: "uppercase",
            width: "240px",
            py: 0,
          }}
        >
          delete
        </LoadingButton>
      )}
      <Stack sx={{ gap: 3, flexDirection: "row" }}>
        <Button
          onClick={() => {
            push(STUDENT_PATH_DASHBOARD.class.id(query.id as string));
          }}
          variant="contained"
          sx={{
            fontSize: "1.1rem",
            background: "#EAEAEB",
            border: "2px solid #EAEAEB",
            textTransform: "uppercase",
            color: "#364954",
            width: "240px",
            py: 0,
            "&:hover": {
              background: "#fff",
              border: "2px solid #EAEAEB",
              color: "#364954",
              boxShadow: 0,
            },
          }}
        >
          cancel
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          sx={{
            fontSize: "1.1rem",
            background: "#EE467A",
            border: "2px solid #EE467A",
            textTransform: "uppercase",
            width: "240px",
            py: 0,
            ml: 0,
            "&:hover": {
              background: "#fff",
              border: "2px solid #EE467A",
              color: "#EE467A",
              boxShadow: 0,
            },
          }}
          loading={false}
        >
          launch
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
