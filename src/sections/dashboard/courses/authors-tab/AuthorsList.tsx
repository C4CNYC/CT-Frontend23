import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Collapse, IconButton, Skeleton, Stack } from "@mui/material";
import { useState } from "react";
import { useGetAuthorsQuery } from "src/redux/services/manager/author-manager";
import AuthorForm from "./AuthorForm";
import AuthorsCard from "./AuthorsCard";
interface Props {
  id: string;
}

export default function AuthorsList({ id }: Props): React.ReactElement {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const { data, isLoading } = useGetAuthorsQuery();

  return (
    <Stack gap={2}>
      <Collapse in={!formVisible}>
        <IconButton
          sx={{
            display: "flex",
            borderRadius: 3,
            py: 1,
            background: "rgba(99, 115, 129, 0.18)",
            width: "100%",
          }}
          onClick={() => {
            setFormVisible(!formVisible);
          }}
        >
          <ControlPointIcon fontSize="large" />
        </IconButton>
      </Collapse>
      <Collapse in={formVisible}>
        <AuthorForm courseId={id} setFormVisible={setFormVisible} />
      </Collapse>
      {isLoading || !data ? (
        <Skeleton />
      ) : (
        data.data.map((author) => (
          <Stack key={author.id}>
            <Collapse in={!editVisible}>
              <AuthorsCard setEditVisible={setEditVisible} />
            </Collapse>
            <Collapse in={editVisible}>
              <AuthorForm
                courseId={id}
                isEdit={true}
                setFormVisible={setEditVisible}
                defaultValues={author}
              />
            </Collapse>
          </Stack>
        ))
      )}
    </Stack>
  );
}
