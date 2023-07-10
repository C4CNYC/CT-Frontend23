import { useState } from "react";

import { 
  Stack,
  Skeleton, 
  Collapse, 
  IconButton, 
 } from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import { useFilters } from "@hooks";
import FilterAuthors from "./filter";
import AuthorForm from "./AuthorForm";
import AuthorsCard from "./AuthorsCard";
import AddAuthorDialog from "./AddAuthorDialog";
import { useGetAuthorsQuery } from "src/redux/services/manager/author-manager";
import { IAuthorSearchParams } from "src/redux/services/interfaces/author.interface";

interface Props {
  id: string;
}

export default function AuthorsList({ id }: Props): React.ReactElement {
  const { filters, setFilter } = useFilters<IAuthorSearchParams>({
    course_id: id,
  });

  const [formVisible, setFormVisible] = useState<boolean>(false);
  const { data, isLoading } = useGetAuthorsQuery(filters);
  return (
    <Stack gap={1}>
      <Stack direction="row" mb={1}>
        <FilterAuthors
          courseId={filters.course_id ?? ""}
          setCourse={(courseId: string) => {
            setFilter("classId", id);
          }}
        />
        <AddAuthorDialog courseId={id}>
          <IconButton
            sx={{
              display: "flex",
              borderRadius: 1,
              py: 1,
              background: "rgba(99, 115, 129, 0.18)",
              width: "100%",
            }}
          >
            {formVisible ? (
              <HighlightOffIcon fontSize="large" />
            ) : (
              <ControlPointIcon fontSize="large" />
            )}
          </IconButton>
        </AddAuthorDialog>
      </Stack>
      <Collapse in={formVisible} unmountOnExit>
        <AuthorForm courseId={id} setFormVisible={setFormVisible} />
      </Collapse>
      {isLoading || !data ? (
        <Skeleton variant="rounded" animation="wave" sx={{ height: "260px" }} />
      ) : (
        data.data.map((author, i) => {
          return (
            <AuthorsCard
              key={author.id}
              author={author}
              courseId={id}
              addAuthor={false}
            />
          );
        })
      )}
    </Stack>
  );
}
