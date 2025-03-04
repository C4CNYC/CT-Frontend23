import { Checkbox, LinearProgress, TableCell, Tooltip, Typography } from '@mui/material'

import { useTranslate } from '@root/src/utils/translateHelper'

interface IProgressTableItem {
  studentName: string
  type: string
  name: string
  progress: number
  hasNextLink?: boolean
  onClick: () => void
}

export default function TableItemProgress({
  studentName,
  type,
  name,
  progress,
  hasNextLink = true,
  onClick,
}: IProgressTableItem) {
  const translate = useTranslate()

  return (
    <TableCell size='small'>
      <Tooltip
        placement='top'
        title={
          <Typography variant='caption'>
            {translate('student')}: {studentName}
            <br />
            <Typography
              variant='caption'
              textTransform='capitalize'
            >
              {type}:
            </Typography>
            {name}
            <br />
            {translate('progress')}:{' '}
            {hasNextLink ? `${Math.floor(progress)}%` : `${progress ? 'done' : 'not done'}`}
          </Typography>
        }
      >
        <div onClick={onClick}>
          {hasNextLink ? (
            <LinearProgress
              variant='determinate'
              value={progress}
              sx={{ height: '16px', width: '100%', '&:hover': { cursor: 'pointer' } }}
            />
          ) : (
            <Checkbox checked={!!progress} />
          )}
        </div>
      </Tooltip>
    </TableCell>
  )
}
