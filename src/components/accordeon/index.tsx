import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";

import { Iconify } from "../iconify";

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&.Mui-expanded": {
    borderRadius: "0!important",
    boxShadow: "none",
  },
  borderTop: "1px solid, gray",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <Iconify width="30px" icon="material-symbols:keyboard-arrow-down" />
    }
    {...props}
  />
))(({ theme }) => ({
  paddingRight: "15px",
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  "&:first-child": {
    borderTop: 0,
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    left: 1,
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingLeft: "25px",
  paddingRight: "25px",
  borderRadius: 0,
}));
