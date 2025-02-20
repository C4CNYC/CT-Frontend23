import { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Stack } from '@mui/system'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'
import { IoAddCircleOutline } from '@react-icons/all-files/io5/IoAddCircleOutline'
import { MdOutlineModeEdit } from '@react-icons/all-files/md/MdOutlineModeEdit'
import { format } from 'date-fns'
import { useSnackbar } from 'notistack'

import {
  useGetLessonContentValidationsManagerQuery,
  useRemoveLessonContentValiationManagerMutation,
} from '@/redux/services/manager/lesson-content-validation-manager'
import { useTranslate } from '@/utils/translateHelper'

import CreateEditValidation from './CreateEditValidation'

const RECOMENDED_COUNT_VALIDATION = 3

interface Props {
  children?: React.ReactElement
  stepTitle: string
  stepId: string
  setHasValidation: (has: boolean) => void
}

export default function Validation({
  children,
  stepTitle,
  stepId,
  setHasValidation,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpenDialog] = useState<boolean>(false)
  const translate = useTranslate()

  const [removeRule] = useRemoveLessonContentValiationManagerMutation()
  const { data, isLoading } = useGetLessonContentValidationsManagerQuery({
    id: stepId,
  })

  const sortedData = new Array(...(data || []))?.sort((a, b) => {
    const aDate = new Date(a.createdAt)
    const bDate = new Date(b.createdAt)
    return aDate.getTime() - bDate.getTime()
  })

  const onDeleteRule = async (id: string): Promise<void> => {
    try {
      await removeRule({ contentId: stepId, id }).unwrap()
      enqueueSnackbar(translate('validation_removed'))
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  useEffect(() => {
    if (data?.length) {
      setHasValidation(true)
    }
  }, [data])
  return (
    <>
      <Box
        onClick={() => {
          setOpenDialog(true)
        }}
        title='Validation Rules'
      >
        {children}
      </Box>
      <Dialog
        fullWidth
        maxWidth='md'
        open={open}
        onClose={() => {
          setOpenDialog(false)
        }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='flex-end'
        >
          <DialogTitle
            variant='h5'
            sx={{ pb: 1, pt: 2 }}
          >
            {translate('validation_rules')}
          </DialogTitle>
          <IconButton
            onClick={() => {
              setOpenDialog(false)
            }}
            sx={{ mb: '5px', mr: '14px' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 3 }}>
          {data?.length && data?.length >= RECOMENDED_COUNT_VALIDATION ? (
            <Alert
              sx={{ mb: '30px' }}
              severity='warning'
            >
              {translate('not_recommend_count_validations', {
                count: RECOMENDED_COUNT_VALIDATION,
              })}
            </Alert>
          ) : null}
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 0 }}
          >
            <Table
              sx={{ minWidth: 700 }}
              aria-label='customized table'
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align='left'>{translate('rule')}</StyledTableCell>
                  <StyledTableCell align='left'>{translate('regex')}</StyledTableCell>
                  <StyledTableCell align='left'>{translate('profile_created_at')}</StyledTableCell>
                  <StyledTableCell align='left'>{translate('updated_at')}</StyledTableCell>
                  <StyledTableCell align='left'></StyledTableCell>
                </TableRow>
              </TableHead>
              {isLoading ? (
                <TableRow>
                  <TableCell>
                    <Skeleton
                      width='100%'
                      height='50px'
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      width='100%'
                      height='50px'
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      width='100%'
                      height='50px'
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      width='100%'
                      height='50px'
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  <TableBody>
                    {sortedData?.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell
                          align='left'
                          component='th'
                          scope='row'
                        >
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align='left'>{row.regex}</StyledTableCell>
                        <StyledTableCell align='left'>
                          {format(new Date(row.createdAt), 'dd/MM/yyyy')}
                        </StyledTableCell>
                        <StyledTableCell align='left'>
                          {format(new Date(row.updatedAt), 'dd/MM/yyyy')}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ display: 'flex' }}
                          align='left'
                        >
                          <CreateEditValidation
                            stepId={stepId}
                            id={row.id}
                            defaultValues={{
                              name: row.name,
                              regex: row.regex,
                            }}
                          >
                            <IconButton>
                              <MdOutlineModeEdit />
                            </IconButton>
                          </CreateEditValidation>
                          <IconButton
                            sx={{ ml: 1 }}
                            color='error'
                            onClick={async () => {
                              await onDeleteRule(row.id)
                            }}
                          >
                            <FiTrash2 />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                    {!data?.length ? (
                      <TableRow>
                        <TableCell>{translate('no_rules')}</TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </>
              )}
            </Table>
            <Stack
              direction='row-reverse'
              mt='25px'
            >
              <CreateEditValidation stepId={stepId}>
                <Button
                  variant='contained'
                  sx={{ gap: 1 }}
                >
                  {translate('add_rule')}
                  <IoAddCircleOutline />
                </Button>
              </CreateEditValidation>
            </Stack>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
