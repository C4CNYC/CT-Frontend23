import Label from "@components/label/Label";
import {
  //   emptyRows,
  //   TableEmptyRows,
  TableHeadCustom,
} from "@components/table";
import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";
// import SkeletonMembers from "@pages/dashboard/organization/members/SkeletonMembers";

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
        // orderBy={orderBy}
        headLabel={TABLE_HEAD}
        // rowCount={data?.data.length}
        numSelected={selected.length}
        onSort={onSort}
        onSelectAllRows={(checked: any) => {}}
      />
      <TableBody sx={{ minHeight: 12 }}>
        {/* {isLoading
          ? [...Array(5)].map((item, i) => <SkeletonMembers key={i} />)
          : data?.data.map((row) => ( */}
        <PendingUserRow
          // key={row.id}
          row={{}}
          selected={selected.includes("")}
          onSelectRow={() => {}}
          onDeleteRow={() => {}}
          onEditRow={() => {}}
        />
        {/* ))} */}
        {/* <TableNoData isNotFound={!data?.data.length && !isLoading} /> */}

        {/* <TableEmptyRows
      height={dense ? 52 : 72}
      emptyRows={emptyRows(
        page,
        filters?.take ?? 10,
        data?.data.length ?? 0
      )}
    /> */}
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
