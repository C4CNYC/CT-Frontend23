import { Button, Skeleton, Stack } from "@mui/material";

import { EmptyContent } from "@components";
import { useGetAuthorsQuery } from "src/redux/services/manager/author-manager";

import AddAuthorDialog from "./AddAuthorDialog";
import AuthorsList from "./AuthorsList";

interface IAuthorsListProps {
  courseId: string;
}

export default function AuthorsTab({
  courseId,
}: IAuthorsListProps): React.ReactElement {
  const { data, isLoading } = useGetAuthorsQuery({ course_id: courseId });

  return (
    <Stack height="100%">
      {!data?.data.length && !isLoading ? (
        <EmptyContent title="No Data" />
      ) : null}
      {isLoading ? (
        <Skeleton variant="rounded" animation="wave" sx={{ height: "260px" }} />
      ) : (
        <AuthorsList authors={data?.data ?? []} courseId={courseId} />
      )}
      <Stack direction="row" justifyContent="flex-end" mt="auto">
        <AddAuthorDialog courseId={courseId}>
          <Button sx={{ mt: 4, mb: 1 }} variant="contained">
            Create author
          </Button>
        </AddAuthorDialog>
      </Stack>
    </Stack>
  );
}
