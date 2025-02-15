import { useState } from 'react'

import { IconButton, Stack, Switch, Typography } from '@mui/material'

import { Iconify } from '@/components/iconify'
import { useTranslate } from '@/utils/translateHelper'

import BasePreference from './BasePreference'

interface IEditorWordWrap {
  onUpdateWordWrap: (newValue: boolean) => void
}

const EditorWordWrap = ({ onUpdateWordWrap }: IEditorWordWrap): React.ReactElement => {
  const [wordWrap, setWordWrap] = useState(true)
  const translate = useTranslate()
  return (
    <BasePreference
      title={translate('word_wrap')}
      abandonmentIcon={
        <IconButton sx={{ pointerEvents: 'none' }}>
          <Iconify
            width='22px'
            icon='material-symbols:wrap-text-rounded'
          />
        </IconButton>
      }
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
      >
        <Typography variant='subtitle1'>{translate('enable')}</Typography>
        <Switch
          checked={wordWrap}
          onChange={(e, newvalue) => {
            setWordWrap(!wordWrap)
            onUpdateWordWrap(newvalue)
          }}
        />
      </Stack>
    </BasePreference>
  )
}

export default EditorWordWrap
