import Head from "next/head";
import React from "react";

import { format } from "date-fns";
import _ from "lodash";
import { useSnackbar } from "notistack";

import {
  Button,
  Card,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Stack } from "@mui/system";
import Container from "@mui/system/Container";

import {
  CustomBreadcrumbs,
  Iconify,
  Scrollbar,
  TableNoData,
  TablePaginationCustom,
  useSettingsContext,
  useTable,
} from "@components";
import { useFilters } from "@hooks";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import SkeletonTable from "@sections/dashboard/skeleton/SkeletonTable";
import { SkeletonBreadcrumbs } from "@sections/dashboard/skeleton/skeletonBreadcrumbs";
import UpdateModalSkills from "@sections/dashboard/skills/update-modal";
import {
  useGetSkillQuery,
  useRemoveSkillMutation,
} from "src/redux/services/manager/skills-manager";

Skills.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Skills(): React.ReactElement {
  const { dense, onChangeDense } = useTable();

  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const { filters, setFilter } = useFilters({ name: "" });

  const { data, isLoading } = useGetSkillQuery({ ...filters });
  const [removeSkill] = useRemoveSkillMutation();

  const onDelete = async (id: string): Promise<void> => {
    try {
      await removeSkill({ id }).unwrap();
      enqueueSnackbar("Skill removed");
    } catch (e: any) {
      enqueueSnackbar("somethinkg went wrong", { variant: "error" });
    }
  };

  return (
    <>
      <Head>
        <title> Skills | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        {!isLoading ? (
          <CustomBreadcrumbs
            heading=""
            links={[
              { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
              { name: "Skills", href: MANAGER_PATH_DASHBOARD.skills.root },
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
        ) : (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <SkeletonBreadcrumbs />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                width: "94px",
                height: "36px",
                borderRadius: "8px",
                mb: "50px",
              }}
            />
          </Stack>
        )}
        {isLoading ? (
          <SkeletonTable />
        ) : (
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
            <TablePaginationCustom
              count={data?.meta.itemCount ? data?.meta.itemCount : 0}
              page={data?.meta.page ? data?.meta.page - 1 : 0}
              rowsPerPage={data?.meta.take ?? 0}
              onPageChange={(e: any, page: number) => {
                setFilter("page", page + 1);
              }}
              onRowsPerPageChange={(e: any) => {
                setFilter("take", e.target.value);
              }}
              dense={dense}
              onChangeDense={onChangeDense}
            />
          </Card>
        )}
      </Container>
    </>
  );
}
