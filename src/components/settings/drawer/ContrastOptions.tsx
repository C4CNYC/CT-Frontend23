// @mui
import { RadioGroup } from "@mui/material";

//
import { SvgColor } from "../../svg-color";
import { useSettingsContext } from "../SettingsContext";
import { MaskControl, StyledCard, StyledWrap } from "../styles";

// ----------------------------------------------------------------------

const OPTIONS = ["default", "bold"] as const;

export default function ContrastOptions(): React.ReactElement {
  const { themeContrast, onChangeContrast } = useSettingsContext();

  return (
    <RadioGroup
      name="themeContrast"
      value={themeContrast}
      onChange={onChangeContrast}
    >
      <StyledWrap>
        {OPTIONS.map((contrast) => (
          <StyledCard key={contrast} selected={themeContrast === contrast}>
            <SvgColor
              src={`/assets/icons/setting/${
                contrast === "bold" ? "ic_contrast_bold" : "ic_contrast"
              }.svg`}
            />

            <MaskControl value={contrast} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
