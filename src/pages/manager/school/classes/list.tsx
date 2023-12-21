import Head from "next/head";
import { useState } from "react";

import SkeletonMembers from "@pages/manager/organization/members/SkeletonMembers";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Tooltip,
} from "@mui/material";

import {
  ConfirmDialog,
  CustomBreadcrumbs,
  Iconify,
  Scrollbar,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useSettingsContext,
  useTable,
} from "@components";
import { useFilters } from "@hooks";
import { SchoolDashboardLayout } from "@layouts/dashboard/SchoolDashboardLayout";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { ClassesTableRow } from "@sections/dashboard/classes/list";
import AddClassDialog from "@sections/dashboard/schools/classes/CreateClassDialog";
import { UserTableToolbar } from "@sections/dashboard/user/list";
import { createRandomAvatar, getRandomColor } from "@utils";
import { ClassSearchParams } from "src/redux/interfaces/class.interface";
import {
  useCreateClassesMutation,
  useDeleteClassesMutation,
  useGetClassesQuery,
  useUpdateClassesAvatarMutation,
  useUpdateClassesMutation,
} from "src/redux/services/manager/classes-manager";
import { RootState } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

const STATUS_OPTIONS = ["all"];

const TABLE_HEAD = [
  { id: "", label: "icon" },
  { id: "name", label: "name", align: "left" },
  {
    id: "total_students",
    label: "classes_total_students",
    align: "left",
  },
  {
    id: "total_students",
    label: "classes_total_courses",
    align: "left",
  },
  { id: "started_id", label: "start_date", align: "left" },
  { id: "status", label: "status", align: "left" },
  { id: "" },
];

UserListPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export default function UserListPage(): React.ReactElement {
  const {
    dense,
    order,
    orderBy,
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
  } = useTable();

  const translate = useTranslate();

  const [openConfirm, setOpenConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { filters, setFilter, resetFilters } = useFilters<ClassSearchParams>({
    name: "",
  });

  const [updateClassByManager, { isLoading: updateResult }] =
    useUpdateClassesMutation();
  const [createClassByManager, { isLoading: createClassLoading }] =
    useCreateClassesMutation();
  const [updateClassAvatar] = useUpdateClassesAvatarMutation();
  const [deleteCasses, { isLoading: isDeleting }] = useDeleteClassesMutation();
  const { data, isLoading } = useGetClassesQuery(
    { schoolId, ...filters },
    { skip: !schoolId }
  );

  const handleDeleteMember = async (classId: string): Promise<void> => {
    try {
      await deleteCasses({ classId, schoolId });
      enqueueSnackbar(translate("classes_class_deleted"));
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  const handleDeleteRow = (userId: string): void => {
    handleDeleteMember(userId);
  };

  const handleDeleteRows = (selected: string[]): void => {
    for (let i = 0; i < selected.length; i++) {
      handleDeleteMember(selected[i]);
    }
    enqueueSnackbar(translate("classes_classes_deleted"));
  };

  const handleEditRow = async (
    id: string,
    name: string,
    description: string,
    cover: string,
    uploadedFile?: File
  ): Promise<void> => {
    try {
      await updateClassByManager({
        schoolId,
        classId: id,
        name,
        description,
        cover,
      }).unwrap();
      if (uploadedFile) {
        const file = new FormData();
        file.append("file", uploadedFile);
        await updateClassAvatar({ schoolId, classId: id, file }).unwrap();
      }
      enqueueSnackbar(translate("classes_class_updeted"));
    } catch (error: any) {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
    }
  };

  const createClass = async (
    name: string,
    description: string,
    cover?: string,
    uploadedFile?: File
  ): Promise<void> => {
    try {
      if (!cover) {
        cover = getRandomColor();
      }
      const data = await createClassByManager({
        schoolId,
        name,
        description,
        cover,
      }).unwrap();
      const file = new FormData();
      if (uploadedFile) {
        file.append("file", uploadedFile);
        await updateClassAvatar({ schoolId, classId: data.id, file }).unwrap();
      } else {
        const randomAvatar = await createRandomAvatar();
        file.append("file", randomAvatar);
        await updateClassAvatar({ schoolId, classId: data.id, file }).unwrap();
      }
      enqueueSnackbar(
        translate("classes_class_created", {
          name,
        })
      );
    } catch (error: any) {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
    }
  };

  return (
    <>
      <Head>
        <title> {translate("classes")} | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            {
              name: translate("home"),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate("classes"),
              href: MANAGER_PATH_DASHBOARD.school.classes,
            },
          ]}
          action={
            <AddClassDialog
              createClass={createClass}
              createClassLoading={createClassLoading}
            >
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                {translate("classes_add_class")}
              </Button>
            </AddClassDialog>
          }
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
              <Tab key={tab} label={translate(tab)} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            filterName={filters.name ?? ""}
            onFilterName={(e: any) => {
              setFilter("name", e.target.value);
            }}
            onResetFilter={resetFilters}
          />
          <>
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
              <TableSelectedAction
                dense={dense}
                numSelected={selected.length}
                rowCount={data?.data.length ?? 0}
                onSelectAllRows={(checked) => {
                  onSelectAllRows(
                    checked,
                    data?.data.map((row) => row.id) as string[]
                  );
                }}
                action={
                  <Tooltip title="Delete">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setOpenConfirm(true);
                      }}
                    >
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Tooltip>
                }
              />

              <Scrollbar>
                <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={data?.data.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    onSelectAllRows={(checked) => {
                      onSelectAllRows(
                        checked,
                        data?.data.map((row) => row.id) as string[]
                      );
                    }}
                  />

                  <TableBody>
                    {isLoading
                      ? [...Array(5)].map((item, i) => (
                          <SkeletonMembers key={i} />
                        ))
                      : data?.data.map((row) => (
                          <ClassesTableRow
                            key={row.id}
                            row={row}
                            selected={selected.includes(row.id)}
                            onSelectRow={() => {
                              onSelectRow(row.id);
                            }}
                            onDeleteRow={() => {
                              handleDeleteRow(row.id);
                            }}
                            isDeleting={isDeleting}
                            onEditRow={handleEditRow}
                            updateResult={updateResult}
                          />
                        ))}
                    <TableNoData
                      isNotFound={!data?.data.length && !isLoading}
                    />
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
          </>
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
        }}
        title={translate("actions_delete")}
        content={
          <>
            {translate("messages_delete_dialog_content", {
              items: selected.length,
            })}
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isDeleting}
            onClick={() => {
              handleDeleteRows(selected);
              setOpenConfirm(false);
            }}
          >
            {translate("actions_delete")}
          </LoadingButton>
        }
      />
    </>
  );
}
