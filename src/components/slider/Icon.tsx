import { ReactNode } from 'react'

import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward'

interface Props {
  icon?: ReactNode // Right icon
}

export function LeftIcon({ icon }: Props): React.ReactElement {
  return icon ? (
    <>{icon}</>
  ) : (
    <IoIosArrowForward
      style={{
        width: 20,
        height: 20,
        transform: ' scaleX(-1)',
      }}
    />
  )
}

export function RightIcon({ icon }: Props): React.ReactElement {
  return icon ? (
    <>{icon}</>
  ) : (
    <IoIosArrowForward
      style={{
        width: 20,
        height: 20,
        transform: ' scaleX(-1)',
      }}
    />
  )
}
