import { useState } from "react";
import Head from "next/head";
import { Stack, Container } from "@mui/material";
import { PATH_DASHBOARD } from "../../../routes/paths";
import DashboardLayout from "../../../layouts/dashboard";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../../components/settings";
import { useTable } from "../../../components/table";
import {
  FileFilterName,
  SchoolGridView,
} from "../../../sections/@dashboard/schools";

import AddSchoolDialog from "../../../sections/@dashboard/schools/portal/AddSchoolDialog";
import { useGetSchoolListQuery } from "src/redux/services/admin";
import {useLocales} from "../../../locales";

Schools.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function Schools() {
  const { translate } = useLocales();

  const table = useTable({ defaultRowsPerPage: 10 });

  const { themeStretch } = useSettingsContext();

  const [filterName, setFilterName] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);

  const { data, isLoading } = useGetSchoolListQuery({
    name: filterName,
  });

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    table.setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteItem = (id: string) => {};

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Head>
        <title> {`${translate('organizations.title')} | Codetribe`}</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading={`${translate('organizations.title')}`}
          links={[
            {
              name: `${translate('organizations.title')}`,
              href: PATH_DASHBOARD.root,
            },
            { name: `${translate('organizations.schools_page.title')}` },
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
        {isLoading || !data?.data ? null : (
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
