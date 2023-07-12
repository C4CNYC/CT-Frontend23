import { RadioGroup } from "@mui/material";

import { 
  LayoutIcon, 
  StyledCard, 
  StyledWrap,
  MaskControl, 
} from "../styles";
import { useSettingsContext } from "../SettingsContext";

const OPTIONS = ["vertical", "horizontal", "mini"] as const;

export default function LayoutOptions(): React.ReactElement {
  const { themeLayout, onChangeLayout } = useSettingsContext();

  return (
    <RadioGroup
      name="themeLayout"
      value={themeLayout}
      onChange={onChangeLayout}
    >
      <StyledWrap sx={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {OPTIONS.map((layout) => (
          <StyledCard
            key={layout}
            selected={themeLayout === layout}
            sx={{ p: 0.75, height: 56 }}
          >
            <LayoutIcon layout={layout} />

            <MaskControl value={layout} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
