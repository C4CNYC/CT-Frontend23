import { useRouter } from "next/router";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useGetClassesQuery } from "src/redux/services/student/classes-manager";

export default function ClassMain(): React.ReactElement {
  const { push } = useRouter();
  const { data: tribes } = useGetClassesQuery({});
  if (tribes) {
    push(STUDENT_PATH_DASHBOARD.class?.id(tribes.data[0]?.id));
  }
  return <></>;
}
