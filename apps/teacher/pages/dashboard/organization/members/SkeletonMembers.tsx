import { Skeleton, TableCell, TableRow } from "@mui/material";

export default function SkeletonMembers(): React.ReactElement {
  return (
    <TableRow sx={{ height: "72px" }}>
      <TableCell sx={{ p: "16px 0" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="40px"
          sx={{
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
          }}
          animation="wave"
        />
      </TableCell>
      <TableCell sx={{ p: "16px 0" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="40px"
          animation="wave"
        />
      </TableCell>
      <TableCell sx={{ p: "16px 0" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="40px"
          animation="wave"
        />
      </TableCell>
      <TableCell sx={{ p: "16px 0" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="40px"
          animation="wave"
        />
      </TableCell>
      <TableCell sx={{ p: "16px 0" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="40px"
          animation="wave"
        />
      </TableCell>
      <TableCell sx={{ p: "16px 0" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="40px"
          animation="wave"
        />
      </TableCell>
      <TableCell sx={{ p: "16px 0" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="40px"
          animation="wave"
        />
      </TableCell>
      <TableCell sx={{ p: "16px 0" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="40px"
          animation="wave"
        />
      </TableCell>
      <TableCell sx={{ p: "16px 0" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="40px"
          sx={{
            borderTopRightRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
          animation="wave"
        />
      </TableCell>
    </TableRow>
  );
}
