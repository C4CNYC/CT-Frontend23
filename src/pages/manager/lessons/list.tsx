import Head from "next/head"

import { Box, Button, Container } from "@mui/material"

import {
  CustomBreadcrumbs,
  Iconify,
  SimpleInfiniteList,
  useSettingsContext,
} from "@components"
import { DEFAULT_TAKE_PER_PAGE, FilterMode, useFilters } from "@hooks"
import DashboardLayout from "@layouts/dashboard"
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths"
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths"
import CreateLesson from "@sections/dashboard/lessons/CreateLessonDialog/CreateLesson"
import LessonCard from "@sections/dashboard/lessons/LessonCard"
import LessonStepMain from "@sections/dashboard/lessons/LessonStep/LessonStepMain"
import SkeletonList, {
  DefaultSkeletonItem,
} from "@sections/dashboard/skeleton/skeletonList"
import { getCountTakingElment } from "@utils"
import { ILesson, ILessonSearchParams } from "src/redux/services/interfaces/courseUnits.interface"
import { useGetLessonsQuery } from "src/redux/services/manager/lessons-manager"
import { useTranslate } from "src/utils/translateHelper"

import FilterLessons from "./filter"
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import { useCallback, useEffect, useState } from "react"
import {
  useUpdateModuleLessonMutation
} from "../../../redux/services/manager/modules-manager"

function moveItemInArray<T>(array: T[], from: number, to: number, on: number = 1): T[] {
  // eslint-disable-next-line no-return-assign,no-sequences
  return array = array.slice(), array.splice(to, 0, ...array.splice(from, on)), array
}

function parseSort(sort?: number) {
  return sort ?? 0;
}

function getSort(
  result: DropResult,
  lessons: ILesson[],
): number {
  const { destination, draggableId } = result;

  // case: move to start
  if (destination?.index === 0) {
    return parseSort(lessons[0].sort) / 2;
  }

  // case: move to end
  if (destination?.index && destination?.index >= lessons.length - 1) {
    const lastId = lessons.length - 1;
    return parseSort(lessons[lastId].sort) + 1;
  }

  // case: when you move lesson to after next.
  if (lessons[Number(destination?.index) - 1].id === draggableId) {
    const prevId = Number(destination?.index);
    const nextId = Number(destination?.index) + 1;

    return lessons[nextId]?.sort
      ? (parseSort(lessons[nextId].sort) +
        parseSort(lessons[prevId].sort)) /
      2
      : parseSort(lessons[prevId].sort) + 1;
  }

  // case: all other cases
  const nextId = Number(destination?.index);
  const prevId = Number(destination?.index) - 1;

  return lessons[nextId]?.sort
    ? (parseSort(lessons[nextId].sort) +
      parseSort(lessons[prevId].sort)) /
    2
    : parseSort(lessons[prevId].sort) + 1;
}

LessonsListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
)

export default function LessonsListPage (): React.ReactElement {
  const { themeStretch } = useSettingsContext()
  const translate = useTranslate()
  const {
    filters,
    setFilter
  } = useFilters<ILessonSearchParams>(
    {
      module_id: "",
      name: "",
    },
    FilterMode.global
  )

  const [lessons, setLessons] = useState<ILesson[]>([])

  const {
    data,
    isLoading,
    isFetching
  } = useGetLessonsQuery(filters)

  useEffect(() => {
    setLessons(data?.data ?? [])
  }, [data])

  const [updateModuleLesson] =
    useUpdateModuleLessonMutation();

  const onDragEnd = useCallback((result: DropResult): void => {
    if (!filters.module_id) return;

    const {
      destination,
      source,
      draggableId
    } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    setLessons(moveItemInArray(lessons, source.index, destination.index))

    updateModuleLesson({
      id: filters.module_id,
      lesson_id: draggableId,
      sort: getSort(result, lessons),
    })
  }, [filters, lessons])

  if (isLoading) {
    return <SkeletonList filter={2} count={DEFAULT_TAKE_PER_PAGE}/>
  }

  return (
    <>
      <Head>
        <title> {translate("lessons_list")} | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            {
              name: translate("home"),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate("lessons"),
              href: MANAGER_PATH_DASHBOARD.lessons.root,
            },
          ]}
          action={
            <CreateLesson>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill"/>}
                sx={{ mr: 2 }}
              >
                {translate("lessons_create_lesson")}
              </Button>
            </CreateLesson>
          }
        />

        <FilterLessons filters={filters} setFilter={setFilter}/>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="lessons">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                gap={2}
                display={filters.module_id ? "flex" : "grid"}
                flexDirection="column"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                }}
              >
                <SimpleInfiniteList
                  hasNextPage={data?.meta.hasNextPage ?? false}
                  onLoadMore={() => {
                    if (data?.meta.take !== Number(filters?.take)) return
                    setFilter("take", Number(filters.take) + DEFAULT_TAKE_PER_PAGE)
                  }}
                  loading={isLoading ?? isFetching}
                >
                  {lessons.map((lesson, index) => (
                      <LessonCard key={lesson.id} lesson={lesson} index={index}/>
                  ))}
                  {isFetching
                    ? Array(
                      getCountTakingElment(
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        Number(data?.meta?.itemCount),
                        Number(filters.take)
                      )
                    )
                      .fill(null)
                      .map((v, i) => <DefaultSkeletonItem key={i}/>)
                    : null}
                </SimpleInfiniteList>
              </Box>
            )}
          </Droppable>
        </DragDropContext>
        <LessonStepMain/>
      </Container>
    </>
  )
}
