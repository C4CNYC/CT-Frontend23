import { SyntheticEvent, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Popover from '@mui/material/Popover'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { emojiCategories } from './emojiCategories'

export interface EmojiSelectorProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  onEmojiSelect: (emoji: string) => void
}

export function EmojiSelector({ anchorEl, open, onClose, onEmojiSelect }: EmojiSelectorProps) {
  const [activeCategory, setActiveCategory] = useState(0)

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji)
    onClose()
  }

  const handleCategoryChange = (event: SyntheticEvent, newValue: number) => {
    setActiveCategory(newValue)
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Paper sx={{ width: 300, maxHeight: 400 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeCategory}
            onChange={handleCategoryChange}
            variant='scrollable'
            scrollButtons='auto'
            aria-label='emoji categories'
          >
            {emojiCategories.map((category, index) => (
              <Tab
                key={index}
                label={category.title}
              />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ p: 1.5, maxHeight: 300, overflow: 'auto' }}>
          <Grid
            container
            spacing={0.5}
          >
            {emojiCategories[activeCategory].emojis.map((emoji, index) => (
              <Grid
                item
                key={index}
                xs={2}
              >
                <Button
                  onClick={() => handleEmojiClick(emoji)}
                  sx={{
                    minWidth: 'auto',
                    p: 0.5,
                    borderRadius: 1,
                    fontSize: '1.5rem',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  {emoji}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Popover>
  )
}
