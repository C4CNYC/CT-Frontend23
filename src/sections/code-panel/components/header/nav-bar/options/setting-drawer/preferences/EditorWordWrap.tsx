import { useState } from 'react'

import { IconButton, Stack, Switch } from '@mui/material'
import { MdOutlineWrapText } from '@react-icons/all-files/md/MdOutlineWrapText'

import { useTranslate } from '@/utils/translateHelper'

import BasePreferenceV2 from './BasePreferenceV2'

interface IEditorWordWrap {
  onUpdateWordWrap: (newValue: boolean) => void
}

const EditorWordWrap = ({ onUpdateWordWrap }: IEditorWordWrap): React.ReactElement => {
  const [wordWrap, setWordWrap] = useState(true)
  const translate = useTranslate()
  return (
    <BasePreferenceV2
      title={translate('word_wrap')}
      abandonmentIcon={
        <IconButton sx={{ pointerEvents: 'none' }}>
          <MdOutlineWrapText />
        </IconButton>
      }
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
      >
        <Switch
          checked={wordWrap}
          onChange={(e, newvalue) => {
            setWordWrap(!wordWrap)
            onUpdateWordWrap(newvalue)
          }}
        />
      </Stack>
    </BasePreferenceV2>
  )
}

export default EditorWordWrap
