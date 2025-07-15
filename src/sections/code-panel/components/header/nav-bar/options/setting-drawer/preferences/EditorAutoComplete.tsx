import { useState } from 'react'

import { IconButton, Stack, Switch } from '@mui/material'
import { MdCode } from '@react-icons/all-files/md/MdCode'

import { useTranslate } from '@/utils/translateHelper'

import BasePreferenceV2 from './BasePreferenceV2'

interface IEditorAutoComplete {
  onUpdate: (newValue: boolean) => void
}

const EditorAutoComplete = ({ onUpdate }: IEditorAutoComplete): React.ReactElement => {
  const [isAutoComplete, setIsAutoComplte] = useState(false)
  const translate = useTranslate()
  return (
    <BasePreferenceV2
      title={translate('Auto-Complete')}
      abandonmentIcon={
        <IconButton sx={{ pointerEvents: 'none' }}>
          <MdCode />
        </IconButton>
      }
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
      >
        <Switch
          checked={isAutoComplete}
          onChange={(e, newvalue) => {
            setIsAutoComplte(!isAutoComplete)
            onUpdate(newvalue)
          }}
        />
      </Stack>
    </BasePreferenceV2>
  )
}

export default EditorAutoComplete
