import { useEffect } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface IGoogleClassesList {
  classes: any[];
  onSelectClass: (id: string) => void;
}

export const GoogleClassesList = ({ classes, onSelectClass }: IGoogleClassesList) => {
  const handleChange = (event: SelectChangeEvent) => {
    onSelectClass(event.target.value);
  };

  useEffect(() => {
    onSelectClass(classes[0]?.id)
  }, [classes])

  return (
    <Select
      fullWidth
      onChange={handleChange}
      defaultValue={classes[0]?.id}
    >
      {
        classes.map(googleClass =>
          <MenuItem
            key={googleClass.id}
            value={googleClass.id}
          >
            {googleClass.name}
          </MenuItem>
        )
      }
    </Select>
  )
}
