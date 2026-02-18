import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { FiDownload } from '@react-icons/all-files/fi/FiDownload'
import { IoClose } from '@react-icons/all-files/io5/IoClose'
import { useDropzone } from 'react-dropzone'

import {
  useCreateStudentMutation,
  useStudentJoinClassMutation,
} from '@/redux/services/manager/students-manager'
import { parseCSV, type ParsedStudent } from '@/utils/csvParser'
import { useSchoolId } from '@root/src/hooks/useSchoolId'
import { useTranslate } from '@root/src/utils/translateHelper'

import { useSnackbar } from '../snackbar'

import { ImportProgressList, type ImportStudentStatus } from './ImportProgressList'
import { ImportSummary } from './ImportSummary'

interface IStudentImportModalProps {
  children: React.ReactElement
  classId: string
}

type ImportStep = 'upload' | 'preview' | 'importing' | 'summary'
type UploadTab = 'file' | 'paste'

export default function StudentImportModal({ children, classId }: IStudentImportModalProps) {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const schoolId = useSchoolId()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<ImportStep>('upload')
  const [uploadTab, setUploadTab] = useState<UploadTab>('file')
  const [file, setFile] = useState<File | null>(null)
  const [pastedData, setPastedData] = useState('')
  const [parsedStudents, setParsedStudents] = useState<ParsedStudent[]>([])
  const [importStatus, setImportStatus] = useState<ImportStudentStatus[]>([])
  const [importResult, setImportResult] = useState<{
    total: number
    success: number
    failed: number
    errors: Array<{
      email: string
      error: string
      student: { first_name: string; last_name: string }
    }>
  } | null>(null)

  const [createStudent] = useCreateStudentMutation()
  const [studentJoinClass] = useStudentJoinClassMutation()

  // Reset state when modal closes
  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setStep('upload')
      setUploadTab('file')
      setFile(null)
      setPastedData('')
      setParsedStudents([])
      setImportStatus([])
      setImportResult(null)
    }, 300)
  }

  const handleOpen = () => setOpen(true)

  // Download example CSV
  const handleDownloadExample = () => {
    const exampleContent =
      'email,firstname,lastname,username\njohn.doe@example.com,John,Doe,johndoe1234\njane.smith@example.com,Jane,Smith,janesmith5678\nbob.wilson@example.com,Bob,Wilson,bobwilson9012'
    const blob = new Blob([exampleContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'students_example.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Parse pasted CSV data
  const handleParsePastedData = () => {
    if (!pastedData.trim()) return

    // Create a fake File object from pasted data
    const blob = new Blob([pastedData], { type: 'text/csv' })
    const fakeFile = new File([blob], 'pasted_data.csv', { type: 'text/csv' })
    setFile(fakeFile)

    try {
      parseCSV(fakeFile)
        .then((result) => {
          if (result.validCount === 0) {
            enqueueSnackbar(translate('import_csv_error_no_data'), { variant: 'error' })
            setFile(null)
            return
          }

          setParsedStudents(result.students)

          const validStudents = result.students.filter((s) => s.valid)
          setImportStatus(
            validStudents.map((s) => ({
              email: s.email,
              first_name: s.first_name,
              last_name: s.last_name,
              username: s.username,
              status: 'pending' as const,
            }))
          )

          setStep('preview')
        })
        .catch((error: any) => {
          enqueueSnackbar(error.message || translate('import_csv_error_invalid_file'), {
            variant: 'error',
          })
          setFile(null)
        })
    } catch (error: any) {
      enqueueSnackbar(error.message || translate('import_csv_error_invalid_file'), {
        variant: 'error',
      })
    }
  }

  // File drop handling
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'text/tab-separated-values': ['.tsv', '.txt'],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return

      const selectedFile = acceptedFiles[0]
      setFile(selectedFile)

      try {
        const result = await parseCSV(selectedFile)

        if (result.validCount === 0) {
          enqueueSnackbar(translate('import_csv_error_no_data'), { variant: 'error' })
          setFile(null)
          return
        }

        setParsedStudents(result.students)

        // Initialize import status for valid students only
        const validStudents = result.students.filter((s) => s.valid)
        setImportStatus(
          validStudents.map((s) => ({
            email: s.email,
            first_name: s.first_name,
            last_name: s.last_name,
            username: s.username,
            status: 'pending' as const,
          }))
        )

        setStep('preview')
      } catch (error: any) {
        enqueueSnackbar(error.message || translate('import_csv_error_invalid_file'), {
          variant: 'error',
        })
        setFile(null)
      }
    },
  })

  const handleRemoveFile = () => {
    setFile(null)
    setParsedStudents([])
  }

  const handleBackToUpload = () => {
    setStep('upload')
    setFile(null)
    setPastedData('')
    setParsedStudents([])
  }

  // Import students one by one with progress updates
  const handleStartImport = async () => {
    setStep('importing')

    const validStudents = parsedStudents.filter((s) => s.valid)
    const results: typeof importResult = {
      total: validStudents.length,
      success: 0,
      failed: 0,
      errors: [],
    }

    // Process students sequentially
    for (let i = 0; i < validStudents.length; i++) {
      const student = validStudents[i]

      // Update status to importing
      setImportStatus((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'importing' as const } : s))
      )

      try {
        // Step 1: Create student with all details
        const createdStudent = await createStudent({
          schoolId,
          email: student.email,
          first_name: student.first_name,
          last_name: student.last_name,
          username: student.username,
          password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
          role: 'student' as const,
        }).unwrap()

        // Step 2: Add student to class
        await studentJoinClass({
          classId: classId,
          student_id: createdStudent.id,
        }).unwrap()

        // Update status to success
        setImportStatus((prev) =>
          prev.map((s, idx) => (idx === i ? { ...s, status: 'success' as const } : s))
        )

        results.success++
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || error?.message || translate('import_csv_status_error')

        // Update status to error
        setImportStatus((prev) =>
          prev.map((s, idx) =>
            idx === i ? { ...s, status: 'error' as const, error: errorMessage } : s
          )
        )

        results.failed++
        results.errors.push({
          email: student.email,
          error: errorMessage,
          student: { first_name: student.first_name, last_name: student.last_name },
        })
      }
    }

    setImportResult(results)
    setStep('summary')

    if (results.failed === 0) {
      enqueueSnackbar(translate('import_csv_success'), { variant: 'success' })
    } else {
      enqueueSnackbar(
        translate('import_csv_summary', { success: results.success, failed: results.failed }),
        { variant: 'warning' }
      )
    }
  }

  // Render upload step
  const renderUpload = () => (
    <Box>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: 2 }}
      >
        <Typography variant='h6'>{translate('import_csv_title')}</Typography>
        <Button
          size='small'
          startIcon={<FiDownload size={14} />}
          onClick={handleDownloadExample}
          variant='outlined'
        >
          {translate('actions_download')} CSV
        </Button>
      </Stack>

      <Typography
        variant='body2'
        sx={{ mb: 2, color: 'text.secondary' }}
      >
        {translate('import_csv_instructions')}
      </Typography>

      <Tabs
        value={uploadTab}
        onChange={(_, newValue) => setUploadTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab
          label={translate('import_csv_tab_file')}
          value='file'
        />
        <Tab
          label={translate('import_csv_tab_paste')}
          value='paste'
        />
      </Tabs>

      {uploadTab === 'file' && (
        <>
          {!file ? (
            <Box
              {...getRootProps()}
              sx={{
                border: '2px dashed',
                borderColor: isDragActive ? 'primary.main' : 'grey.300',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: isDragActive ? 'action.hover' : 'transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'action.hover',
                  borderColor: 'primary.main',
                },
              }}
            >
              <input {...getInputProps()} />
              <Typography
                variant='body1'
                sx={{ mb: 1 }}
              >
                {isDragActive
                  ? translate('import_csv_drag_drop')
                  : translate('import_csv_drag_drop')}
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
              >
                {translate('import_csv_browse')}
              </Typography>
              <Typography
                variant='caption'
                display='block'
                color='text.secondary'
                sx={{ mt: 1 }}
              >
                {translate('import_csv_supported_formats')}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 2,
                p: 2,
                bgcolor: 'primary.lighter',
              }}
            >
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='body2'>
                  {translate('import_csv_selected_file')}: {file.name}
                </Typography>
                <Button
                  size='small'
                  color='error'
                  onClick={handleRemoveFile}
                >
                  {translate('import_csv_remove')}
                </Button>
              </Stack>
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{ mt: 1, display: 'block' }}
              >
                {(file.size / 1024).toFixed(2)} KB
              </Typography>
            </Box>
          )}
        </>
      )}

      {uploadTab === 'paste' && (
        <Box>
          <TextField
            multiline
            rows={8}
            fullWidth
            placeholder={`email,firstname,lastname,username\njohn.doe@example.com,John,Doe\njane.smith@example.com,Jane,Smith,janesmith`}
            value={pastedData}
            onChange={(e) => setPastedData(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              },
            }}
          />
          <Stack
            direction='row'
            spacing={2}
            sx={{ mt: 2, justifyContent: 'flex-end' }}
          >
            <Button
              onClick={() => setPastedData('')}
              disabled={!pastedData}
            >
              {translate('actions_clear')}
            </Button>
            <Button
              variant='contained'
              onClick={handleParsePastedData}
              disabled={!pastedData.trim()}
            >
              {translate('actions_import')}
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  )

  // Render preview step
  const renderPreview = () => (
    <Box>
      <Typography
        variant='h6'
        sx={{ mb: 1 }}
      >
        {translate('import_csv_preview_title', {
          count: parsedStudents.filter((s) => s.valid).length,
        })}
      </Typography>

      <ImportProgressList
        students={parsedStudents.map((s) => ({
          email: s.email,
          first_name: s.first_name,
          last_name: s.last_name,
          username: s.username,
          status: s.valid ? 'pending' : 'error',
          error: s.errors?.join(', '),
        }))}
      />

      {parsedStudents.some((s) => !s.valid) && (
        <Typography
          variant='caption'
          color='error'
          sx={{ mt: 1, display: 'block' }}
        >
          {translate('import_csv_error_missing_columns')}
        </Typography>
      )}
    </Box>
  )

  // Render importing step
  const renderImporting = () => (
    <Box>
      <Typography
        variant='h6'
        sx={{ mb: 2, textAlign: 'center' }}
      >
        {translate('import_csv_importing')}
      </Typography>

      <LinearProgress
        sx={{
          mb: 2,
          height: 8,
          borderRadius: 1,
        }}
      />

      <ImportProgressList students={importStatus} />
    </Box>
  )

  // Render summary step
  const renderSummary = () =>
    importResult ? (
      <ImportSummary
        total={importResult.total}
        success={importResult.success}
        failed={importResult.failed}
        errors={importResult.errors}
        onClose={handleClose}
      />
    ) : null

  return (
    <>
      <Box onClick={handleOpen}>{children}</Box>

      <Dialog
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: '80vh',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            p: 1,
          }}
        >
          <IconButton onClick={handleClose}>
            <IoClose size={20} />
          </IconButton>
        </Box>

        <DialogContent sx={{ pb: 3 }}>
          {step === 'upload' && renderUpload()}
          {step === 'preview' && renderPreview()}
          {step === 'importing' && renderImporting()}
          {step === 'summary' && renderSummary()}

          {/* Action buttons */}
          {step !== 'summary' && (
            <Stack
              direction='row'
              spacing={2}
              sx={{ mt: 3, justifyContent: 'flex-end' }}
            >
              {step === 'preview' && (
                <Button
                  variant='outlined'
                  onClick={handleBackToUpload}
                >
                  {translate('import_csv_back')}
                </Button>
              )}

              {step === 'upload' && (
                <Button
                  variant='outlined'
                  onClick={handleClose}
                >
                  {translate('import_csv_close')}
                </Button>
              )}

              {step === 'preview' && (
                <LoadingButton
                  variant='contained'
                  onClick={handleStartImport}
                  disabled={parsedStudents.filter((s) => s.valid).length === 0}
                >
                  {translate('import_csv_import')}
                </LoadingButton>
              )}
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
