import { useRef } from "react";

// @mui
import { Box, Collapse, TableProps } from "@mui/material";

// @types
import { IFile } from "@types";

// components
//

// ----------------------------------------------------------------------

interface Props {
  table: TableProps;
  data: IFile[];
  dataFiltered: IFile[];
  onOpenConfirm: VoidFunction;
  onDeleteItem: (id: string) => void;
}

export default function ContactsGridView({
  table,
  data,
  dataFiltered,
  onDeleteItem,
  onOpenConfirm,
}: Props): React.ReactElement | null {
  const containerRef = useRef(null);

  return (
    <>
      <Box ref={containerRef}>
        <Collapse in unmountOnExit>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
          >
            {/* {dataFiltered
              .filter((i) => i.type === "folder")
              .map((folder) => (
                <ContactsCard
                  key={folder.id}
                  // folder={folder}
                  selected={selected.includes(folder.id)}
                  onSelect={() => onSelectItem(folder.id)}
                  onDelete={() => onDeleteItem(folder.id)}
                  sx={{ maxWidth: "auto" }}
                />
              ))} */}
          </Box>
        </Collapse>

        {/* {!!selected?.length && (
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
        )} */}
      </Box>
    </>
  );
}
