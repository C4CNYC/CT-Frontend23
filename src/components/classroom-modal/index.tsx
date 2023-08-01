import { useState } from "react";

import { Box, Button, CircularProgress, Dialog, IconButton, Typography } from "@mui/material";

import { Iconify } from "../iconify";
import { useGoogleLogin } from "@react-oauth/google";
import { useSnackbar } from "../snackbar";
import { useGetGoogleClassesQuery, useMigrateGoogleClassesStudentsMutation } from "src/redux/services/manager/students-manager";
import { useRouter } from "next/router";

import { GoogleBtn } from "./GoogleBtn";
import { GoogleClassesList } from "./GoogleClassesList";

interface Prop {
  children: React.ReactElement;
}

export default function ClassroomModal({ children }: Prop) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [classId, setClassId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const [migrate] = useMigrateGoogleClassesStudentsMutation();

  const { data, isFetching } = useGetGoogleClassesQuery({
    schoolId: "some",
    classId: router.query.id as string,
    access_token: token
  }, { skip: !token });

  const onLoginWithGoogle = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/classroom.courses.readonly",
    onSuccess: async ({ access_token }) => { setToken(access_token) },
  });

  const onMigrateStudents = async () => {
    try {
      await migrate({
        schoolId: "some",
        classId: router.query.id as string,
        access_token: token,
        google_class_id: classId
      }).unwrap()
    } catch (e) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }

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
              onClick={() => { setOpen(false); }}
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
                onClick={() => { setOpen(false); }}
              />
            </Button>
            <Typography variant="h4" ml="-10px">
              Google Classroom
            </Typography>
          </Box>
          <Box mt="32px" mb="32px">
            {isFetching ? <CircularProgress/> : null}
            {!token ? <GoogleBtn onClick={ () => { onLoginWithGoogle() }}/> : null}
            {
              data?.length && !isFetching
                ? <GoogleClassesList classes={data ?? []} onSelectClass={setClassId}/>
                : null
            }
          </Box>
          <Button
            sx={{ height: 50 }}
            variant="contained"
            disabled={!classId}
            onClick={onMigrateStudents}
            fullWidth
          >
            Migrate
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
