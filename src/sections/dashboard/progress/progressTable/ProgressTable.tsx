import React, { useEffect, useMemo, useState } from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { HiOutlineSquares2X2 } from '@react-icons/all-files/hi2/HiOutlineSquares2X2'
import { LuPencil } from '@react-icons/all-files/lu/LuPencil'
import { MdOutlineAutoMode } from '@react-icons/all-files/md/MdOutlineAutoMode'
import { MdOutlineHome } from '@react-icons/all-files/md/MdOutlineHome'
import at from 'lodash-es/at'
import cloneDeep from 'lodash-es/cloneDeep'
import uniqBy from 'lodash-es/uniqBy'

import { SetFilterType } from '@/hooks'
import {
  IClassProgress,
  IClassProgressCourse,
  IClassProgressLesson,
  IClassProgressModule,
} from '@/redux/interfaces/class.interface'
import { RootState, useSelector } from '@/redux/store'
import { BaseSearchInterface } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'
import { TablePaginationCustom } from '@root/src/components'

import HeadItemTooltip from './HeadItemTooltip'
import TableItemProgress from './ProgressTableItem'
import TableHeadLesson from './ProgressTebleHead'
import TableHeadItem from './TableHeadItem'
import TableHeadSort from './TableHeadSort'
import TableItemLesson from './TableItemLesson'

interface IProgressTable {
  filters: BaseSearchInterface & {
    courseId: string
    moduleId: string
    lessonId: string
  }
  setFilter: SetFilterType
  data: IClassProgress[]
  viewBy: {
    main: 'course' | 'quest'
    user: 'username' | 'name'
  }
  levelName: 'lesson' | 'module' | 'course'
}

type DataType = IClassProgressCourse[] | IClassProgressModule[] | IClassProgressLesson[]

const defaultIconProps = {
  size: 14,
  style: {
    marginLeft: 2,
  },
}

const AutoGradedIcon = () => (
  <MdOutlineAutoMode
    color='#75CF6D'
    {...defaultIconProps}
  />
)
const ManualGradedIcon = () => (
  <LuPencil
    color='#5b8aee'
    {...defaultIconProps}
  />
)
const CoreCurriculumIcon = () => (
  <MdOutlineHome
    color='#0198ED'
    {...defaultIconProps}
  />
)
const SchoolCurriculumIcon = () => (
  <HiOutlineSquares2X2
    color='green'
    {...defaultIconProps}
  />
)

export default function ProgressTable({
  data,
  filters,
  setFilter,
  viewBy,
  levelName,
}: IProgressTable): React.ReactElement {
  const translate = useTranslate()
  const lastNameOnly = useSelector((state: RootState) => state.schoolSettings.last_name_only)
  const [orderedData, setOrderedData] = useState(data ?? [])
  const [selectedCourseIdx, setSelectedCourseIdx] = useState<number>(0)
  const [selectedModuleIdx, setSelectedModuleIdx] = useState<number>(0)
  const courses = useMemo(() => uniqBy(orderedData?.[0]?.courses, 'id'), [orderedData])
  const [selectedData, setSelectedData] = useState<DataType>([])
  const [orderBy, setOrderBy] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const getProgressBarData = (levelName: 'lesson' | 'module' | 'course', items: IClassProgress) => {
    if (levelName === 'course') {
      const testMap = new Map()
      items.courses.map((el) => {
        testMap.set(el.id, el)
      })
      return Array.from(testMap, ([, course]) => course as IClassProgressCourse)
    }

    if (levelName === 'module') {
      return items.courses.find((c) => c.id === filters.courseId)!.modules
    }

    return items.courses
      .find((c) => c.id === filters.courseId)!
      .modules.find((m) => m.id === filters.moduleId)!.lessons
  }

  useEffect(() => {
    setOrderedData(data ?? [])
  }, [data])

  useEffect(() => {
    const { courseId, moduleId } = filters
    if (!courses.length) return
    if (courseId.length)
      setSelectedCourseIdx(courses.findIndex((course) => course.id === courseId)!)
    if (courseId.length && moduleId.length)
      setSelectedModuleIdx(
        courses
          .find((course) => course.id === courseId)!
          .modules.findIndex((module) => module.id === moduleId)
      )
    if (!courseId.length && !moduleId.length) setSelectedData(courses)
    else if (courseId.length && !moduleId.length)
      setSelectedData(courses.find((course) => course.id === courseId)!.modules)
    else
      setSelectedData(
        courses
          .find((course) => course.id === courseId)!
          .modules.find((module) => module.id === moduleId)!.lessons
      )
  }, [filters, courses])

  useEffect(() => {
    const newData = cloneDeep(data)
    newData?.sort((a, b) => {
      // @ts-ignore
      const valueA = at(a, orderBy)
      // @ts-ignore
      const valueB = at(b, orderBy)
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
    setOrderedData(newData)
  }, [orderBy, sortDirection, data])

  const onSelectGroup = (id: string) => {
    if (!filters.courseId.length) setFilter('courseId', id)
    else if (!filters.moduleId.length) setFilter('moduleId', id)
    else if (filters.lessonId === id) setFilter('lessonId', '')
    else setFilter('lessonId', id)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {viewBy?.user === 'name' && (
                <>
                  <TableHeadSort
                    id='first_name'
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                  >
                    {translate('first_name')}
                  </TableHeadSort>
                  <TableHeadSort
                    id='last_name'
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                  >
                    {translate('last_name')}
                  </TableHeadSort>
                </>
              )}
              {viewBy?.user === 'username' && (
                <TableHeadSort
                  id='username'
                  sortDirection={sortDirection}
                  setSortDirection={setSortDirection}
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                >
                  {translate('username')}
                </TableHeadSort>
              )}
              {selectedData.map((item, idx) =>
                'description' in item ? (
                  <TableHeadItem
                    id={
                      levelName === 'course'
                        ? `courses[${idx}].progress`
                        : `courses[${selectedCourseIdx}].modules[${idx}].progress`
                    }
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    key={item.id}
                    name={item.name}
                    tooltipText={
                      <HeadItemTooltip
                        levelName={levelName}
                        selectedCourseIdx={selectedCourseIdx}
                        item={item}
                        courses={courses}
                        index={idx}
                      />
                    }
                    type={
                      <>
                        {levelName} {item.autoGraded ? <AutoGradedIcon /> : <ManualGradedIcon />}{' '}
                        {item.core ? <CoreCurriculumIcon /> : <SchoolCurriculumIcon />}
                      </>
                    }
                  />
                ) : (
                  <TableHeadLesson
                    key={item.id}
                    id={`courses[${selectedCourseIdx}].modules[${selectedModuleIdx}].lessons[${idx}].progress`}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    collapsed={item.id !== filters.lessonId}
                    type={item.type}
                    name={`${courses[selectedCourseIdx]?.content_id}.${
                      (selectedModuleIdx ?? 0) + 1
                    }.${idx + 1}`}
                    description={item.name}
                  />
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedData
              ?.slice(((filters.page ?? 1) - 1) * 20, (filters.page ?? 0) * 20)
              ?.map((el, index) => (
                <TableRow key={`row-${index}`}>
                  {viewBy?.user === 'username' && (
                    <TableCell size='small'>{el?.username}</TableCell>
                  )}
                  {viewBy?.user === 'name' && (
                    <>
                      <TableCell size='small'>{el?.first_name}</TableCell>
                      <TableCell size='small'>
                        {!lastNameOnly
                          ? `${el?.last_name ? el?.last_name?.substring(0, 1) : ''}`
                          : el?.last_name}
                      </TableCell>
                    </>
                  )}
                  {getProgressBarData(levelName, el).map((item) =>
                    'slides' in item ? (
                      <TableItemLesson
                        key={item.id}
                        collapsed={item.id !== filters.lessonId}
                        progress={item.progress}
                        items={item.slides!.map((slide) => ({
                          name: slide.name,
                          status: slide.progress,
                        }))}
                        onClick={() => onSelectGroup(item.id)}
                      />
                    ) : (
                      <>
                        <TableItemProgress
                          key={item.id}
                          studentName={`${el.first_name} ${
                            !lastNameOnly
                              ? `${el?.last_name ? el?.last_name?.substring(0, 1) : ''}`
                              : el?.last_name
                          }`}
                          type={levelName}
                          name={item.name}
                          progress={item.progress}
                          onClick={() => onSelectGroup(item.id)}
                        />
                      </>
                    )
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationCustom
        count={orderedData?.length ?? 0}
        page={filters.page ? filters.page - 1 : 0}
        rowsPerPage={20}
        rowsPerPageOptions={[]}
        onPageChange={(e: any, page: number) => {
          setFilter('page', page + 1)
        }}
      />
    </>
  )
}
