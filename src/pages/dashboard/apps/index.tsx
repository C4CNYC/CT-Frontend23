import CustomBreadcrumbs from "@components/custom-breadcrumbs/CustomBreadcrumbs";
import ModalIntegration from "@components/modal-integration";
import Scrollbar from "@components/scrollbar";
import { useSettingsContext } from "@components/settings";
import TableNoData from "@components/table/TableNoData";
import useTable from "@components/table/useTable";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import {
  Card,
  Divider,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { Container } from "@mui/system";
import { PATH_DASHBOARD } from "@routes/paths";
import { format } from "date-fns";
import Head from "next/head";

AppsPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

const STATUS_OPTIONS = ["all"];

export default function AppsPage(): React.ReactElement {
  const { dense } = useTable();
  const { themeStretch } = useSettingsContext();

  const data = [
    {
      title: "Boostrap",
      id: "fasdf23r-fsadf2-23sfgdf",
      createdAt: "2023-03-19T20:32:25.508Z",
      updatedAt: "2023-03-20T06:53:46.052Z",
    },
    {
      title: "Reveal",
      id: "fasdf23r-fsadf2-23sfgdf",
      createdAt: "2023-03-19T20:32:25.508Z",
      updatedAt: "2023-03-20T06:53:46.052Z",
    },
  ];

  return (
    <>
      <Head>
        <title>Apps | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Apps"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Apps", href: PATH_DASHBOARD.apps.root },
          ]}
          action={<ModalIntegration value={""} />}
        />
        <Card>
          <Tabs
            value={"all"}
            onChange={() => ""}
            sx={{
              px: 2,
              bgcolor: "background.neutral",
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <>
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
              <Scrollbar>
                <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Title</TableCell>
                      <TableCell align="left">Create</TableCell>
                      <TableCell align="left">Update</TableCell>
                      <TableCell align="left">Id</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.title}>
                        <TableCell align="left">{row.title}</TableCell>
                        <TableCell align="left">
                          {format(new Date(row.createdAt), "MM/dd/yyyy")}
                        </TableCell>
                        <TableCell align="left">
                          {format(new Date(row.updatedAt), "MM/dd/yyyy")}
                        </TableCell>
                        <TableCell align="left">{row.id}</TableCell>
                      </TableRow>
                    ))}
                    <TableNoData isNotFound={!data.length} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
          </>
        </Card>
      </Container>
    </>
  );
}
