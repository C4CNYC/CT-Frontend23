import { useEffect, useState, useCallback, useRef } from 'react'

import { Stack, Typography, Paper, Switch, CircularProgress, Box } from '@mui/material'
import isEqual from 'lodash/isEqual'

import { Label } from '@/components'
import { useSnackbar } from '@/components'
import { SkeletonCourseCardModal } from '@/components'
import { FilterMode, useFilters } from '@/hooks'
import {
  useGetAdminGlobalCoursesQuery,
  useUpdateAdminGlobalCourseInCatalogByOrgMutation,
} from '@/redux/services/admin/courses-admin'
import { ICourseSearchParams } from '@/redux/services/interfaces/courseUnits.interface'
import { useTranslate } from '@/utils/translateHelper'
import { IAdministration } from '@root/src/redux/services/interfaces/administration'

interface ICatalogTabProps {
  org?: IAdministration
}
type CourseToggleState = Record<string, boolean>

export const CatalogTab = ({ org }: ICatalogTabProps): React.ReactElement => {
  const { filters } = useFilters<ICourseSearchParams>(
    { name: '', school_id: '' },
    FilterMode.global
  )

  const { data: coursesData, isLoading } = useGetAdminGlobalCoursesQuery(filters)
  const [updateCourseInsideCatalog, { isLoading: isLoadingUpdate }] =
    useUpdateAdminGlobalCourseInCatalogByOrgMutation()
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const prevCoursesDataRef = useRef<any>()

  const [courseStates, setCourseStates] = useState<CourseToggleState>({})
  const [updatingCourseId, setUpdatingCourseId] = useState<string | null>(null)

  useEffect(() => {
    if (coursesData?.data) {
      const currentData = coursesData.data
      const prevData = prevCoursesDataRef.current

      if (!isEqual(prevData, currentData)) {
        const initialStates: CourseToggleState = {}
        currentData.forEach((course) => {
          initialStates[course.id] = !!course.is_show_in_catalog
        })
        setCourseStates(initialStates)
        prevCoursesDataRef.current = currentData
      }
    }
  }, [coursesData])

  const handleToggle = useCallback(
    async (courseId: string) => {
      const newValue = !courseStates[courseId]

      await setCourseStates((prev) => ({
        ...prev,
        [courseId]: newValue,
      }))
      setUpdatingCourseId(courseId)

      try {
        if (!org || !org.id) {
          throw new Error('Organization is not defined')
        }

        await updateCourseInsideCatalog({
          course_id: courseId,
          org_id: org?.id,
          is_show_in_catalog: newValue,
        }).unwrap()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to update course:', err)
        enqueueSnackbar(`Failed to update course: ${err}`, { variant: 'error' })

        // Rollback
        setCourseStates((prev) => ({
          ...prev,
          [courseId]: !newValue,
        }))
      } finally {
        setUpdatingCourseId(null)
      }
    },
    [courseStates, updateCourseInsideCatalog]
  )

  if (isLoading) return <SkeletonCourseCardModal />

  return (
    <Stack
      direction='column'
      height='100%'
      spacing={2}
    >
      {coursesData?.data?.length ? (
        coursesData.data.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.name}
            isGlobal={course.is_global}
            checked={courseStates[course.id] ?? false}
            isLoading={updatingCourseId === course.id && isLoadingUpdate}
            onToggle={handleToggle}
          />
        ))
      ) : (
        <Typography variant='body1'>{translate('No courses available')}</Typography>
      )}
    </Stack>
  )
}

interface CourseCardProps {
  id: string
  title: string
  isGlobal: boolean
  checked: boolean
  isLoading?: boolean
  onToggle: (id: string) => void
}

const CourseCard = ({
  id,
  title,
  isGlobal,
  checked,
  isLoading = false,
  onToggle,
}: CourseCardProps): React.ReactElement => {
  return (
    <Paper
      elevation={5}
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 3,
        padding: 2,
        width: '100%',
        opacity: isLoading ? 0.6 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      <Box
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: isLoading ? 'auto' : 'none',
          transition: 'opacity 0.5s ease',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={23} />
      </Box>
      <Stack
        direction='column'
        justifyContent='space-between'
        sx={{ width: '80%' }}
      >
        <Typography
          variant='body1'
          fontWeight='bold'
          sx={{ mb: 1 }}
        >
          {title}
        </Typography>
        {isGlobal && (
          <Label
            variant='soft'
            color='info'
            sx={{
              textTransform: 'uppercase',
              mr: 'auto',
            }}
          >
            Global
          </Label>
        )}
      </Stack>
      <Switch
        disabled={isLoading}
        checked={checked}
        onChange={() => onToggle(id)}
      />
    </Paper>
  )
}

export default CatalogTab
