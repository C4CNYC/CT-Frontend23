import { Box, Button, Card, CardContent, Stack, Typography, useTheme } from '@mui/material'
import { FaCheck } from '@react-icons/all-files/fa6/FaCheck'
import { FaXmark } from '@react-icons/all-files/fa6/FaXmark'

import { useTranslate } from '@/utils/translateHelper'

export interface ImportError {
  email: string
  error: string
  student: {
    first_name: string
    last_name: string
  }
}

interface ImportSummaryProps {
  total: number
  success: number
  failed: number
  errors: ImportError[]
  onClose: () => void
}

export function ImportSummary({ total, success, failed, errors, onClose }: ImportSummaryProps) {
  const translate = useTranslate()
  const theme = useTheme()

  return (
    <Box>
      {/* Summary Cards */}
      <Stack
        direction='row'
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Card
          sx={{
            flex: 1,
            bgcolor: 'success.lighter',
            border: '1px solid',
            borderColor: 'success.light',
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Stack
              direction='row'
              alignItems='center'
              spacing={1}
            >
              <FaCheck
                size={24}
                color={theme.palette.success.main}
              />
              <Box>
                <Typography
                  variant='h4'
                  color='success.main'
                >
                  {success}
                </Typography>
                <Typography
                  variant='caption'
                  color='success.dark'
                >
                  {translate('import_csv_status_success')}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            bgcolor: failed > 0 ? 'error.lighter' : 'background.neutral',
            border: '1px solid',
            borderColor: failed > 0 ? 'error.light' : 'divider',
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Stack
              direction='row'
              alignItems='center'
              spacing={1}
            >
              <FaXmark
                size={24}
                color={theme.palette.error.main}
              />
              <Box>
                <Typography
                  variant='h4'
                  color={failed > 0 ? 'error.main' : 'text.secondary'}
                >
                  {failed}
                </Typography>
                <Typography
                  variant='caption'
                  color='text.secondary'
                >
                  {translate('import_csv_status_error')}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            bgcolor: 'background.neutral',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Stack
              direction='row'
              alignItems='center'
              spacing={1}
            >
              <Box>
                <Typography
                  variant='h4'
                  color='text.primary'
                >
                  {total}
                </Typography>
                <Typography
                  variant='caption'
                  color='text.secondary'
                >
                  Total
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* Summary Message */}
      <Typography
        variant='body1'
        sx={{
          mb: 2,
          textAlign: 'center',
          color: success === total ? 'success.main' : 'text.primary',
        }}
      >
        {translate('import_csv_summary', { success, failed })}
      </Typography>

      {/* Errors List */}
      {errors.length > 0 && (
        <Box
          sx={{
            maxHeight: 200,
            overflow: 'auto',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            mb: 3,
            bgcolor: 'background.paper',
          }}
        >
          <Box
            sx={{
              p: 1.5,
              bgcolor: 'error.lighter',
              fontWeight: 600,
              fontSize: '0.875rem',
              position: 'sticky',
              top: 0,
            }}
          >
            <Typography
              variant='caption'
              sx={{ fontWeight: 700 }}
            >
              {translate('import_csv_status_error')} ({errors.length})
            </Typography>
          </Box>
          {errors.map((err, index) => (
            <Box
              key={index}
              sx={{
                p: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
                fontSize: '0.875rem',
              }}
            >
              <Typography
                variant='body2'
                noWrap
              >
                <strong>
                  {err.student.first_name} {err.student.last_name}
                </strong>{' '}
                ({err.email})
              </Typography>
              <Typography
                variant='caption'
                color='error'
              >
                {err.error}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Actions */}
      <Stack
        direction='row'
        spacing={2}
        sx={{ justifyContent: 'center' }}
      >
        <Button
          variant='contained'
          onClick={onClose}
        >
          {translate('import_csv_done')}
        </Button>
      </Stack>
    </Box>
  )
}
