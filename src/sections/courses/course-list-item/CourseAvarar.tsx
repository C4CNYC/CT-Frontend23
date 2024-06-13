import { useEffect, useState } from 'react'

import { Box, IconButton, Rating } from '@mui/material'
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart'
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart'

import { Image, useSnackbar } from '@/components'
import { ICourseElement } from '@/redux/interfaces/content.interface'
import { APIError } from '@/redux/interfaces/custom-error.interface'
import {
  useCourseAddLikeMutation,
  useCourseAddRatingMutation,
  useCourseRemoveLikeMutation,
} from '@/redux/services/manager/courses-student'

import { COURSE_IMG_XS, COURSE_RATING_WRAPPER_SX, LIKE_BTN_WRAPPER_SX } from './constants'

interface Props {
  course: ICourseElement
}

export default function CourseAvatar({ course }: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar()
  const [liked, setLiked] = useState(course.liked)
  const [rating, setRating] = useState<number>(course.my_rating ?? 0)
  const [addLike, { isLoading }] = useCourseAddLikeMutation()
  const [removeLike, { isLoading: isRemoving }] = useCourseRemoveLikeMutation()
  const [updateRating] = useCourseAddRatingMutation()

  useEffect(() => {
    setRating(course.my_rating ?? 0)
  }, [course])

  const likeHandler = async (): Promise<void> => {
    try {
      if (liked) {
        removeLike({ id: course.id }).unwrap()
        setLiked(false)
        enqueueSnackbar('Like removed!')
      } else {
        addLike({ id: course.id }).unwrap()
        setLiked(true)
        enqueueSnackbar('Liked!')
      }
    } catch (error: any) {
      const typedError = error as APIError
      enqueueSnackbar(typedError?.data?.message, {
        variant: 'error',
      })
    }
  }

  const handleRating = (rating: number): void => {
    try {
      updateRating({ id: course.id, rating }).unwrap()
      enqueueSnackbar('You rated course!')
    } catch (error: any) {
      const typedError = error as APIError
      enqueueSnackbar(typedError?.data?.message, {
        variant: 'error',
      })
    }
  }

  return (
    <>
      <Box sx={{ position: 'relative', alignSelf: 'center' }}>
        <Box sx={LIKE_BTN_WRAPPER_SX}>
          <IconButton
            onClick={likeHandler}
            disabled={isLoading || isRemoving}
          >
            {!liked ? (
              <AiOutlineHeart
                size={26}
                color='#EE467A'
              />
            ) : (
              <AiFillHeart
                size={26}
                color='#EE467A'
              />
            )}
          </IconButton>
        </Box>
        <Image
          alt='course cover'
          src={course.cover ?? '/assets/courses/courseImg.png'}
          sx={COURSE_IMG_XS}
        />
        {course.progress && course.progress > 30 && (
          <Box sx={COURSE_RATING_WRAPPER_SX}>
            <Rating
              onChange={(e, rating) => {
                setRating(rating ?? 0)
                handleRating(rating ?? 0)
              }}
              defaultValue={0}
              value={rating}
            />
          </Box>
        )}
      </Box>
    </>
  )
}
