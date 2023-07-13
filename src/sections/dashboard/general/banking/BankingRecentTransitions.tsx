import { useState } from "react";

import { sentenceCase } from "change-case";
import { format } from "date-fns";

// @mui
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardProps,
  Divider,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// components
import {
  Iconify,
  IconifyProps,
  Label,
  MenuPopover,
  Scrollbar,
  TableHeadCustom,
} from "@components";
// utils
import { fCurrency } from "@utils";

// ----------------------------------------------------------------------

interface RowProps {
  id: string;
  name: string | null;
  avatar: string | null;
  type: string;
  message: string;
  category: string;
  date: number;
  status: string;
  amount: number;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
}

export default function BankingRecentTransitions({
  title,
  subheader,
  tableLabels,
  tableData,
  ...other
}: Props): React.ReactElement | null {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: "unset" }}>
        <Scrollbar sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <BankingRecentTransitionsRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

interface BankingRecentTransitionsRowProps {
  row: RowProps;
}

function BankingRecentTransitionsRow({
  row,
}: BankingRecentTransitionsRowProps): React.ReactElement | null {
  const theme = useTheme();

  const isLight = theme.palette.mode === "light";

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const handleDownload = (): void => {
    handleClosePopover();
  };

  const handlePrint = (): void => {
    handleClosePopover();
  };

  const handleShare = (): void => {
    handleClosePopover();
  };

  const handleDelete = (): void => {
    handleClosePopover();
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ position: "relative" }}>
              {renderAvatar(row.category, row.avatar)}
              <Box
                sx={{
                  right: 0,
                  bottom: 0,
                  width: 18,
                  height: 18,
                  display: "flex",
                  borderRadius: "50%",
                  position: "absolute",
                  alignItems: "center",
                  color: "common.white",
                  bgcolor: "error.main",
                  justifyContent: "center",
                  ...(row.type === "Income" && {
                    bgcolor: "success.main",
                  }),
                }}
              >
                <Iconify
                  icon={
                    row.type === "Income"
                      ? "eva:diagonal-arrow-left-down-fill"
                      : "eva:diagonal-arrow-right-up-fill"
                  }
                  width={16}
                />
              </Box>
            </Box>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {row.message}
              </Typography>
              <Typography variant="subtitle2"> {row.category}</Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">
            {format(new Date(row.date), "dd MMM yyyy")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {format(new Date(row.date), "p")}
          </Typography>
        </TableCell>

        <TableCell>{fCurrency(row.amount)}</TableCell>

        <TableCell>
          <Label
            variant={isLight ? "soft" : "filled"}
            color={
              (row.status === "completed" && "success") ||
              (row.status === "in_progress" && "warning") ||
              "error"
            }
          >
            {sentenceCase(row.status)}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:download-fill" />
          Download
        </MenuItem>

        <MenuItem onClick={handlePrint}>
          <Iconify icon="eva:printer-fill" />
          Print
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="eva:share-fill" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

interface AvatarIconProps {
  icon: IconifyProps;
}

function AvatarIcon({ icon }: AvatarIconProps): React.ReactElement | null {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: "text.secondary",
        bgcolor: "background.neutral",
      }}
    >
      <Iconify icon={icon} width={24} />
    </Avatar>
  );
}

// ----------------------------------------------------------------------

function renderAvatar(
  category: string,
  avatar: string | null
): React.ReactElement | null {
  if (category === "Books") {
    return <AvatarIcon icon="eva:book-fill" />;
  }
  if (category === "Beauty & Health") {
    return <AvatarIcon icon="eva:heart-fill" />;
  }
  return avatar ? (
    <Avatar
      alt={category}
      src={avatar}
      sx={{
        width: 48,
        height: 48,
        boxShadow: (theme) => theme.customShadows.z8,
      }}
    />
  ) : null;
}
