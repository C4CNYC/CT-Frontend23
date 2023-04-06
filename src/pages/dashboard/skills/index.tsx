import CustomBreadcrumbs from "@components/custom-breadcrumbs/CustomBreadcrumbs";
import Iconify from "@components/iconify";
import Scrollbar from "@components/scrollbar";
import { useSettingsContext } from "@components/settings/SettingsContext";
import TableNoData from "@components/table/TableNoData";
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
import { Stack } from "@mui/system";
import Container from "@mui/system/Container";
import { PATH_DASHBOARD } from "@routes/paths";
import UpdateModalSkills from "@sections/dashboard/skills/update-modal";
import { format } from "date-fns";
import _ from "lodash";
import Head from "next/head";
import { useSnackbar } from "notistack";
import React from "react";
import {
  useGetSkillQuery,
  useRemoveSkillMutation,
} from "src/redux/services/manager/skills-manager";

Skills.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Skills(): React.ReactElement {
  const { data, isLoading } = useGetSkillQuery({});
  const [removeSkill] = useRemoveSkillMutation();
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const onDelete = async (id: string): Promise<void> => {
    try {
      await removeSkill({ id }).unwrap();
      enqueueSnackbar("skill removed");
    } catch (e) {
      enqueueSnackbar("somethinkg went wrong", { variant: "error" });
    }
  };
  if (isLoading) return <CircularProgress />;
  return (
    <>
      <Head>
        <title> Skills | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Skills"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Skills", href: PATH_DASHBOARD.skills.root },
          ]}
          action={
            <UpdateModalSkills>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Skills
              </Button>
            </UpdateModalSkills>
          }
        />
        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Updated</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">
                        {format(new Date(row.createdAt), "MM/dd/yyyy")}
                      </TableCell>
                      <TableCell align="left">
                        {format(new Date(row.updatedAt), "MM/dd/yyyy")}
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" gap={2}>
                          <UpdateModalSkills
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
                          </UpdateModalSkills>
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
