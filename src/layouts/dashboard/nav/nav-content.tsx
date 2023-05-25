import Iconify from "@components/iconify";
import Logo from "@components/logo";
import { NavSectionVertical } from "@components/nav-section";
import Scrollbar from "@components/scrollbar";
import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import UserSection from "@sections/home/user-section";
import { useSelector } from "react-redux";
import { Role } from "src/redux/services/enums/role.enum";
import { admin, content, managment } from "./config-navigation";
import { RootState } from "src/redux/store";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { PATH_DASHBOARD } from "@routes/paths";
import { useCreateStreamMutation } from "src/redux/services/manager/stream-manager";

const menuConfig = {
  [Role.Owner]: [admin, managment, content],
  [Role.Admin]: [admin, managment, content],
  [Role.Manager]: [managment, content],
  [Role.Editor]: [content],
};

export const NavContent = (): React.ReactElement => {
  const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state: RootState) => state.global.user);
  const menu = menuConfig[user?.role as Role];

  const [createStream] = useCreateStreamMutation();

  const onCreateSession = async (): Promise<void> => {
    try {
      const stream = await createStream().unwrap();
      replace(`${PATH_DASHBOARD.stream}/${stream?.id}`)
    } catch (e) {
      enqueueSnackbar("something went wrong", { variant: "error" })
    }
  }

  return (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <>
        <Stack
          spacing={3}
          sx={{
            pt: 3,
            pb: 2,
            px: 2.5,
            flexShrink: 0,
          }}
        >
          <Logo />
          <Stack sx={{ mt: "30px" }}></Stack>
          <UserSection />
          <Button onClick={onCreateSession} sx={{ height: 50 }} variant="contained">
            START SESSION
            <Iconify sx={{ ml: 2 }} icon="clarity:play-solid" />
          </Button>
        </Stack>

        <NavSectionVertical data={menu} />
      </>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  )
}
