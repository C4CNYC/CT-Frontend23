import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/system/Stack";

import { useGetMySchoolsQuery } from "src/redux/services/manager/schools-manager";

interface Props {
  setSchoolId: (id: string) => void;
}

export default function FilterCourses({
  setSchoolId,
}: Props): React.ReactElement {
  const { data, isLoading } = useGetMySchoolsQuery({});

  return (
    <>
      <Stack
        spacing={2}
        sx={{ mb: 4 }}
        alignItems="center"
        direction={{
          xs: "column",
          sm: "row",
        }}
      >
        <Autocomplete
          disablePortal
          loading={isLoading}
          id="combo-box-demo"
          options={data?.data ?? []}
          getOptionLabel={(option) => option.name}
          onChange={(e, newValue) => {
            setSchoolId(newValue ? newValue.id : "");
          }}
          sx={{ width: { xs: "100%", sm: 300} }}
          renderInput={(params) => <TextField {...params} label="Shcool" />}
        />
      </Stack>
    </>
  );
}
