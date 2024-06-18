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
import { useRemirrorContext } from '@remirror/react'

const testTemplate = {
  type: 'doc',
  content: [
    {
      attrs: {
        nodeTextAlignment: 'center',
      },
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Just Test Template',
        },
      ],
    },
    {
      attrs: {
        nodeTextAlignment: 'center',
      },
      type: 'paragraph',
      content: [{ type: 'text', text: 'Template' }],
    },
    {
      attrs: {
        nodeTextAlignment: 'center',
      },
      type: 'paragraph',
      content: [{ type: 'text', marks: [{ type: 'code' }], text: '<h3>🤩</h3>' }],
    },
  ],
}

const shortTemplate = 'test'

const LESSON_TEMLATES = [
  { title: '1-Page Lesson - Short', value: testTemplate },
  { title: '1-Page Lesson - Extended', value: testTemplate },
  { title: 'Challenge - Short', value: testTemplate },
  { title: 'Challenge - Long', value: testTemplate },
  { title: 'Challenge - without code', value: testTemplate },
  { title: 'Briefing - w large image', value: testTemplate },
  { title: 'Briefing - w small image', value: testTemplate },
  { title: 'Briefing - no image', value: shortTemplate },
]

interface IValue {
  value: string
  name: string
}

export default function TemplateSelector() {
  const [type, setType] = useState('')
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const { setContent } = useRemirrorContext()

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value)
    setOpenDialog(true)
  }

  const closeDialog = () => {
    setOpenDialog(false)
    setType('')
  }

  const confirmTemplate = () => {
    setContent(type)
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
              value={template.value as string}
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
