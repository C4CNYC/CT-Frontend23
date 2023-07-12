import { Socials } from "@assets/data";

import { MenuItem } from "@mui/material";

import { RHFSelect } from "@components";

interface Props {
  defaultValue?: string;
}

export default function LinkSelect({
  defaultValue,
}: Props): React.ReactElement {
  return (
    <RHFSelect
      name="type"
      defaultValue={defaultValue}
      sx={{
        width: "80px !important",
        height: "40px !important",
        borderRight: "none",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,

        "& .MuiOutlinedInput-root": {
          height: "40px",
          border: "none",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        "& .MuiSelect-select": {
          display: "flex",
          justifyContent: "center",
          p: 0,
          pr: "20px!important",
        },
      }}
    >
      {Socials.map((anObjectMapped, index) => {
        return (
          <MenuItem
            value={anObjectMapped.name}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {anObjectMapped.icon}
          </MenuItem>
        );
      })}
    </RHFSelect>
  );
}
