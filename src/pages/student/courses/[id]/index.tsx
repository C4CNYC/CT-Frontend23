import Head from "next/head";
import { useRouter } from "next/router";

import _ from "lodash";

import { EmptyContent } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import ProjectMain from "@sections/course";
import SkeletonCoursePage from "@sections/course/SkeletonCoursePage";
import { useGetCoursContentQuery } from "src/redux/services/manager/courses-student";

CoursePage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function CoursePage(): React.ReactElement {
  const router = useRouter();
  const { data, isLoading } = useGetCoursContentQuery(
    {
      id: router.query.id as string,
    },
    { skip: !router.query.id }
  );

  if (isLoading) return <SkeletonCoursePage />;
  if (!isLoading && _.isEmpty(data) && data !== undefined) {
    return <EmptyContent title="Course doesn`t exist" />;
  }

  return (
    <>
      <Head>
        <title>Course | CodeTribe</title>
      </Head>
      {data ? <ProjectMain course={data} /> : null}
    </>
  );
}
