import { ReactNode } from 'react'

import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward'

interface Props {
  icon?: ReactNode
}

export function LeftIcon({ icon }: Props): React.ReactElement | null {
  return (
    <>
      {icon ? (
        icon
      ) : (
        <IoIosArrowForward
          style={{ transform: ' scaleX(-1)' }}
          size={20}
        />
      )}
    </>
  )
}

export function RightIcon({
  icon = 'eva:arrow-ios-forward-fill',
}: Props): React.ReactElement | null {
  return <>{icon ? icon : <IoIosArrowForward size={20} />}</>
}
