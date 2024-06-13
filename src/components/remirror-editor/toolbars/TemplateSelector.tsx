import { useState } from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { HiOutlineTemplate } from '@react-icons/all-files/hi/HiOutlineTemplate'
import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline'

const LESSON_TEMLATES = [
  { title: '1-Page Lesson - Short', value: '1-page-lesson-short' },
  { title: '1-Page Lesson - Extended', value: '1-page-lesson-extended' },
  { title: 'Challenge - Short', value: 'challenge-short' },
  { title: 'Challenge - Long', value: 'challenge-long' },
  { title: 'Challenge - without code', value: 'challenge-without-code' },
  { title: 'Briefing - w large image', value: 'briefing-w-large-image' },
  { title: 'Briefing - w small image', value: 'briefing-w-small-image' },
  { title: 'Briefing - no image', value: 'briefing-no-image' },
]

export default function TemplateSelector({}) {
  const [type, setType] = useState('')
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as string)
    setOpenDialog(true)
  }

  const closeDialog = () => {
    setOpenDialog(false)
    setType('')
  }

  const confirmTemplate = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id='select-template'>Select Template</InputLabel>
        <Select
          labelId='select-template'
          id='select-template'
          value={type}
          label='Select Template'
          onChange={handleChangeType}
          startAdornment={
            <InputAdornment position='start'>
              <HiOutlineTemplate size={30} />
            </InputAdornment>
          }
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#D9F6F8',
              },
            },
          }}
          sx={{
            pl: 1,
            '& legend': { width: 100 },
          }}
        >
          {LESSON_TEMLATES.map((template, index) => (
            <MenuItem
              value={template.value}
              key={index}
            >
              {template.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Dialog
        open={openDialog}
        onClose={closeDialog}
        PaperProps={{
          py: 2,
          px: { sm: 1, md: 3 },
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
          }}
        >
          <IoCloseOutline
            size={20}
            onClick={closeDialog}
          />
        </IconButton>
        <Box
          sx={{
            p: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Typography
              sx={{
                px: 2,
                pt: 3,
              }}
              variant='h6'
            >
              Changing the template will delete all content <br /> in this slide
            </Typography>
            <Button
              variant='soft'
              color='info'
              onClick={confirmTemplate}
            >
              Ok
            </Button>
            <Button
              color='inherit'
              variant='soft'
              onClick={closeDialog}
            >
              Cancel
            </Button>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  )
}
