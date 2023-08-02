import NextLink from "next/link";
import { useRouter } from "next/router";

import { useSnackbar } from "notistack";

import { LoadingButton } from "@mui/lab";
import { Link, Stack, Typography } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useJoinClassMutation } from "src/redux/services/student/classes-manager";

export default function JoinTribeContent(): React.ReactElement {
  const { query, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [joinClass, { isLoading }] = useJoinClassMutation();

  const handleJoin = async () => {
    try {
      await joinClass({ share_token: query.id as string });
      enqueueSnackbar("You joined to class!");
      push(STUDENT_PATH_DASHBOARD.class.root);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <Stack alignItems="center">
      <Typography variant="h4">Join this tribe</Typography>
      <Typography variant="body1">
        You’ve been invited to join this tribe.
      </Typography>
      <LoadingButton
        onClick={handleJoin}
        loading={isLoading}
        sx={{
          background: "#43D4DD33",
          color: "#43D4DD",
          fontSize: "1.5rem",
          mt: 3,
          mb: 3,
          minWidth: "300px",
        }}
      >
        JOIN
      </LoadingButton>
      <Link
        component={NextLink}
        href={STUDENT_PATH_DASHBOARD.class.root}
        color="inherit"
      >
        Not now
      </Link>
    </Stack>
  );
}
