import { Box, Chip, Tooltip, Typography } from '@mui/material'
import { FaCheck } from '@react-icons/all-files/fa6/FaCheck'
import { FaXmark } from '@react-icons/all-files/fa6/FaXmark'
import { VscLoading } from '@react-icons/all-files/vsc/VscLoading'

import { useTranslate } from '@/utils/translateHelper'

export interface ImportStudentStatus {
  email: string
  first_name: string
  last_name: string
  username?: string
  status: 'pending' | 'importing' | 'success' | 'error'
  error?: string
}

interface ImportProgressListProps {
  students: ImportStudentStatus[]
}

export function ImportProgressList({ students }: ImportProgressListProps) {
  const translate = useTranslate()

  const getStatusChip = (status: ImportStudentStatus['status'], error?: string) => {
    switch (status) {
      case 'pending':
        return (
          <Chip
            size='small'
            label={translate('import_csv_status_pending')}
            sx={{ bgcolor: 'grey.100', color: 'grey.500' }}
          />
        )
      case 'importing':
        return (
          <Chip
            size='small'
            icon={
              <VscLoading
                className='spin'
                size={14}
              />
            }
            label={translate('import_csv_status_importing')}
            sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}
          />
        )
      case 'success':
        return (
          <Chip
            size='small'
            icon={<FaCheck size={12} />}
            label={translate('import_csv_status_success')}
            sx={{ bgcolor: 'success.lighter', color: 'success.main' }}
          />
        )
      case 'error':
        return (
          <Tooltip
            title={error || translate('import_csv_status_error')}
            arrow
          >
            <Chip
              size='small'
              icon={<FaXmark size={12} />}
              label={translate('import_csv_status_error')}
              sx={{ bgcolor: 'error.lighter', color: 'error.main', cursor: 'help' }}
            />
          </Tooltip>
        )
      default:
        return null
    }
  }

  return (
    <Box
      sx={{
        maxHeight: 400,
        overflow: 'auto',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '50px 1fr 1fr 1fr 120px',
          p: 1.5,
          bgcolor: 'background.neutral',
          fontWeight: 600,
          fontSize: '0.875rem',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <Typography
          variant='caption'
          sx={{ fontWeight: 700 }}
        >
          #
        </Typography>
        <Typography
          variant='caption'
          sx={{ fontWeight: 700 }}
        >
          {translate('email')}
        </Typography>
        <Typography
          variant='caption'
          sx={{ fontWeight: 700 }}
        >
          {translate('first_name')}
        </Typography>
        <Typography
          variant='caption'
          sx={{ fontWeight: 700 }}
        >
          {translate('last_name')}
        </Typography>
        <Typography
          variant='caption'
          sx={{ fontWeight: 700 }}
        >
          {translate('status')}
        </Typography>
      </Box>

      {students.map((student, index) => (
        <Box
          key={student.email}
          sx={{
            display: 'grid',
            gridTemplateColumns: '50px 1fr 1fr 1fr 120px',
            p: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            alignItems: 'center',
            fontSize: '0.875rem',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Typography
            variant='body2'
            sx={{ color: 'text.secondary' }}
          >
            {index + 1}
          </Typography>
          <Typography
            variant='body2'
            noWrap
            sx={{ pr: 1 }}
          >
            {student.email}
          </Typography>
          <Typography
            variant='body2'
            noWrap
          >
            {student.first_name}
          </Typography>
          <Typography
            variant='body2'
            noWrap
          >
            {student.last_name}
          </Typography>
          {getStatusChip(student.status, student.error)}
        </Box>
      ))}

      {students.length === 0 && (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          <Typography variant='body2'>{translate('import_csv_error_no_data')}</Typography>
        </Box>
      )}
    </Box>
  )
}
