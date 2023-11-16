import { useEffect, useState } from "react";

import { Box, Container } from "@mui/material";

import {
  CustomBreadcrumbs,
  EmptyContent,
  SimpleInfiniteList,
  useSettingsContext,
} from "@components";
import { DEFAULT_TAKE_PER_PAGE, FilterMode, useFilters } from "@hooks";
import { StudentDashboardLayout } from "@layouts/dashboard/StudentDashboardLayout";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import GalleryItem from "@sections/dashboard/gallery/GalleryElement";
import {
  SkeletonGalleryBreadcrumbs,
  SkeletonGalleryFilter,
  SkeletonGalleryItem,
} from "@sections/dashboard/gallery/SkeletonGallery";
import FilterGallery from "@sections/dashboard/gallery/filter";
import { getCountTakingElment } from "@utils";
import {
  IGallery,
  IGallerySearchParams,
} from "src/redux/interfaces/gallary.interface";
import { useGetProjectsQuery } from "src/redux/services/manager/gallery-student";

PublicProjects.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);
export default function PublicProjects(): React.ReactElement {
  const [projects, setProjects] = useState<IGallery[] | []>([]);
  const { themeStretch } = useSettingsContext();
  const { filters, setFilter } = useFilters<IGallerySearchParams>(
    {
      title: "",
    },
    FilterMode.global
  );
  const { data, isLoading, isFetching } = useGetProjectsQuery(filters);

  useEffect(() => {
    if (data) {
      setProjects(data.data.filter((el: IGallery) => el.public === true));
    }
  }, [data]);

  return (
    <>
      <Container maxWidth={themeStretch ? false : "lg"}>
        {isLoading ? (
          <>
            <SkeletonGalleryBreadcrumbs />
            <SkeletonGalleryFilter />
          </>
        ) : (
          <>
            <CustomBreadcrumbs
              heading=""
              links={[
                { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
                { name: "Gallery", href: STUDENT_PATH_DASHBOARD.gallery.root },
                {
                  name: "Public",
                  href: STUDENT_PATH_DASHBOARD.gallery.publicProject,
                },
              ]}
            />
            <FilterGallery filters={filters} setFilter={setFilter} />
          </>
        )}
        <SimpleInfiniteList
          hasNextPage={data?.meta.hasNextPage ?? false}
          onLoadMore={() => {
            if (data?.meta.take !== Number(filters?.take)) return;
            setFilter("take", Number(filters.take) + DEFAULT_TAKE_PER_PAGE);
          }}
          loading={isLoading ?? isFetching}
        >
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
          >
            {projects.map((item) => (
              <GalleryItem key={item.id} item={item} />
            ))}
            {isFetching
              ? Array(
                  getCountTakingElment(
                    Number(data?.meta.itemCount),
                    Number(filters.take)
                  )
                )
                  .fill(null)
                  .map((v, i) => <SkeletonGalleryItem key={i + 22} />)
              : null}
          </Box>
        </SimpleInfiniteList>

        {!isLoading && !isFetching && !data?.data.length ? (
          <EmptyContent title="You have no projects yet" />
        ) : null}
      </Container>
    </>
  );
}
