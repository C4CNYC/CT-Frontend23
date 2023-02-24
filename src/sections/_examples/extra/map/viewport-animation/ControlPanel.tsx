import { memo } from "react";
// @mui
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
// components
import { StyledControlPanel } from "@components/map";

// ----------------------------------------------------------------------

export interface CityProps {
  city: string;
  population: string;
  image: string;
  state: string;
  latitude: number;
  longitude: number;
}

interface Props {
  data: CityProps[];
  selectedCity: string;
  onSelectCity: (
    event: React.ChangeEvent<HTMLInputElement>,
    city: CityProps
  ) => void;
}

function ControlPanel({
  data,
  selectedCity,
  onSelectCity,
}: Props): React.ReactElement | null {
  return (
    <StyledControlPanel>
      {data.map((city) => (
        <RadioGroup
          key={city.city}
          value={selectedCity}
          onChange={(event) => {
            onSelectCity(event, city);
          }}
        >
          <FormControlLabel
            value={city.city}
            label={city.city}
            control={<Radio size="small" />}
            sx={{ color: "common.white" }}
          />
        </RadioGroup>
      ))}
    </StyledControlPanel>
  );
}

export default memo(ControlPanel);
