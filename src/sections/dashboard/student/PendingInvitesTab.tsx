import { Checkbox, Table, TableBody, TableCell, TableRow } from "@mui/material";

import { Label, TableEmptyRows, TableHeadCustom, emptyRows } from "@components";
import { voidFunction } from "@utils";
import { useTranslate } from "src/utils/translateHelper";

interface IPendingInvitesTabProps {
  order: "asc" | "desc" | undefined;
  selected: string[];
  onSort: (id: string) => void;
  page: number;
  dense: boolean;
  rowsPerPage: number;
}

export default function PendingInvitesTab({
  order,
  selected,
  onSort,
  page,
  dense,
  rowsPerPage,
}: IPendingInvitesTabProps): React.ReactElement {
  const TABLE_HEAD = [
    { id: "email", label: "email", align: "left" },
    { id: "status", label: "status", align: "left" },
  ];
  return (
    <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
      <TableHeadCustom
        order={order}
        headLabel={TABLE_HEAD}
        numSelected={selected.length}
        onSort={onSort}
        onSelectAllRows={(checked: any) => {
          voidFunction();
        }}
        rowCount={5}
      />
      <TableBody sx={{ minHeight: 12 }}>
        <PendingUserRow
          // key={row.id}
          row={{}}
          selected={selected.includes("")}
          onSelectRow={voidFunction}
          onDeleteRow={voidFunction}
          onEditRow={voidFunction}
        />
        <TableEmptyRows
          height={dense ? 52 : 72}
          emptyRows={emptyRows(
            page,
            rowsPerPage,
            1
            // data?.data.length ?? 0
          )}
        />
      </TableBody>
    </Table>
  );
}

interface RowProps {
  selected: boolean;
  onSelectRow: () => void;
  row: Record<string, any>;
  onEditRow: () => void;
  onDeleteRow: () => void;
}
export function PendingUserRow({
  selected,
  onSelectRow,
  row,
}: RowProps): React.ReactElement {
  const translate = useTranslate();

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell>email@email.com</TableCell>
      <TableCell>
        <Label
          color="warning"
          sx={{
            textTransform: "uppercase",
          }}
        >
          {translate("pending")}
        </Label>
      </TableCell>
    </TableRow>
  );
}
