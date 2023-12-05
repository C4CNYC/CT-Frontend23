import { Table, TableBody, TableContainer } from "@mui/material";

import {
  Scrollbar,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  emptyRows,
  useTable,
} from "@components";
import { useFilters } from "@hooks";
import { ClassSearchParams } from "src/redux/interfaces/class.interface";
import { useGetSchoolListQuery } from "src/redux/services/admin/school-amdin";

import SchoolTableRow from "./SchoolTableRow";
import SchoolTableToolbar from "./SchoolTableToolbar";
import SkeletonSchoolRow from "./SkeletonSchoolRow";

const TABLE_HEAD = [
  {
    id: "cover",
    label: "cover",
    align: "left",
  },
  { id: "name", label: "name", align: "left" },
  {
    id: "country",
    label: "country",
    align: "center",
  },
  { id: "city", label: "city", align: "left" },
  {
    id: "phone",
    label: "phone",
    align: "left",
  },
  {
    id: "active",
    label: "schools_table_active",
    align: "left",
  },
  { id: "edit", label: "", align: "left" },
];

export default function SchoolTable(): React.ReactElement {
  const { dense, page, rowsPerPage, onChangeDense } = useTable();
  const { filters, setFilter, resetFilters } = useFilters<ClassSearchParams>({
    name: "",
  });
  const { data, isLoading } = useGetSchoolListQuery({
    ...filters,
  });

  return (
    <>
      <SchoolTableToolbar
        filterName={filters.name ?? ""}
        onFilterName={(e: any) => {
          setFilter("name", e.target.value);
        }}
        onResetFilter={resetFilters}
      />
      <TableContainer sx={{ position: "relative", overflow: "unset" }}>
        <Scrollbar>
          <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
            <TableHeadCustom headLabel={TABLE_HEAD} />

            <TableBody>
              {isLoading
                ? Array(10)
                    .fill(null)
                    .map((el, i) => <SkeletonSchoolRow key={i} />)
                : data?.data.map((row) => (
                    <SchoolTableRow key={row.id} row={row} />
                  ))}

              <TableEmptyRows
                height={dense ? 52 : 72}
                emptyRows={emptyRows(page, rowsPerPage, data?.data.length ?? 0)}
              />

              <TableNoData isNotFound={!data?.data.length && !isLoading} />
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
  );
}
