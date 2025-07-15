import { Button, Skeleton, Stack } from '@mui/material'

import { EmptyContent } from '@/components'
import { useGetModuleAuthorsQuery } from '@/redux/services/manager/module-author-manager'
import { useTranslate } from '@/utils/translateHelper'

import AddAuthorDialog from './AddAuthorDialog'
import AuthorsList from './AuthorsList'

interface IModuleAuthorsListProps {
  moduleId: string
}

export default function AuthorsTab({ moduleId }: IModuleAuthorsListProps): React.ReactElement {
  const { data, isLoading } = useGetModuleAuthorsQuery({ course_unit_id: moduleId })
  const translate = useTranslate()

  return (
    <Stack height='100%'>
      {!data?.data.length && !isLoading ? (
        <EmptyContent title={translate('messages_no_data')} />
      ) : null}
      {isLoading ? (
        <Skeleton
          variant='rounded'
          animation='wave'
          sx={{ height: '260px' }}
        />
      ) : (
        <AuthorsList
          authors={data?.data ?? []}
          moduleId={moduleId}
        />
      )}
      <Stack
        direction='row'
        justifyContent='flex-end'
        mt='auto'
      >
        <AddAuthorDialog moduleId={moduleId}>
          <Button
            sx={{ mt: 4, mb: 1 }}
            variant='contained'
          >
            {translate('actions_create_author')}
          </Button>
        </AddAuthorDialog>
      </Stack>
    </Stack>
  )
}
