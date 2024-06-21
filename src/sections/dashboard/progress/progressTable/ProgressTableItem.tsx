import { Checkbox, LinearProgress, TableCell, Tooltip } from '@mui/material'

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
          <div>
            {translate('student')}: {studentName}
            <br />
            {type}: {name}
            <br />
            {translate('progress')}:{' '}
            {hasNextLink ? `${Math.floor(progress)}%` : `${progress ? 'done' : 'not done'}`}
          </div>
        }
      >
        <div onClick={onClick}>
          {hasNextLink ? (
            <LinearProgress
              variant='determinate'
              value={progress}
              sx={{ height: '16px', width: '100%' }}
            />
          ) : (
            <Checkbox checked={!!progress} />
          )}
        </div>
      </Tooltip>
    </TableCell>
  )
}
