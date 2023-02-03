import { useEffect, useState } from "react";
// @mui
import { Box } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// auth
import AuthGuard from "../../auth/AuthGuard";
// components
import { useSettingsContext } from "../../components/settings";
//
import Main from "./Main";
import Header from "./header";
import NavMini from "./nav/NavMini";
import NavVertical from "./nav/NavVertical";
import NavHorizontal from "./nav/NavHorizontal";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrganizationListQuery } from "src/redux/services/admin";
import { setOrganizationList, setOrganization } from "src/redux/slices/global";
import { RootState } from "src/redux/store";

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { themeLayout } = useSettingsContext();
  const org_id = useSelector((state: RootState) => state.global.org_id);
  const dispatch = useDispatch();
   const { data, isLoading } = useGetOrganizationListQuery();

   useEffect(() => {
     if (data?.data) {
       dispatch(setOrganizationList(data.data));
       dispatch(setOrganization(data?.data[0].id));
     }
   }, [data]);

  const isDesktop = useResponsive("up", "lg");

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = (
    <NavVertical openNav={open} onCloseNav={handleClose} />
  );

  const renderContent = () => {
    if (isNavHorizontal) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          {isDesktop ? <NavHorizontal /> : renderNavVertical}

          <Main>{children}</Main>
        </>
      );
    }

    if(!org_id) return null

    if (isNavMini) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          <Box
            sx={{
              display: { lg: "flex" },
              minHeight: { lg: 1 },
            }}
          >
            {isDesktop ? <NavMini /> : renderNavVertical}

            <Main>{children}</Main>
          </Box>
        </>
      );
    }

    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: "flex" },
            minHeight: { lg: 1 },
          }}
        >
          {renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    );
  };

  return <AuthGuard> {renderContent()} </AuthGuard>;
}
