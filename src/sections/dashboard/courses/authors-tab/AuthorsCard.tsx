import NextLink from "next/link";
import { useState } from "react";

import { useSnackbar } from "notistack";
import { RxLinkedinLogo } from "react-icons/rx";

import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import { SvgColor } from "@components";
import { IAuthor } from "src/redux/services/interfaces/author.interface";
import {
  useAddAuthorToCourseMutation,
  useDeleteAuthorMutation,
} from "src/redux/services/manager/author-manager";

import AuthorForm from "./AuthorForm";

interface Props {
  author: IAuthor;
  courseId: string;
  addAuthor: boolean;
}

export default function AuthorsCard({
  author,
  courseId,
  addAuthor,
}: Props): React.ReactElement {
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [deleteAuthor, { isLoading: isDeleting }] = useDeleteAuthorMutation();
  const [addToCourse, { isLoading }] = useAddAuthorToCourseMutation();

  const handleDeleteAuthor = (): void => {
    try {
      if (author.id) {
        deleteAuthor({ id: author.id }).unwrap();
        enqueueSnackbar("Deleted successfully!");
      }
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
  };

  const addAuthorToCourse = (): void => {
    try {
      if (author.id) {
        addToCourse({ id: author.id, course_id: courseId }).unwrap();
      }
      enqueueSnackbar("Added to course successfully!");
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
  };
  // const removeAuthorFromCourse = (): void => {
  //   try {
  //     if (author.id) {
  //       removeFromCourse({ id: author.id, course_id: courseId }).unwrap();
  //     }
  //     enqueueSnackbar("Deleted from course successfully!");
  //   } catch (error: any) {
  //     enqueueSnackbar(error?.data?.message, {
  //       variant: "error",
  //     });
  //   }
  // };
  return (
    <>
      <Card
        sx={{
          textAlign: "center",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Stack
            sx={(theme) => ({
              pt: "50px",
              background: theme.palette.primary.dark,
            })}
          />
          <SvgColor
            src="/assets/shape_avatar.svg"
            sx={{
              width: 144,
              height: 62,
              zIndex: 10,
              left: 0,
              right: 0,
              bottom: -26,
              mx: "auto",
              position: "absolute",
              color: "background.paper",
            }}
          />

          <Avatar
            alt={author.name}
            src={author.avatar ?? ""}
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              left: 0,
              right: 0,
              bottom: -32,
              mx: "auto",
              position: "absolute",
            }}
          />
          <Link
            component={NextLink}
            href={author.linkedin}
            target="_blank"
            sx={{
              position: "absolute",
              width: "25px",
              height: "25px",
              top: "60px",
              right: "10px",
            }}
          >
            <RxLinkedinLogo size="25px" color="#0077b5" />
          </Link>
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ mt: 6, mb: 0.5, textTransform: "capitalize" }}
        >
          {author.name}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ color: "text.secondary", mb: 0.5 }}
        >
          {author.email}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          {author.about}
        </Typography>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: addAuthor
              ? "repeat(1, 1fr)"
              : "repeat(2, 1fr)",
            gap: 2,
            py: 2,
            px: 2,
          }}
        >
          {addAuthor ? (
            <LoadingButton
              color="success"
              variant="soft"
              sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              loading={isLoading}
              onClick={addAuthorToCourse}
            >
              Add author to course
            </LoadingButton>
          ) : (
            <>
              <LoadingButton
                color="error"
                variant="soft"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
                loading={isDeleting}
                onClick={handleDeleteAuthor}
              >
                Delete author
              </LoadingButton>
              <Button
                variant="soft"
                color="success"
                onClick={() => {
                  setEditVisible(true);
                }}
              >
                Edit
              </Button>
            </>
          )}
        </Box>
      </Card>
      <Collapse in={editVisible} unmountOnExit>
        <AuthorForm
          courseId={courseId}
          isEdit={true}
          setFormVisible={setEditVisible}
          defaultValues={author}
        />
      </Collapse>
    </>
  );
}
