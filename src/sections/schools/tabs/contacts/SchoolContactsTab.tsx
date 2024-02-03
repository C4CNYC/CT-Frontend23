import React from 'react'

import { Box } from '@mui/material'

import { useTranslate } from '@/lib/utils/translateHelper'
import { useGetSchoolContactsQuery } from '@/redux/services/manager/schools-manager'

import ContactsForm from './ContactsForm'
import SkeletonContactsTab from './SkeletonContactsTab'

interface Props {
  schoolId: string
}

export default function SchoolContactsTab({ schoolId }: Props): React.ReactElement | null {
  const { data, isLoading } = useGetSchoolContactsQuery({ schoolId }, { skip: !schoolId })
  const translate = useTranslate()

  if (isLoading) return <SkeletonContactsTab />

  if (!data) return <>{translate('messages_no_data')}</>

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'transparent !important',
          mb: 3,
          height: 420,
          position: 'relative',
        }}
      >
        {isLoading ? null : (
          <ContactsForm
            contacts={data}
            schoolId={schoolId}
          />
        )}
      </Box>
    </>
  )
}
