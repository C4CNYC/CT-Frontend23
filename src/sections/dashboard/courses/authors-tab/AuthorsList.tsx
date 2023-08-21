import { Stack } from "@mui/material";

import { IAuthor } from "src/redux/services/interfaces/author.interface";

import AuthorsCard from "./AuthorsCard";

interface IAuthorsListProps {
  authors: IAuthor[];
  courseId: string;
}
export default function AuthorsList({
  authors,
  courseId,
}: IAuthorsListProps): React.ReactElement {
  return (
    <Stack gap={2}>
      {authors.map((author, i) => {
        return (
          <AuthorsCard key={author.id} author={author} courseId={courseId} />
        );
      })}
    </Stack>
  );
}
