import React from 'react'

import { Button } from '@mui/material'
import { useFieldArray } from 'react-hook-form'

import { Iconify, RHFTextField } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

export const DomainFields = () => {
  const translate = useTranslate()
  const { fields, append, remove } = useFieldArray({
    name: 'domain',
  })

  return (
    <div className='space-y-4'>
      {fields.map((field, index) => (
        <div
          key={field.id}
          style={{ display: 'flex', gap: '.5rem' }}
        >
          <RHFTextField
            name={`domain.${index}`}
            label={index === 0 ? translate('create_new_domain_label') : ''}
            required={index === 0}
          />
          <Button onClick={() => remove(index)}>
            <Iconify
              icon='eva:minus-fill'
              width={16}
            />
          </Button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: '.5rem' }}>
        <div style={{ width: '100%' }}> </div>
        <Button onClick={() => append('')}>
          <Iconify
            icon='eva:plus-fill'
            width={16}
          />
        </Button>
      </div>
    </div>
  )
}
