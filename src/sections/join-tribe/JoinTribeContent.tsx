import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { useSnackbar } from "notistack";

import { LoadingButton } from "@mui/lab";
import { Button, Link, Stack, Typography } from "@mui/material";

import { Image } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useJoinClassMutation } from "src/redux/services/manager/classes-student";
import { useTranslate } from "src/utils/translateHelper";

interface IJoinTribeContentProps {
  classId: string;
  handleCloseModal: () => void;
}
export default function JoinTribeContent({
  classId,
  handleCloseModal,
}: IJoinTribeContentProps): React.ReactElement {
  const { query, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, setIsPending] = useState(false);
  const [joinClass, { isLoading }] = useJoinClassMutation();
  const translate = useTranslate();

  const handleJoin = async (): Promise<void> => {
    try {
      const response = await joinClass({
        share_token: query.joinCode as string,
      }).unwrap();
      if (response.tribe) {
        enqueueSnackbar(translate("joined_to_class_msg"));
        handleCloseModal();
        push(STUDENT_PATH_DASHBOARD.class.id(classId));
        cleanJoinTribeStorage();
      } else {
        enqueueSnackbar(translate("send_reques_for_join_to_class"));
        setIsPending(true);
        cleanJoinTribeStorage();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const cleanJoinTribeStorage = (): void => {
    if (localStorage.getItem("JOIN_TRIBE")) {
      localStorage.removeItem("JOIN_TRIBE");
    }
  };

  return (
    <>
      {!isPending ? (
        <Stack alignItems="center">
          <Typography variant="h4">{translate("home_join_tribe")}</Typography>
          <Typography variant="body1">
            {translate("been_invited_msg")}
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
            {translate("actions_join")}
          </LoadingButton>
          <Link
            component={NextLink}
            href={STUDENT_PATH_DASHBOARD.class.root}
            onClick={cleanJoinTribeStorage}
            color="inherit"
          >
            {translate("home_not_now")}
          </Link>
        </Stack>
      ) : (
        <Stack alignItems="center">
          <Typography variant="h4" gutterBottom>
            {translate("home_thanks_for_request")}
          </Typography>
          <Typography variant="body1">
            {translate("heme_wait_for_approve")}
          </Typography>
          <Image
            sx={{
              maxWidth: "200px",
              maxHeight: "230px",
              mt: 2,
            }}
            src="/assets/join-class/join-tiger.svg"
            alt="compleated"
          />
          <Button
            onClick={() => {
              push(STUDENT_PATH_DASHBOARD.class.root);
            }}
            sx={{
              background: "#43D4DD33",
              color: "#43D4DD",
              fontSize: "1.5rem",
              mt: 3,
              mb: 3,
              minWidth: "300px",
            }}
          >
            {translate("home_go_to_main")}
          </Button>
        </Stack>
      )}
    </>
  );
}
