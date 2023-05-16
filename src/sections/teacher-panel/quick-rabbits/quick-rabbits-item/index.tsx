import Iconify from "@components/iconify";

import { IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { PATH_DASHBOARD } from "@routes/paths";
import { onlineStudentsAtom } from "@sections/teacher-panel/atoms/online-students.atom";
import { IQuickRabbit } from "@sections/teacher-panel/atoms/quick-rabbit.atom";
import { Messages } from "@sections/teacher-panel/quick-rabbits/quick-rabbits-item/message";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IQuickRabbitsItem {
  rabit: IQuickRabbit;
  onClose: (userId: string) => void;
}

export default function QuickRabbitsItem({
  rabit,
  onClose,
}: IQuickRabbitsItem): React.ReactElement | null {
  const { query } = useRouter();
  const [onlineStudents] = useAtom(onlineStudentsAtom);

  useEffect(() => {
    if (!onlineStudents || rabit.id === query.id) return;
    if (!onlineStudents[rabit.id]) onClose(rabit.id);
  }, [onlineStudents])

  const isRabbitActive = rabit.id === query.studentId;

  if (!rabit) return null;

  return (
    <Box
      height="469px"
      width="350px"
      border="1px solid #cbcccb"
      borderRadius="15px"
      overflow="hidden"
      bgcolor="#364954"
    >
      <Box
        bgcolor="rgba(120, 56, 121, 0.7)"
        height="35px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        alignContent="center"
        p="5px 6px 4px 10px"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          <Link
            replace
            shallow
            href={
              PATH_DASHBOARD.school.controller(query.id as string) +
              (!isRabbitActive ? `?studentId=${rabit.id}` : "")
            }
          >
            <IconButton>
              <Iconify icon={isRabbitActive ? "majesticons:door-exit-line" : "majesticons:door-enter-line"} color={isRabbitActive ? "red" : "#EAEAEB"} />
            </IconButton>
          </Link>
          <Tooltip title={rabit.email} placement="top">
            <Typography noWrap width="160px" color="#EAEAEB" ml="5px">
              {rabit.email}
            </Typography>
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => {
              onClose(rabit.id);
            }}
          >
            <Iconify icon="material-symbols:close-rounded" color="#EAEAEB" />
          </IconButton>
        </Box>
      </Box>
      <Messages reciverId={rabit.id} />
    </Box>
  );
}
