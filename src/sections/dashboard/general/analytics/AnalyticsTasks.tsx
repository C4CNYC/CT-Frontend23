import { useState } from "react";

// @mui
import {
  Card,
  CardHeader,
  CardProps,
  Checkbox,
  CheckboxProps,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
} from "@mui/material";

// components
import { Iconify, MenuPopover } from "@components";

// ----------------------------------------------------------------------

interface ItemProps {
  id: string;
  label: string;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function AnalyticsTasks({
  title,
  subheader,
  list,
  ...other
}: Props): React.ReactElement | null {
  const [selected, setSelected] = useState(["2"]);

  const handleClickComplete = (taskId: string): void => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      {list.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          checked={selected.includes(task.id)}
          onChange={() => {
            handleClickComplete(task.id);
          }}
        />
      ))}
    </Card>
  );
}

// ----------------------------------------------------------------------

interface TaskItemProps extends CheckboxProps {
  task: ItemProps;
}

function TaskItem({
  task,
  checked,
  onChange,
}: TaskItemProps): React.ReactElement | null {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const handleMarkComplete = (): void => {
    handleClosePopover();
  };

  const handleShare = (): void => {
    handleClosePopover();
  };

  const handleEdit = (): void => {
    handleClosePopover();
  };

  const handleDelete = (): void => {
    handleClosePopover();
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          px: 2,
          py: 0.75,
          ...(checked && {
            color: "text.disabled",
            textDecoration: "line-through",
          }),
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={task.label}
          sx={{ flexGrow: 1, m: 0 }}
        />

        <IconButton
          size="large"
          color={openPopover ? "inherit" : "default"}
          onClick={handleOpenPopover}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
      >
        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon="eva:checkmark-circle-2-fill" />
          Mark Complete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="eva:share-fill" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
