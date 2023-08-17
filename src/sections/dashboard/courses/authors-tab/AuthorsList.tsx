import { Button, Skeleton, Stack } from "@mui/material";

import { EmptyContent } from "@components";
import { useGetAuthorsQuery } from "src/redux/services/manager/author-manager";

import AddAuthorDialog from "./AddAuthorDialog";
import AuthorsCard from "./AuthorsCard";

interface IAuthorsListProps {
  courseId: string;
}

export default function AuthorsList({
  courseId,
}: IAuthorsListProps): React.ReactElement {
  const { data, isLoading } = useGetAuthorsQuery({});

  return (
    <Stack gap={1}>
      {isLoading ? (
        <Skeleton variant="rounded" animation="wave" sx={{ height: "260px" }} />
      ) : (
        data?.data.map((author, i) => {
          return (
            <AuthorsCard
              key={author.id}
              author={author}
              courseId={courseId}
              addAuthor={false}
            />
          );
        })
      )}
      {!data?.data.length ? <EmptyContent title="No Data" /> : null}
      <Stack direction="row" mb={1} justifyContent="flex-end">
        <AddAuthorDialog courseId={courseId}>
          <Button variant="contained">Create author</Button>
        </AddAuthorDialog>
      </Stack>
    </Stack>
  );
}
