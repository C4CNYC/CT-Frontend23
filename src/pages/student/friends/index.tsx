import { useRouter } from "next/router";

import { Box, Container, Skeleton } from "@mui/material";

import {
  CustomBreadcrumbs,
  EmptyContent,
  SimpleInfiniteList,
  useSettingsContext,
} from "@components";
import { DEFAULT_TAKE_PER_PAGE, FilterMode, useFilters } from "@hooks";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { SkeletonFriends } from "@sections/dashboard/friends/SkeletonFriends";
import UserCard from "@sections/dashboard/friends/UserCard";
import SkeletonBreadcrumbs from "@sections/skeleton/SkeletonBreadcrumbs";
import SkeletonFilter from "@sections/skeleton/skeletonFilter";
import { getCountTakingElment } from "@utils";
import {
  IFriend,
  IFriendsSearchParams,
} from "src/redux/interfaces/friends.interface";
import { useGetFriendsStudentContentQuery } from "src/redux/services/manager/friends-manager";

import FilterFriends from "./filter";

Friends.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function Friends(): React.ReactElement {
  const { query } = useRouter();
  const { themeStretch } = useSettingsContext();
  const { filters, setFilter } = useFilters<IFriendsSearchParams>(
    {
      name: "",
      class_id: query.class_id as string,
    },
    FilterMode.global
  );
  const { data, isLoading, isFetching } =
    useGetFriendsStudentContentQuery(filters);

  return (
    <>
      <Container maxWidth={themeStretch ? false : "lg"}>
        {isLoading ? (
          <Container>
            <SkeletonBreadcrumbs /> <SkeletonFilter />
            <Box
              gap={3}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{
                  width: { xs: "100%", sm: "47%", md: "31%" },
                  height: "460px",
                  mb: "18px",
                }}
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{
                  width: { xs: "100%", sm: "47%", md: "31%" },
                  height: "460px",
                  mb: "18px",
                }}
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{
                  width: { xs: "100%", sm: "47%", md: "31%" },
                  height: "460px",
                  mb: "18px",
                }}
              />
            </Box>
          </Container>
        ) : (
          <>
            <CustomBreadcrumbs
              heading=""
              links={[
                { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
                { name: "Friends", href: STUDENT_PATH_DASHBOARD.friends.root },
              ]}
            />
            <FilterFriends filters={filters} setFilter={setFilter} />
          </>
        )}

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
        >
          <SimpleInfiniteList
            hasNextPage={data?.meta.hasNextPage ?? false}
            onLoadMore={() => {
              if (data?.meta.take !== filters?.take) return;
              setFilter("take", Number(filters.take) + DEFAULT_TAKE_PER_PAGE);
            }}
            loading={isLoading ?? isFetching}
          >
            {data?.data.map((user: IFriend, i: number) => {
              return <UserCard key={user.id} user={user} />;
            })}
            {isFetching
              ? Array(
                  getCountTakingElment(
                    Number(data?.meta.itemCount),
                    Number(DEFAULT_TAKE_PER_PAGE)
                  )
                )
                  .fill(null)
                  .map((v, i) => <SkeletonFriends key={i + 40} />)
              : null}
          </SimpleInfiniteList>
        </Box>
        {!isLoading && !isFetching && !data?.data.length ? (
          <EmptyContent title="You have no friends yet" />
        ) : null}
      </Container>
    </>
  );
}
