import CustomBreadcrumbs from "@components/custom-breadcrumbs/CustomBreadcrumbs";
import Iconify from "@components/iconify";
import ModalIntegration from "@components/modal-integration";
import Scrollbar from "@components/scrollbar";
import { useSettingsContext } from "@components/settings";
import TableNoData from "@components/table/TableNoData";
import useTable from "@components/table/useTable";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import {
  Button,
  Card,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import { PATH_DASHBOARD } from "@routes/paths";
import { format } from "date-fns";
import _ from "lodash";
import Head from "next/head";
import { useSnackbar } from "notistack";
import {
  useGetIntegrationsQuery,
  useRemoveIntegrationMutation,
} from "src/redux/services/manager/integration-manager";

AppsPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function AppsPage(): React.ReactElement {
  const { dense } = useTable();
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetIntegrationsQuery({});
  const [removeIntegration] = useRemoveIntegrationMutation();

  const onDelete = async (id: string): Promise<void> => {
    try {
      await removeIntegration({ integration_id: id }).unwrap();
      enqueueSnackbar("integration removed");
    } catch (e) {
      enqueueSnackbar("somethinkg went wrong", { variant: "error" });
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Head>
        <title>Apps | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Integrations"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Integrations", href: PATH_DASHBOARD.apps.root },
          ]}
          action={
            <ModalIntegration>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add Integration
              </Button>
            </ModalIntegration>
          }
        />
        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="left">Create</TableCell>
                    <TableCell align="left">Update</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        {format(new Date(row.createdAt), "MM/dd/yyyy")}
                      </TableCell>
                      <TableCell align="left">
                        {format(new Date(row.updatedAt), "MM/dd/yyyy")}
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" gap={2}>
                          <ModalIntegration
                            id={row.id}
                            defaultValues={_.omit(row, [
                              "updatedAt",
                              "createdAt",
                              "id",
                            ])}
                          >
                            <IconButton>
                              <Iconify icon="material-symbols:edit" />
                            </IconButton>
                          </ModalIntegration>
                          <IconButton
                            onClick={async () => {
                              await onDelete(row.id);
                            }}
                          >
                            <Iconify
                              color="red"
                              icon="material-symbols:delete"
                            />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableNoData isNotFound={!data?.data.length} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
}
