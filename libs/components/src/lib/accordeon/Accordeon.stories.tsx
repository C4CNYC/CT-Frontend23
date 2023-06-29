import type { Meta } from "@storybook/react";
import Typography from "@mui/material/Typography";
import { AccordionProps } from "@mui/material/Accordion"
import { Accordion, AccordionSummary, AccordionDetails } from "./index";
import { useEffect, useState } from "react";

const Component: Meta<typeof Accordion> = {
  component: Accordion,
  title: "Accordion",
};

export default Component;

const AccordionExample = (props: AccordionProps) => {
    const {
        defaultExpanded,
    } = props

    const [expanded, setExpanded] = useState(false);
    
    const onChange = () => {
        setExpanded(state => !state)
    }

    useEffect(() => {
        setExpanded(defaultExpanded || false)
    }, [defaultExpanded])

    return (
        <>
        <Accordion
            expanded={expanded}
            onChange={onChange}
            {...props}
        >
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography variant="h6">Accordeon Title 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Accordeon Details Wrapper
          </AccordionDetails>
        </Accordion>
        </>
    );
  };

export const Default: Meta<typeof Accordion> = {
  render: (args) => <AccordionExample {...args} />,
  args: {
    disabled: false,
    defaultExpanded: false,
    disableGutters: true,
    variant: "outlined",
    square: true,
    sx: { color: "text.primary", mb: 5 }
  }
};
