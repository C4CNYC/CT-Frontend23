import Link from "next/link";
import { useState } from "react";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import {
  ConfirmDialog,
  Iconify,
  Image,
  Label,
  MenuPopover,
  useSnackbar,
} from "@components";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import CreateCourseDialog from "@sections/dashboard/courses/CreateCourseDialog";
import { BaseResponseInterface } from "@utils";
import { ICourse } from "src/redux/services/interfaces/courseUnits.interface";

import { useDeleteCourseMutation } from "../../../../redux/services/manager/courses-manager";

interface ICourseCardProps {
  course: ICourse & BaseResponseInterface;
}

export default function CourseCard({
  course,
}: ICourseCardProps): React.ReactElement | null {
  const { name, level, price, description, active, cover } = course;
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteCourse] = useDeleteCourseMutation();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const onDelete = async (): Promise<void> => {
    setLoading(true);
    try {
      await deleteCourse({ id: course.id }).unwrap();
      setLoading(false);
      setOpenConfirm(false);
      enqueueSnackbar("Course deleted!");
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Card
        sx={{
          textAlign: "center",
          pb: 2,
          textDecoration: "none",
          border: "1px solid transparent",
          "&:hover": {
            borderColor: "grey.400",
            borderWidth: 1,
            borderStyle: "solid",
          },
        }}
        component={Link}
        href={`${MANAGER_PATH_DASHBOARD.modules.root}?course_id=${course.id}`}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{ zIndex: 2, top: 8, right: 8, position: "absolute" }}
        >
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>

        <Box
          sx={{
            position: "relative",
            borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
          }}
        >
          <Image
            src={cover ?? "/assets/icons/files/ic_folder.svg"}
            alt={cover}
            ratio="16/9"
            style={{ objectFit: "contain", padding: 10 }}
          />
        </Box>

        <Box sx={{ position: "relative" }}>
          <Label
            variant="soft"
            color={active ? "success" : "error"}
            sx={{
              textTransform: "uppercase",
              mr: "auto",
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            {active ? "Active" : "Not Active"}
          </Label>
          <Typography variant="subtitle1" sx={{ pt: 6, mb: 0.5 }}>
            {name}
          </Typography>

          <Typography
            noWrap
            textAlign="center"
            variant="body2"
            sx={{ color: "text.secondary", px: 3 }}
          >
            {description}
          </Typography>
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ pt: 3 }}>
          <div>
            <Typography
              variant="caption"
              component="div"
              sx={{ mb: 0.75, color: "text.disabled" }}
            >
              Level
            </Typography>
            <Typography variant="subtitle1" textTransform="capitalize">
              {level}
            </Typography>
          </div>

          <div>
            <Typography
              variant="caption"
              component="div"
              sx={{ mb: 0.75, color: "text.disabled" }}
            >
              Price
            </Typography>
            <Typography variant="subtitle1">
              {+price.substring(1) === 0 ? "free" : price}
            </Typography>
          </div>
        </Box>
      </Card>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <CreateCourseDialog
          isEdit
          id={course.id}
          defaultValues={{
            name: course.name,
            level: course.level,
            price: course.price.substring(1),
            description: course.description,
            active: course.active,
            public: course.public,
            skills: course.skills,
          }}
        >
          <MenuItem>
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        </CreateCourseDialog>
        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={onDelete}
            loading={loading}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
