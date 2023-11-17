import { useState } from "react";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Rating } from "react-simple-star-rating";

import { Box, IconButton } from "@mui/material";

import { Image, useSnackbar } from "@components";
import { ICourseElement } from "src/redux/interfaces/content.interface";
import { APIError } from "src/redux/interfaces/custom-error.interface";
import {
  useCourseAddLikeMutation,
  useCourseAddRatingMutation,
  useCourseRemoveLikeMutation,
} from "src/redux/services/manager/courses-student";

import {
  COURSE_IMG_XS,
  COURSE_RATING_WRAPPER_SX,
  LIKE_BTN_WRAPPER_SX,
} from "./constants";

interface Props {
  course: ICourseElement;
}

export default function CourseAvatar({ course }: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [liked, setLiked] = useState(course.liked);
  const [addLike, { isLoading }] = useCourseAddLikeMutation();
  const [removeLike, { isLoading: isRemoving }] = useCourseRemoveLikeMutation();
  const [updateRating] = useCourseAddRatingMutation();
  const likeHandler = async (): Promise<void> => {
    try {
      if (liked) {
        removeLike({ id: course.id }).unwrap();
        setLiked(false);
        enqueueSnackbar("Like removed!");
      } else {
        addLike({ id: course.id }).unwrap();
        setLiked(true);
        enqueueSnackbar("Liked!");
      }
    } catch (error) {
      const typedError = error as APIError;
      enqueueSnackbar(typedError?.data?.message, {
        variant: "error",
      });
    }
  };

  const handleRating = (rating: number): void => {
    try {
      updateRating({ id: course.id, rating }).unwrap();
      enqueueSnackbar("You rated course!");
    } catch (error) {
      const typedError = error as APIError;
      enqueueSnackbar(typedError?.data?.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Box sx={{ position: "relative", alignSelf: "center" }}>
        <Box
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          sx={LIKE_BTN_WRAPPER_SX}
        >
          <IconButton onClick={likeHandler} disabled={isLoading || isRemoving}>
            {!liked ? (
              <AiOutlineHeart size={26} color="#EE467A" />
            ) : (
              <AiFillHeart size={26} color="#EE467A" />
            )}
          </IconButton>
        </Box>
        <Image
          alt="course cover"
          src={course.cover ?? "/assets/courses/courseImg.png"}
          sx={COURSE_IMG_XS}
        />
        {course.progress && course.progress > 30 && (
          <Box sx={COURSE_RATING_WRAPPER_SX}>
            <Rating
              onClick={(rating, index, e) => {
                e?.stopPropagation();
                e?.preventDefault();
                handleRating(rating);
              }}
              initialValue={course.my_rating ?? 0}
              transition
              size={30}
            />
          </Box>
        )}
      </Box>
    </>
  );
}
