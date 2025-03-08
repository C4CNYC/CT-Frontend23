import { Stack } from '@mui/material'

import { DEFAULT_TAKE_PER_PAGE, FilterMode, useFilters } from '@/hooks'
import { ICourseSearchParams } from '@/redux/interfaces/content.interface'
import { useGetCourseQuery } from '@/redux/services/manager/courses-student'
import { useGetPublicCourseQuery } from '@/redux/services/public-student'
import { useSelector } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'
import { EmptyContent } from '@root/src/components/empty-content/EmptyContent'
import { SimpleInfiniteList } from '@root/src/components/infinity-pagination/SimpleInfiniteList'

import CoursesItem from './course-list-item/CourseItem'
import SkeletonCourse from './course-list-item/SkeletonCourse'

interface Props {
  publicPage?: boolean
}

export default function CourseList({ publicPage }: Props): React.ReactElement {
  const { filters, setFilter } = useFilters<ICourseSearchParams>(
    {
      name: '',
      take: DEFAULT_TAKE_PER_PAGE,
    },
    FilterMode.global
  )
  const profile = useSelector((state) => state.global.user)
  const publicOrNotProfile = publicPage || !profile
  const {
    data: privateData,
    isLoading: privateLoading,
    isFetching: privateFetching,
  } = useGetCourseQuery({ take: 50 }, { skip: publicOrNotProfile })

  const {
    data: publicData,
    isLoading: publicLoading,
    isFetching: publicFetching,
  } = useGetPublicCourseQuery(filters, { skip: !publicOrNotProfile })

  const data = publicOrNotProfile ? publicData : privateData
  const isLoading = privateLoading || publicLoading
  const isFetching = privateFetching || publicFetching

  const translate = useTranslate()

  const createSkeletonList = (): React.ReactElement[] => {
    return Array(DEFAULT_TAKE_PER_PAGE)
      .fill(null)
      .map((v, i) => <SkeletonCourse key={i + 14} />)
  }

  if (isLoading) {
    return (
      <Stack
        direction='column'
        gap={3}
        sx={{ pb: 4 }}
      >
        {createSkeletonList()}
      </Stack>
    )
  }

  return (
    <SimpleInfiniteList
      hasNextPage={data?.meta.hasNextPage ?? false}
      onLoadMore={() => {
        if (data?.meta.take !== Number(filters?.take)) return
        setFilter('take', Number(filters.take) + 10)
      }}
      loading={isLoading ?? isFetching}
    >
      <Stack
        direction='column'
        gap={3}
        sx={{ pb: 4 }}
      >
        {isFetching ? (
          <>{createSkeletonList()}</>
        ) : data?.data?.length ? (
          data?.data?.map((el) => (
            <CoursesItem
              course={el}
              key={el.id}
            />
          ))
        ) : (
          <EmptyContent title={translate('courses_empty')} />
        )}
      </Stack>
    </SimpleInfiniteList>
  )
}
