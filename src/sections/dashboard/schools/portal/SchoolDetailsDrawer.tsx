import Image from "next/image";
import * as React from "react";

import { Divider, Drawer, DrawerProps, Stack, Typography } from "@mui/material";

import { Scrollbar } from "@components";
import { ISchoolSummary } from "src/redux/services/interfaces/school.interface";
import { useTranslate } from "src/utils/translateHelper";

import { countries } from "../../../../assets/data";
import TeacherSection from "../../organization/schools/TeachersSection";
import ClassSection from "../classes/ClassSection";

// ----------------------------------------------------------------------

interface Props extends DrawerProps {
  item: ISchoolSummary;
  onClose: VoidFunction;
  onDelete: VoidFunction;
}

export default function SchoolDetailsDrawer({
  item,
  open,
  onClose,
  onDelete,
  ...other
}: Props): React.ReactElement | null {
  const countryName = React.useMemo(() => {
    const country = countries.find(
      (country) => country?.code?.toLowerCase() === item?.country?.toLowerCase()
    );
    if (country) return country.label;
    return "";
  }, [item]);

  const translate = useTranslate();

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
            <Typography variant="h4">
              {translate("schools_school_info")}{" "}
            </Typography>
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
          </Stack>
          <Divider sx={{ borderStyle: "dashed" }} />
          <TeacherSection schoolId={item.id as string} />
          <Divider sx={{ borderStyle: "dashed", pt: 2.5 }} />
          <ClassSection schoolId={item.id as string} />
          <Divider sx={{ borderStyle: "dashed", pt: 2.5 }} />
        </Scrollbar>
      </Drawer>
    </>
  );
}
