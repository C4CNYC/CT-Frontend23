import { useSettingsContext, SimpleInfiniteList, EmptyContent, CustomBreadcrumbs } from "@ct-nx/components";
import {
  DEFAULT_TAKE_PER_PAGE,
  FilterMode,
  useFilters,
} from "@ct-nx/hooks";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { Box, Container } from "@mui/material";
import { PATH_MAIN } from "@routes/paths";
import FilterGallery from "@sections/dashboard/gallery/filter";
import GalleryItem from "@sections/dashboard/gallery/GalleryElement";
import {
  SkeletonGalleryBreadcrumbs,
  SkeletonGalleryFilter,
  SkeletonGalleryItem,
} from "@sections/dashboard/gallery/SkeletonGallery";
import { useEffect, useState } from "react";
import {
  IGallery,
  IGallerySearchParams,
} from "src/redux/interfaces/gallary.interface";
import { useGetProjectsQuery } from "src/redux/services/student/gallery-student";
import { getCountTakingElment } from "@ct-nx/utils";

PrivateProjects.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default function PrivateProjects(): React.ReactElement {
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
      setProjects(data.data.filter((el: any) => el.public === false));
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
              heading="Privat projects"
              links={[
                { name: "Dashboard", href: PATH_MAIN.index },
                { name: "Gallery", href: PATH_MAIN.gallery.root },
                { name: "Privat", href: PATH_MAIN.gallery.privateProject },
              ]}
            />
            <FilterGallery filters={filters} setFilter={setFilter} />
          </>
        )}
        <SimpleInfiniteList
          hasNextPage={data?.meta.hasNextPage ?? false}
          onLoadMore={() => {
            if (data?.meta.take !== filters?.take) return;
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
              <GalleryItem key={item.description} item={item} />
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
