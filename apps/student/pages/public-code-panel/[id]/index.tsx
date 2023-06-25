import { LoadingScreen } from "@ct-nx/components";
import { PATH_PAGE } from "@routes/paths";
import { useRouter } from "next/router";
import GuestGuard from "src/auth/GuestGuard";
import { useGetPublicCourseContentQuery } from "src/redux/services/student/public-student";

export default function Index(): React.ReactElement {
  const { query, push } = useRouter();
  const { data, isLoading } = useGetPublicCourseContentQuery(
    { id: query.id as string },
    { skip: !query.id }
  );
  if (isLoading || !data) return <LoadingScreen />;
  const getUnitId = (): string => {
    const unit: Record<string, any> = data?.units.filter(
      (el: Record<string, any>, i: number) => i === 0
    )[0];
    const unitId: string = unit.id;
    return unitId;
  };
  const getLessonId = (): string => {
    const unit: Record<string, any> = data?.units.filter(
      (el: Record<string, any>, i: number) => i === 0
    )[0];
    const lessonId: string = unit.lessons[0].id;
    return lessonId;
  };
  push(
    `${PATH_PAGE.publicCodePanel.workSpace(
      query.id as string
    )}/${getUnitId()}/${getLessonId()}`
  );
  return (
    <GuestGuard>
      <LoadingScreen />
    </GuestGuard>
  );
}
