import { useFilters } from "@hooks/useFilters";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Collapse, IconButton, Skeleton, Stack } from "@mui/material";
import { useState } from "react";
import { IAuthorSearchParams } from "src/redux/services/interfaces/author.interface";
import { useGetAuthorsQuery } from "src/redux/services/manager/author-manager";
import AuthorForm from "./AuthorForm";
import AuthorsCard from "./AuthorsCard";
import FilterAuthors from "./filter";
interface Props {
  id: string;
}

export default function AuthorsList({ id }: Props): React.ReactElement {
  const { filters, setFilter } = useFilters<IAuthorSearchParams>({
    name: "",
  });
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const { data, isLoading } = useGetAuthorsQuery({});
  return (
    <Stack gap={1}>
      <Stack direction="row">
        <FilterAuthors filters={filters} setFilter={setFilter} />
        <IconButton
          sx={{
            display: "flex",
            borderRadius: 1,
            py: 1,
            ml: 1,
            background: "rgba(99, 115, 129, 0.18)",
            width: "15%",
          }}
          onClick={() => {
            setFormVisible(!formVisible);
          }}
        >
          {formVisible ? (
            <HighlightOffIcon fontSize="large" />
          ) : (
            <ControlPointIcon fontSize="large" />
          )}
        </IconButton>
      </Stack>
      <Collapse in={formVisible} unmountOnExit>
        <AuthorForm courseId={id} setFormVisible={setFormVisible} />
      </Collapse>
      {isLoading || !data ? (
        <Skeleton />
      ) : (
        data.data.map((author) => (
          <AuthorsCard key={author.id} author={author} courseId={id} />
        ))
      )}
    </Stack>
  );
}
