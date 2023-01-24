import { useState, useRef } from "react";
// @mui
import { Collapse, Box, Button } from "@mui/material";
// @types
import { IFile } from "../../../../@types/file";
// components
import Iconify from "../../../../components/iconify";
import { TableProps } from "../../../../components/table";
//
import SchoolCard from "../item/SchoolCard";

// ----------------------------------------------------------------------

type Props = {
  table: TableProps;
  data: IFile[];
  dataFiltered: IFile[];
  onOpenConfirm: VoidFunction;
  onDeleteItem: (id: string) => void;
};

export default function SchoolGridView({
  table,
  data,
  dataFiltered,
  onDeleteItem,
  onOpenConfirm,
}: Props) {
  const {
    selected,
    onSelectRow: onSelectItem,
    onSelectAllRows: onSelectAllItems,
  } = table;

  const containerRef = useRef(null);


  const [collapseFolders, setCollapseFolders] = useState(false);

  return (
    <>
      <Box ref={containerRef}>

        <Collapse in={!collapseFolders} unmountOnExit>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
          >
            {dataFiltered
              .filter((i) => i.type === "folder")
              .map((folder) => (
                <SchoolCard
                  key={folder.id}
                  folder={folder}
                  selected={selected.includes(folder.id)}
                  onSelect={() => onSelectItem(folder.id)}
                  onDelete={() => onDeleteItem(folder.id)}
                  sx={{ maxWidth: "auto" }}
                />
              ))}
          </Box>
        </Collapse>

        {!!selected?.length && (
          <FileActionSelected
            numSelected={selected.length}
            rowCount={data.length}
            selected={selected}
            onSelectAllItems={(checked) =>
              onSelectAllItems(
                checked,
                data.map((row) => row.id)
              )
            }
            action={
              <>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  startIcon={<Iconify icon="eva:trash-2-outline" />}
                  onClick={onOpenConfirm}
                  sx={{ mr: 1 }}
                >
                  Archive
                </Button>
              </>
            }
          />
        )}
      </Box>
    </>
  );
}
