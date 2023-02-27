import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import { useSettingsContext } from "@components/settings";
import { useTable } from "@components/table";
import DashboardLayout from "@layouts/dashboard";
import { Container, Stack } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import { FileFilterName, SchoolGridView } from "@sections/dashboard/schools";
import Head from "next/head";
import { useState } from "react";

import AddSchoolDialog from "@sections/dashboard/schools/portal/AddSchoolDialog";
import { useGetSchoolListQuery } from "src/redux/services/admin";
import { useLocales } from "../../../../locales";

Index.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function Index(): React.ReactElement {
  const { translate } = useLocales();

  const table = useTable({ defaultRowsPerPage: 10 });

  const { themeStretch } = useSettingsContext();

  const [filterName, setFilterName] = useState("");

  const { data, isLoading } = useGetSchoolListQuery({
    name: filterName,
  });

  const handleFilterName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    table.setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteItem = (id: string): void => {};

  return (
    <>
      <Head>
        <title> {`${translate("organizations.title")} | Codetribe`}</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading={`${translate("organizations.schools_page.title")}`}
          links={[
            {
              name: `${translate("organizations.schools_page.title")}`,
              href: PATH_DASHBOARD.root,
            },
            { name: `${translate("organizations.schools_page.title")}` },
          ]}
          action={<AddSchoolDialog />}
        />
        <Stack
          spacing={2.5}
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-end", md: "center" }}
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <FileFilterName
            filterName={filterName}
            onFilterName={handleFilterName}
          />
        </Stack>
        {isLoading ?? !data?.data ? null : (
          <SchoolGridView
            table={table}
            data={data?.data}
            onDeleteItem={handleDeleteItem}
          />
        )}
      </Container>
    </>
  );
}
