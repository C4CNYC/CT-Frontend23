import { HiOutlineLightBulb } from '@react-icons/all-files/hi2/HiOutlineLightBulb'
import { MdOutlineQuiz } from '@react-icons/all-files/md/MdOutlineQuiz'
import { TbPuzzle } from '@react-icons/all-files/tb/TbPuzzle'

const getIconType = (type: string) => {
  if (type === 'practical') {
    return TbPuzzle
  }

  if (type === 'exercise') {
    return HiOutlineLightBulb
  }

  return MdOutlineQuiz
}

export default function ProgressIcon({ type, isWrapped }: { type: string; isWrapped?: boolean }) {
  const Icon = getIconType(type)
  return isWrapped ? (
    <div
      style={{
        display: 'flex',
        backgroundColor:
          type === 'practical' ? '#0198ED' : type === 'exercise' ? '#155275' : '#FBDD3F',
        color: type === 'practical' ? '#FFF' : type === 'exercise' ? '#FFB960' : '#AE5EB7',
        width: 22,
        height: 22,
        lineHeight: 0,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon
        size='14'
        style={{ alignSelf: 'center' }}
      />
    </div>
  ) : (
    <Icon
      size='14'
      style={{ alignSelf: 'center' }}
    />
  )
}
