import { useFilters } from "@hooks/useFilters";
import { Autocomplete, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  IStudent,
  StudentSearchParams,
} from "src/redux/services/interfaces/user.interface";
import { useGetStudentsQuery } from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

export default function FilterStudentsAutocomplete() {
  const router = useRouter();
  const classId = router.query.id as string;
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);

  const { data: classMembers } = useGetStudentsQuery(
    { schoolId, class_id: classId, take: 50 },
    { skip: !schoolId || !classId }
  );
  const { setFilter } = useFilters<StudentSearchParams>({
    name: "",
    take: 50,
  });
  const { data: students } = useGetStudentsQuery({ schoolId });
  return (
    <>
      <Autocomplete<IStudent & BaseResponseInterface, true>
        value={classMembers?.data}
        options={students?.data ?? []}
        getOptionLabel={(option) => option.email}
        renderInput={(params) => (
          <TextField {...params} label="Students" />
        )}
        onInputChange={(e, value) => {
          setFilter("email", value);
        }}
        sx={{
          width: { xs: "100%", sm: "100%", md: "260px", lg: "260px" },
          marginRight: 2,
        }}
      ></Autocomplete>
    </>
  );
}
