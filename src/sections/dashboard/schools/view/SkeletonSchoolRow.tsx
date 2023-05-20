import { Skeleton, TableCell, TableRow } from "@mui/material";

export default function SkeletonSchoolRow(): React.ReactElement {
  return (
    <TableRow sx={{ p: 0 }}>
      <TableCell colSpan={7} sx={{ p: "6px" }}>
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ width: "100%", height: "44px" }}
        />
      </TableCell>
    </TableRow>
  );
}
