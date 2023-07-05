import {
  TableHeadCustom,
  Label,
} from "@components";
import { voidFunction } from "@utils";
import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";

const TABLE_HEAD = [
  { id: "email", label: "Email", align: "left" },
  { id: "status", label: "Status", align: "left" },
];

interface Props {
  order: "asc" | "desc" | undefined;
  selected: string[];
  onSort: (id: string) => void;
  page: number;
}

export default function PendingInvitesTab({
  order,
  selected,
  onSort,
  page,
}: Props): React.ReactElement {
  return (
    <>
      <TableHeadCustom
        order={order}
        headLabel={TABLE_HEAD}
        numSelected={selected.length}
        onSort={onSort}
        onSelectAllRows={ (checked: any) => { voidFunction() } }
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
      </TableBody>
    </>
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
          Pending
        </Label>
      </TableCell>
    </TableRow>
  );
}
