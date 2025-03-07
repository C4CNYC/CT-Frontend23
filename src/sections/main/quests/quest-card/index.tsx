import { Skeleton, Stack } from '@mui/material'

import { FilterMode, useFilters } from '@/hooks'
import { IAssignmetsSearchParams } from '@/redux/interfaces/assignment.interface'
import { useGetAssignmentListStudentQuery } from '@/redux/services/manager/assignments-student'
import { useSelector } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'
import { EmptyContent, SimpleInfiniteList } from '@root/src/components'

import QuestItem from './QuestItem'

interface IQuestTabProps {
  classId: string
  schoolId: string
  activeTab: boolean
}

const DEFAULT_TAKE_PER_PAGE = 10

export default function QuestsTab({ classId, schoolId, activeTab }: IQuestTabProps) {
  const { filters, setFilter } = useFilters<IAssignmetsSearchParams>({}, FilterMode.local)
  const profile = useSelector((state) => state.global.user)
  const {
    data: assignments,
    isLoading,
    isFetching,
  } = useGetAssignmentListStudentQuery(
    { class_id: classId, ...filters },
    {
      skip: !activeTab || !classId || !profile,
      refetchOnMountOrArgChange: true,
    }
  )

  const translate = useTranslate()

  if (isLoading) {
    return <Stack sx={{ flexDirection: { lg: 'row' } }}>{getQuestsSkeletonList()}</Stack>
  }

  return (
    <Stack
      sx={{ flexDirection: { lg: 'row' } }}
      className='studentJoinStep4'
    >
      <Stack
        gap={2}
        flexGrow={1}
      >
        <SimpleInfiniteList
          hasNextPage={assignments?.meta.hasNextPage ?? false}
          onLoadMore={() => {
            if (assignments?.meta.take !== Number(filters?.take)) return
            setFilter('take', DEFAULT_TAKE_PER_PAGE)
          }}
          loading={isLoading ?? isFetching}
        >
          {assignments?.data.map((el) => (
            <QuestItem
              key={el.id}
              assignment={el}
              schoolId={schoolId}
            />
          ))}

          {isFetching ? getQuestsSkeletonList() : null}
        </SimpleInfiniteList>
        {!isLoading && !isFetching && !assignments?.data.length && (
          <EmptyContent title={translate('messages_no_data')} />
        )}
      </Stack>
    </Stack>
  )
}

const getQuestsSkeletonList = () => {
  return (
    <Stack
      gap={2}
      flexGrow={1}
    >
      {Array.from('12345').map((el) => (
        <Skeleton
          variant='rounded'
          height='124px'
          key={el + 3}
        />
      ))}
    </Stack>
  )
}
