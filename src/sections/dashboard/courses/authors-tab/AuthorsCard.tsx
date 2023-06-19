import {
  Avatar,
  Button,
  Card,
  Collapse,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useState } from "react";
import { RxLinkedinLogo } from "react-icons/rx";
import { IAuthor } from "src/redux/services/interfaces/author.interface";
// import {
//   useAddAuthorToCourseMutation,
//   useRemoveAuthorFromCourseMutation,
// } from "src/redux/services/manager/author-manager";
import AuthorForm from "./AuthorForm";

interface Props {
  author: IAuthor;
  courseId: string;
}

export default function AuthorsCard({
  author,
  courseId,
}: Props): React.ReactElement {
  const [editVisible, setEditVisible] = useState<boolean>(false);

  // const [addToCourse, { isLoading }] = useAddAuthorToCourseMutation();
  // const [removeFromCourse, { isLoading: isRemoving }] =
  //   useRemoveAuthorFromCourseMutation();

  // const addRemoveAuthorToCourse = () => {};
  return (
    <>
      <Card sx={{ p: 2 }}>
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            pb={1}
          >
            <Typography variant="h6" gutterBottom sx={{ maxWidth: "150px" }}>
              {author.name}
            </Typography>
            <Stack direction="row" gap={1}>
              <Button
                variant="soft"
                color="success"
                size="small"
                onClick={() => {
                  setEditVisible(true);
                }}
              >
                Edit
              </Button>
              <Button variant="contained" color="success" size="small">
                Add to course
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row">
            <Typography variant="body2">
              <Avatar
                src={author.avatar ?? ""}
                sx={{
                  float: "left",
                  width: "60px",
                  height: "60px",
                  mr: 1,
                }}
              />
              {author.about}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" gap={2} mt={2}>
            <Typography variant="subtitle2">{author.email}</Typography>
            <Link component={NextLink} href={author.linkedin}>
              <RxLinkedinLogo size="25px" color="#0077b5" />
            </Link>
          </Stack>
        </Stack>
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
