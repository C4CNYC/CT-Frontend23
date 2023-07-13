import { useRouter } from "next/router";

import { Avatar, Box, Button, Typography } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { BaseResponseInterface } from "@utils";
import { IClass } from "src/redux/interfaces/class.interface";

interface Props {
  active: boolean;
  classItem: IClass & BaseResponseInterface;
}

export default function TribeListItem({
  active,
  classItem,
}: Props): React.ReactElement {
  const { push } = useRouter();

  return (
    <Button
      variant="text"
      onClick={() => {
        push(STUDENT_PATH_DASHBOARD.class.id(classItem.id));
      }}
      sx={{ p: 0, justifyContent: "flex-start" }}
    >
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: "5px",
          left: "-12px",
          height: "20px",
          width: "4px",
          background: theme.palette.info.light,
          borderRadius: 2,
          zIndex: 10,
          display: active ? "block" : "none",
        })}
      />
      <Avatar
        variant="rounded"
        src={classItem.avatar}
        sx={(theme) => ({
          border: `2px solid ${theme.palette.info.light}`,
          width: "30px",
          height: "30px",
        })}
      />
      <Typography
        sx={(theme) => ({ ml: 2, color: theme.palette.text.secondary })}
        variant="body1"
      >
        {classItem.name}
      </Typography>
    </Button>
  );
}
