import { useRouter } from "next/router";
import { useState } from "react";

import { useGoogleLogin } from "@react-oauth/google";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";

import {
  useGetGoogleClassesQuery,
  useMigrateGoogleClassesStudentsMutation,
} from "src/redux/services/manager/students-manager";
import { useTranslate } from "src/utils/translateHelper";

import { Iconify } from "../iconify";
import { useSnackbar } from "../snackbar";
import { GoogleBtn } from "./GoogleBtn";
import { GoogleClassesList } from "./GoogleClassesList";

interface IClassroomModal {
  children: React.ReactElement;
  schoolId: string;
}

export default function ClassroomModal({
  children,
  schoolId,
}: IClassroomModal) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [classId, setClassId] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const translate = useTranslate();

  const [migrate, { isLoading }] = useMigrateGoogleClassesStudentsMutation();

  const { data, isFetching } = useGetGoogleClassesQuery(
    {
      schoolId,
      classId: router.query.id as string,
      access_token: token,
    },
    { skip: !token }
  );

  const onLoginWithGoogle = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/classroom.courses.readonly",
    onSuccess: async ({ access_token: accessToken }) => {
      setToken(accessToken);
    },
  });

  const onMigrateStudents = async () => {
    try {
      await migrate({
        schoolId,
        classId: router.query.id as string,
        access_token: token,
        google_class_id: classId,
      }).unwrap();
      enqueueSnackbar(translate("messages_migrate"));
      setOpen(false);
    } catch (e) {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
    }
  };

  return (
    <>
      <Box
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </Box>
      <Dialog
        fullWidth
        maxWidth={"xs"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          sx={{
            justifyContent: "end",
            alignItems: "flex-end",
            display: "flex",
            p: 1,
          }}
        >
          <IconButton>
            <Iconify
              icon="ep:close"
              width={24}
              height={24}
              onClick={() => {
                setOpen(false);
              }}
            />
          </IconButton>
        </Box>
        <Box ml="30px" mb="30px" mr="30px">
          <Box display="flex" alignItems="center" ml="-20px">
            <Button
              sx={{
                color: "inherit",
                background: "none",
                p: "0px",
                "&:hover": {
                  background: "none",
                  boxShadow: "none",
                },
              }}
            >
              <Iconify
                icon="iconamoon:arrow-left-2-bold"
                width={28}
                height={28}
                onClick={() => {
                  setOpen(false);
                }}
              />
            </Button>
            <Typography variant="h4" ml="-10px">
              {translate("share_google_classroom")}
            </Typography>
          </Box>
          <Box mt="32px" mb="32px">
            {isFetching ? <Skeleton variant="rounded" height="56px" /> : null}
            {!token ? (
              <GoogleBtn
                onClick={() => {
                  onLoginWithGoogle();
                }}
              />
            ) : null}
            {data?.length && !isFetching ? (
              <GoogleClassesList
                classes={data ?? []}
                onSelectClass={setClassId}
              />
            ) : null}
          </Box>
          <LoadingButton
            loading={isLoading}
            sx={{ height: 50 }}
            variant="contained"
            disabled={!classId}
            onClick={onMigrateStudents}
            fullWidth
          >
            {translate("actions_migrate")}
          </LoadingButton>
        </Box>
      </Dialog>
    </>
  );
}
