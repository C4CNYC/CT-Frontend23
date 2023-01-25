import { useRef } from "react";
// @mui
import { Box } from "@mui/material";
// components
import { TableProps } from "../../../../components/table";
//
import SchoolCard from "../item/SchoolCard";
import { SchoolResponce } from "src/redux/services/admin/admin";

// ----------------------------------------------------------------------

type Props = {
  table: TableProps;
  data: SchoolResponce[];
  onDeleteItem: (id: string) => void;
};

export default function SchoolGridView({
  table,
  data,
  onDeleteItem
}: Props) {
  const {
    selected,
    onSelectRow: onSelectItem,
  } = table;

  const containerRef = useRef(null);


  return (
    <>
      <Box ref={containerRef}>
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
            {data.map((school) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  selected={selected.includes(school.id)}
                  onSelect={() => onSelectItem(school.id)}
                  onDelete={() => onDeleteItem(school.id)}
                  sx={{ maxWidth: "auto", cursor: "pointer" }}
                />
              ))}
          </Box>
      </Box>
    </>
  );
}
