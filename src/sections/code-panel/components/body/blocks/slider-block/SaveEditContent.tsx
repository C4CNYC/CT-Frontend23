import { Tooltip } from '@mui/material'
import { IoStatsChart } from '@react-icons/all-files/io5/IoStatsChart'
import { LuPenLine } from '@react-icons/all-files/lu/LuPenLine'
import { MdEmojiEmotions } from '@react-icons/all-files/md/MdEmojiEmotions'
import { MdImage } from '@react-icons/all-files/md/MdImage'
import { MdVideocam } from '@react-icons/all-files/md/MdVideocam'

import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'

import { SaveEditContentStyles } from './SaveEditContentStyles'

export function SaveEditContent({}: any) {
  const lessonManager = useLessonManager()
  if (!lessonManager.userIsOwner) return null

  return (
    <>
      <style> {SaveEditContentStyles} </style>
      <div className='SaveEditContent'>
        <div>
          <div>
            <div className='SECLeft'>
              <Tooltip title={'Advance Lesson Editor'}>
                <a
                  href={
                    STUDENT_PATH_DASHBOARD.myLessons +
                    `?lessonId=${lessonManager.lesson?.id}&stepId=${lessonManager.currentSlideId}`
                  }
                  target='_blank'
                >
                  <IoStatsChart size={20} />
                </a>
              </Tooltip>
              <div className='SECDiv'></div>
              <Tooltip title={'Add Image from Gallery'}>
                <a href={`#`}>
                  <MdImage size={24} />
                </a>
              </Tooltip>

              <Tooltip title={'You can paste video from youtube'}>
                <a href={`#`}>
                  <MdVideocam size={24} />
                </a>
              </Tooltip>

              <Tooltip title={'You will add Emoji'}>
                <a href={`#`}>
                  <MdEmojiEmotions size={24} />
                </a>
              </Tooltip>
              <div className='SECDiv'></div>
              {lessonManager.currentSlideUpdated ? (
                <a
                  onClick={lessonManager.saveSlideDB}
                  className='editableLink'
                >
                  <LuPenLine size={24} />
                  Save
                </a>
              ) : (
                <span className='editableText'>Editable</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
