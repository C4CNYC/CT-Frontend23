import React from 'react'

import { Button } from '@mui/material'
import { FaMinus } from '@react-icons/all-files/fa/FaMinus'
import { FaPlus } from '@react-icons/all-files/fa6/FaPlus'
import { useFieldArray } from 'react-hook-form'

import { RHFTextField } from '@root/src/components'
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
          style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}
        >
          <RHFTextField
            name={`domain.${index}`}
            label={index === 0 ? translate('create_new_domain_label') : ''}
            required={index === 0}
            helperText={
              index === 0
                ? ''
                : 'Important: Create a CNAME record in your domain DNS settings and point it to [tenant-slug].codetribe.ai for it to show correctly.'
            }
          />
          <Button onClick={() => remove(index)}>
            <FaMinus size={16} />
          </Button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: '.5rem' }}>
        <div style={{ width: '100%' }}> </div>
        <Button onClick={() => append('')}>
          <FaPlus size={16} />
        </Button>
      </div>
    </div>
  )
}
