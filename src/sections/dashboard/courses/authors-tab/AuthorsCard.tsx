import NextLink from "next/link";

import { useSnackbar } from "notistack";
import { RxLinkedinLogo } from "react-icons/rx";

import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import { SvgColor } from "@components";
import { IAuthor } from "src/redux/services/interfaces/author.interface";
import { useDeleteAuthorMutation } from "src/redux/services/manager/author-manager";
import { useTranslate } from "src/utils/translateHelper";

import AddAuthorDialog from "./AddAuthorDialog";

interface IAuthorsCardProps {
  author: IAuthor;
  courseId: string;
}

export default function AuthorsCard({
  author,
  courseId,
}: IAuthorsCardProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteAuthor, { isLoading }] = useDeleteAuthorMutation();
  const translate = useTranslate();

  const handleDeleteAuthor = (): void => {
    try {
      if (author.id) {
        deleteAuthor({ id: author.id }).unwrap();
        enqueueSnackbar(translate("messages_deleted"));
      }
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
  };

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
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
            py: 2,
            px: 2,
          }}
        >
          <LoadingButton
            color="error"
            variant="soft"
            sx={{ whiteSpace: "nowrap", textTransform: "none" }}
            loading={isLoading}
            onClick={handleDeleteAuthor}
          >
            {translate("actions_delete_author")}
          </LoadingButton>
          <AddAuthorDialog courseId={courseId} defaultValues={author}>
            <Button variant="soft" color="success" sx={{ width: "100%" }}>
              {translate("actions_edit")}
            </Button>
          </AddAuthorDialog>
        </Box>
      </Card>
    </>
  );
}
