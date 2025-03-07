import { useState } from 'react'

import { Avatar, FormGroup, Stack, Typography, useTheme } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'

import {
  AssignmentProjectCategories,
  AssignmentProjectLanguages,
} from '@/redux/enums/assignment-types.enum'
import { ICourse } from '@/redux/services/interfaces/courseUnits.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'
import { RHFSelect, RHFTextField } from '@root/src/components'

import { AVATAR_SX, INPUT_TEXT_SX, inputNameStyles, selectStyle } from './constants'

export default function DetailsStepOpenProject({
  coursesData,
  methods,
  initialCategory,
  initialLanguage,
}: {
  coursesData: {
    data: Array<ICourse & BaseResponseInterface> | undefined
    isLoading: boolean
  }
  methods: UseFormReturn<any>
  initialCategory: AssignmentProjectCategories | undefined
  initialLanguage: string | undefined
}): React.ReactElement {
  const theme = useTheme()
  const { data, isLoading } = coursesData
  const [category, setCategory] = useState<AssignmentProjectCategories>(
    initialCategory || AssignmentProjectCategories.CREATIVE_PROJECT
  )
  const [language, setLanguage] = useState<string | undefined>(
    initialLanguage || AssignmentProjectLanguages.HTML_CSS_JSS
  )
  const translate = useTranslate()

  return (
    <Stack sx={{ gap: 4, minHeight: '630px' }}>
      <Stack
        direction='row'
        gap={3}
        flexWrap='wrap'
      >
        <FormGroup
          sx={{
            maxWidth: { xs: '100%', sm: '100%', md: '300px' },
            width: '100%',
          }}
        >
          <Typography
            variant='h5'
            gutterBottom
            pl={2}
          >
            Select Language
          </Typography>
          <RHFSelect
            native
            name='language'
            size='small'
            onChange={(event: any) => {
              setLanguage(event?.target?.value)
              methods.setValue('language', event?.target?.value)
            }}
            value={language}
            sx={{ ...selectStyle(theme), textTransform: 'capitalize' }}
          >
            <option
              key='empty'
              value='empty'
            ></option>
            {Object.values(AssignmentProjectLanguages).map((t) => (
              <option
                key={t}
                // value={AssignmentProjectLanguages[t as keyof typeof AssignmentProjectLanguages]}
              >
                {t.toUpperCase()}
              </option>
            ))}
          </RHFSelect>
        </FormGroup>
        <FormGroup
          sx={{
            maxWidth: { xs: '100%', sm: '100%', md: '300px' },
            width: '100%',
          }}
        >
          <Typography
            variant='h5'
            gutterBottom
            pl={2}
          >
            Select Category
          </Typography>
          <RHFSelect
            native
            name='category'
            size='small'
            onChange={(event: any) => {
              setCategory(event?.target?.value)
              methods.setValue('category', event?.target?.value)
            }}
            value={category}
            sx={{ ...selectStyle(theme), textTransform: 'capitalize' }}
          >
            <option
              key='empty'
              value='empty'
            ></option>
            {Object.keys(AssignmentProjectCategories).map((t) => (
              <option
                key={AssignmentProjectCategories[t as keyof typeof AssignmentProjectCategories]}
                value={AssignmentProjectCategories[t as keyof typeof AssignmentProjectCategories]}
              >
                {t.split('_').join(' ').charAt(0).toUpperCase() +
                  t.split('_').join(' ').slice(1).toLowerCase()}
              </option>
            ))}
          </RHFSelect>
        </FormGroup>
      </Stack>
      <FormGroup sx={{ position: 'relative' }}>
        <Typography
          variant='h5'
          gutterBottom
          pl={2}
        >
          {translate('quest_name')}
        </Typography>
        <Avatar sx={AVATAR_SX}>🤩</Avatar>
        <RHFTextField
          sx={inputNameStyles(theme)}
          name='name'
        />
        <Typography
          variant='caption'
          sx={INPUT_TEXT_SX}
        >
          {translate('quest_edit_name_msg')}
        </Typography>
      </FormGroup>
      <FormGroup>
        <Typography
          variant='h5'
          gutterBottom
          pl={2}
        >
          {translate('quest_description')}
        </Typography>
        <RHFTextField name='description' />
      </FormGroup>
    </Stack>
  )
}
