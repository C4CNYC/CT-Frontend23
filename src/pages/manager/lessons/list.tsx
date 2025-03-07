import { useCallback, useEffect, useState } from 'react'

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import { Box, Button, Container } from '@mui/material'
import { FaPlus } from '@react-icons/all-files/fa6/FaPlus'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { DEFAULT_TAKE_PER_PAGE } from '@/hooks'
import DashboardLayout from '@/layouts/dashboard'
import { useGetAllAdminLessonsQuery } from '@/redux/services/admin/lessons-admin'
import { Role } from '@/redux/services/enums/role.enum'
import { ILesson, ILessonSearchParams } from '@/redux/services/interfaces/courseUnits.interface'
import {
  useGetOwnLessonsQuery,
  useCreateByCloningLessonMutation,
} from '@/redux/services/manager/lessons-manager'
import { useUpdateModuleLessonMutation } from '@/redux/services/manager/modules-manager'
import { useSelector } from '@/redux/store'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import LessonCard from '@/sections/dashboard/lessons/LessonCard'
import LessonStepMain from '@/sections/dashboard/lessons/LessonStep/LessonStepMain'
import SkeletonList, { DefaultSkeletonItem } from '@/sections/dashboard/skeleton/skeletonList'
import { useTranslate } from '@/utils/translateHelper'
import { CustomBreadcrumbs, SimpleInfiniteList, useSettingsContext } from '@root/src/components'
import { useGetPropertiesQuery } from '@root/src/redux/services/manager/properties-manager'

import FilterLessons from './filter'

function moveItemInArray<T>(array: T[], from: number, to: number, on: number = 1): T[] {
  // eslint-disable-next-line no-return-assign,no-sequences
  return (array = array.slice()), array.splice(to, 0, ...array.splice(from, on)), array
}

function parseSort(sort?: number) {
  return sort ?? 0
}

function getSort(result: DropResult, lessons: ILesson[]): number {
  const { destination, draggableId } = result

  // case: move to start
  if (destination?.index === 0) {
    return parseSort(lessons[0].sort) / 2
  }

  // case: move to end
  if (destination?.index && destination?.index >= lessons.length - 1) {
    const lastId = lessons.length - 1
    return parseSort(lessons[lastId].sort) + 1
  }

  // case: when you move lesson to after next.
  if (lessons[Number(destination?.index) - 1].id === draggableId) {
    const prevId = Number(destination?.index)
    const nextId = Number(destination?.index) + 1

    return lessons[nextId]?.sort
      ? (parseSort(lessons[nextId].sort) + parseSort(lessons[prevId].sort)) / 2
      : parseSort(lessons[prevId].sort) + 1
  }

  // case: all other cases
  const nextId = Number(destination?.index)
  const prevId = Number(destination?.index) - 1

  return lessons[nextId]?.sort
    ? (parseSort(lessons[nextId].sort) + parseSort(lessons[prevId].sort)) / 2
    : parseSort(lessons[prevId].sort) + 1
}

LessonsListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function LessonsListPage(): React.ReactElement {
  const router = useRouter()
  const { themeStretch } = useSettingsContext()
  const translate = useTranslate()

  const [lessons, setLessons] = useState<ILesson[]>([])

  const userRole = useSelector((state) => state.global?.user?.role)

  const [filters, setFilterState] = useState<ILessonSearchParams>({
    module_id: '',
    name: '',
    lessonId: '',
    take: DEFAULT_TAKE_PER_PAGE,
    page: 1,
  })
  function setFilter(key: string | string[], value: string | number) {
    if (Array.isArray(key)) {
      key.forEach((k) => {
        setFilterState({
          ...filters,
          [k]: value,
        })
      })
    } else {
      setFilterState({
        ...filters,
        [key]: value,
      })
    }
  }
  const {
    data: ownLessonsData,
    isLoading: isOwnLessonDataLoading,
    isFetching: isOwnLessonDataFetching,
    refetch: refetchOwnLessons,
  } = useGetOwnLessonsQuery(filters, {
    skip: userRole === Role.Admin || userRole === Role.SuperAdmin,
  })
  const {
    data: adminData,
    isLoading: adminIsLoading,
    isFetching: adminFetching,
    refetch: refetchAdminLessons,
  } = useGetAllAdminLessonsQuery(filters, {
    skip: userRole !== Role.Admin && userRole !== Role.SuperAdmin,
  })
  const { data: propertyLocks } = useGetPropertiesQuery(
    {
      entityType: 'lesson',
      propertyName: 'lock',
    },
    { skip: !lessons.length }
  )
  const [updateModuleLesson] = useUpdateModuleLessonMutation()
  const [createByCloningLesson] = useCreateByCloningLessonMutation()

  const data = userRole === Role.Admin || Role.SuperAdmin ? adminData : ownLessonsData
  const isLoading =
    userRole === Role.Admin || Role.SuperAdmin ? adminIsLoading : isOwnLessonDataLoading
  const isFetching =
    userRole === Role.Admin || Role.SuperAdmin ? adminFetching : isOwnLessonDataFetching

  useEffect(() => {
    let l = adminData?.data ?? []
    if (ownLessonsData?.data) {
      l = l.concat(ownLessonsData?.data)
    }
    setLessons(l)
  }, [adminData, ownLessonsData])

  const refetch = () => {
    if (userRole === Role.Admin || userRole === Role.SuperAdmin) {
      refetchAdminLessons()
    } else {
      refetchOwnLessons()
    }
  }

  const onDragEnd = useCallback(
    (result: DropResult): void => {
      if (!filters.module_id) return

      const { destination, source, draggableId } = result

      if (!destination) return

      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return
      }

      setLessons(moveItemInArray(lessons, source.index, destination.index))

      updateModuleLesson({
        id: filters.module_id,
        lesson_id: draggableId,
        sort: getSort(result, lessons),
      })
    },
    [filters, lessons]
  )

  if (isLoading) {
    return (
      <SkeletonList
        filter={2}
        count={DEFAULT_TAKE_PER_PAGE}
      />
    )
  }
  async function createByCloningLessonHandler() {
    let data = await createByCloningLesson()
    if ('data' in data && data.data?.id) {
      router.push(
        `${router.pathname}?${new URLSearchParams({ lessonId: data.data.id })}`,
        undefined,
        {
          shallow: true,
        }
      )
    }
  }

  return (
    <>
      <Head>
        {router.query.lessonId ? null : <title>{translate('lessons_list')} | CodeTribe</title>}
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading=''
          links={[
            {
              name: translate('home'),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate('lessons'),
              href: MANAGER_PATH_DASHBOARD.lessons.root,
            },
          ]}
          action={
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Button
                variant='contained'
                startIcon={<FaPlus />}
                sx={{ mr: 2 }}
                onClick={createByCloningLessonHandler}
              >
                {translate('lessons_create_lesson')}
              </Button>
            </Box>
          }
        />

        <FilterLessons
          filters={filters}
          setFilter={setFilter}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='lessons'>
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                gap={2}
                display={filters.module_id ? 'flex' : 'grid'}
                flexDirection='column'
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
              >
                <SimpleInfiniteList
                  hasNextPage={data?.meta.hasNextPage ?? false}
                  onLoadMore={() => {
                    if (data?.meta.take !== Number(filters?.take)) return
                    setFilter('take', Number(filters.take) + DEFAULT_TAKE_PER_PAGE)
                  }}
                  loading={isLoading ?? isFetching}
                >
                  {lessons.map((lesson, index) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      index={index}
                      refetch={refetch}
                      lock={!!propertyLocks?.data?.find((lock) => lock.entityId === lesson.id)}
                    />
                  ))}
                  {isFetching
                    ? Array(40)
                        .fill(null)
                        .map((v, i) => <DefaultSkeletonItem key={i} />)
                    : null}
                </SimpleInfiniteList>
              </Box>
            )}
          </Droppable>
        </DragDropContext>
        <LessonStepMain />
      </Container>
    </>
  )
}
