import { type FC, type SetStateAction, useState } from 'react'

import ChatIcon from '@mui/icons-material/Chat'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Divider, IconButton, MenuItem } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { FaRegSquare } from '@react-icons/all-files/fa6/FaRegSquare'
import { HiOutlineLightBulb } from '@react-icons/all-files/hi2/HiOutlineLightBulb'
import { IoHelpBuoyOutline } from '@react-icons/all-files/io5/IoHelpBuoyOutline'

import { useTranslate } from '@/utils/translateHelper'
import { Accordion, AccordionDetails, AccordionSummary } from '@root/src/components/accordeon'
import { MenuPopover } from '@root/src/components/menu-popover/MenuPopover'

import HelpQuestionModal from './modals/HelpQuestion'
import Solution from './options/solution'
import Tips from './options/tips'
import Unstack from './options/unstack-dialogs/Unstuck'

const MENU_POPOVER_STYLES = {
  width: 350,
  p: 0,
  mr: '30px',
}

const MENU_ITEM_STYLES = {
  pl: '22px!important',
  height: 52,
}

const HelpPopup: FC = () => {
  const [expanded, setExpanded] = useState<string | false>()
  const [openPopover, setOpenPopover] = useState(null)
  const translate = useTranslate()

  const handleChange = (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  // check better solution for event type
  const handleOpenPopover = (event: React.SyntheticEvent<SetStateAction<any>>): void => {
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  return (
    <Box>
      <IconButton onClick={handleOpenPopover}>
        <HelpOutlineIcon />
      </IconButton>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={MENU_POPOVER_STYLES}
      >
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            aria-controls='panel1d-content'
            id='panel1d-header'
          >
            <HiOutlineLightBulb
              size={27}
              style={{ marginRight: '15px' }}
            />
            <Typography variant='h6'>{translate('tips')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Tips />
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            aria-controls='panel2d-content'
            id='panel2d-header'
          >
            <FaRegSquare
              size={27}
              style={{ marginRight: '15px' }}
            />
            <Typography variant='h6'>{translate('solutions')}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Solution />
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            aria-controls='panel3d-content'
            id='panel3d-header'
          >
            <IoHelpBuoyOutline
              size={27}
              style={{ marginRight: '15px' }}
            />
            <Typography variant='h6'>{translate('get_unstuck')}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Unstack />
          </AccordionDetails>
        </Accordion>
        <Divider />
        <HelpQuestionModal>
          <MenuItem sx={MENU_ITEM_STYLES}>
            <ChatIcon />
            <Typography variant='h6'>{translate('i_need_help')}</Typography>
          </MenuItem>
        </HelpQuestionModal>
      </MenuPopover>
    </Box>
  )
}

export default HelpPopup
