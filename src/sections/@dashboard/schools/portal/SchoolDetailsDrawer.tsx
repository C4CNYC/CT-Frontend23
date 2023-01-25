import { useState } from "react";
import {
  Box,
  Stack,
  Drawer,
  Divider,
  Typography,
  IconButton,
  StackProps,
  DrawerProps,
} from "@mui/material";
import Image from "next/image";
import Iconify from "../../../../components/iconify";
import Scrollbar from "../../../../components/scrollbar";
import { countries } from "../../../../assets/data";
import * as React from "react";
import FileShareDialog from "../FileShareDialog";
import { SchoolResponce } from "src/redux/services/admin";

// ----------------------------------------------------------------------

interface Props extends DrawerProps {
  item: SchoolResponce;
  onClose: VoidFunction;
  onDelete: VoidFunction;
}

type FormValuesProps = {
  organizationName: string;
  country: string | null;
  address: string | null;
  city: string | null;
};

export default function SchoolDetailsDrawer({
  item,
  open,
  onClose,
  onDelete,
  ...other
}: Props) {
  const [openShare, setOpenShare] = useState(false);

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleChangeInvite = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setInviteEmail(event.target.value);
  };

  const countryName = React.useMemo(() => {
    const country = countries.find(
      (country) => country.code.toLowerCase() === item.country.toLowerCase()
    );
    if (country) return country.label;
    return "";
  }, [item]);

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: 320 },
        }}
        {...other}
      >
        <Scrollbar
          sx={{
            height: 1,
            bgcolor: "background.neutral",
            "& .simplebar-content": {
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2.5 }}
          >
            <Typography variant="h4"> School Info </Typography>
          </Stack>

          <Stack spacing={2.5} justifyContent="center" sx={{ p: 2.5 }}>
            <Image
              width="30"
              height="30"
              alt="school"
              src="/assets/icons/shool/school-icon.svg"
            />
            <Typography variant="h6" sx={{ wordBreak: "break-all" }}>
              {item.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ wordBreak: "break-all" }}>
              {item.city}, {countryName}
            </Typography>
            <Divider sx={{ borderStyle: "dashed" }} />
          </Stack>
        </Scrollbar>
        <FileShareDialog
          open={openShare}
          shared={null}
          inviteEmail="email@codetribe.io"
          onChangeInvite={handleChangeInvite}
          onCopyLink={() => {}}
          onClose={() => {
            handleCloseShare();
          }}
        />
      </Drawer>
    </>
  );
}
