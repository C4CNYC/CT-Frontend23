import { 
  Box, 
  Container,
} from "@mui/material";

import {
  EmptyContent,
  CustomBreadcrumbs,
  SimpleInfiniteList,
  useSettingsContext,
} from "@components";

import { getCountTakingElment } from "@utils";

import { 
  FilterMode, 
  useFilters,
  DEFAULT_TAKE_PER_PAGE, 
} from "@hooks";

import FilterFriends from "./filter";
import {
  IFriend,
  IFriendsSearchParams,
} from "src/redux/interfaces/friends.interface";
import UserCard from "@sections/dashboard/friends/UserCard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import SkeletonFilter from "@sections/skeleton/skeletonFilter";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { SkeletonFriends } from "@sections/dashboard/friends/SkeletonFriends";
import SkeletonBreadcrumbs from "@sections/skeleton/SkeletonBreadcrumbs";
import { useGetFriendsContentQuery } from "src/redux/services/student/friends-manager";

Friends.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Friends(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { filters, setFilter } = useFilters<IFriendsSearchParams>(
    {
      name: "",
    },
    FilterMode.global
  );
  const { data, isLoading, isFetching } = useGetFriendsContentQuery(filters);

  return (
    <>
      <Container maxWidth={themeStretch ? false : "lg"}>
        {isLoading ? (
          <>
            <SkeletonBreadcrumbs /> <SkeletonFilter />{" "}
          </>
        ) : (
          <>
            <CustomBreadcrumbs
              heading="Friends"
              links={[
                { name: "Dashboard", href: STUDENT_PATH_DASHBOARD.home },
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
