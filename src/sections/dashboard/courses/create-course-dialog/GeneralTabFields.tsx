import { Button, FormGroup, Stack } from '@mui/material'

import { RHFSelect, RHFSwitch, RHFTextField } from '@root/src/components'
import { LEVEL } from '@root/src/redux/services/interfaces/courseUnits.interface'
import { capitalizeFirstSymbol } from '@root/src/utils/capitalizeFirstSymbol'
import { useTranslate } from '@root/src/utils/translateHelper'

function GeneralTabFields() {
  const translate = useTranslate()
  return (
    <>
      <RHFTextField
        sx={{ width: '100%' }}
        name='name'
        label={translate('courses_course_name')}
      />
      <RHFTextField
        sx={{ width: '100%' }}
        name='content_id'
        label={translate('courses_content_id')}
        placeholder='W1'
      />
      <RHFSelect
        native
        name='level'
        label={translate('courses_course_level')}
      >
        <option value=''></option>
        {Object.keys(LEVEL).map((l) => (
          <option
            value={LEVEL[l as keyof typeof LEVEL]}
            key={LEVEL[l as keyof typeof LEVEL]}
          >
            {capitalizeFirstSymbol(LEVEL[l as keyof typeof LEVEL])}
          </option>
        ))}
      </RHFSelect>
      <FormGroup
        row
        style={{ flexWrap: 'nowrap' }}
      >
        <Button
          variant='contained'
          sx={{
            maxHeight: '56px',
            bgcolor: 'grey.400',
            color: 'grey.800',

            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          disableElevation
        >
          $
        </Button>
        <RHFTextField
          sx={{
            '& .MuiOutlinedInput-root': {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeftColor: 'transparent',
            },
          }}
          name='price'
          label={translate('courses_course_price')}
          type='number'
        />
      </FormGroup>
      <RHFTextField
        sx={{ width: '100%' }}
        name='initial_likes'
        label={translate('courses_initial_likes')}
        type='number'
      />
      <RHFTextField
        sx={{ width: '100%' }}
        name='initial_stars'
        label={translate('courses_initial_stars')}
        type='number'
      />
      <RHFTextField
        sx={{ width: '100%' }}
        name='initial_enrolled'
        label={translate('courses_initial_enrolled')}
        type='number'
      />
      <RHFTextField
        name='description'
        label={translate('courses_course_description')}
        multiline
        rows={3}
      />
      <Stack direction='row'>
        <RHFSwitch
          name='active'
          label={translate('courses_course_active')}
        />
        <RHFSwitch
          name='public'
          label={translate('public')}
        />
        <RHFSwitch
          name='catalog'
          label={translate('Catalog')}
        />
      </Stack>
    </>
  )
}

export default GeneralTabFields
