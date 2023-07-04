import { Image, useSnackbar } from "@ct-nx/components";
import { Box, IconButton } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Rating } from "react-simple-star-rating";
import { ICourseElement } from "src/redux/interfaces/content.interface";
import { APIError } from "src/redux/interfaces/custom-error.interface";
import {
  useCourseAddLikeMutation,
  useCourseAddRatingMutation,
  useCourseRemoveLikeMutation,
} from "src/redux/services/student/courses-manager";
interface Props {
  course: ICourseElement;
}

export default function CourseAvatar({ course }: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [addLike, { isLoading }] = useCourseAddLikeMutation();
  const [removeLike, { isLoading: isRemoving }] = useCourseRemoveLikeMutation();
  const [updateRating] = useCourseAddRatingMutation();
  const likeHandler = async (): Promise<void> => {
    try {
      if (course.liked) {
        removeLike({ id: course.id }).unwrap();
        enqueueSnackbar("Like removed!");
      } else {
        addLike({ id: course.id }).unwrap();
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
        <IconButton
          onClick={likeHandler}
          disabled={isLoading || isRemoving}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "40px",
            height: "40px",
            zIndex: "10",
            opacity: 0.5,
            background: "rgba(250, 250, 250, .5)",
            "&:hover": { opacity: 1 },
          }}
        >
          {!course.liked ? (
            <AiOutlineHeart size={26} color="#EE467A" />
          ) : (
            <AiFillHeart size={26} color="#EE467A" />
          )}
        </IconButton>
        <Image
          alt="course cover"
          src={course.cover ?? "/assets/courses/tiger.png"}
          sx={{
            objectFit: "contain",
            borderRadius: "25px",
            flexShrink: 0,
            width: {
              xs: "200px",
              sm: "180px",
              md: "250px",
            },
            height: {
              xs: "200px",
              sm: "180px",
              md: "250px",
            },
          }}
        />
        {course.progress && course.progress > 30 && (
          <Box
            sx={{
              position: "absolute",
              bottom: "0px",
              left: "calc(50% - 75px)",
              zIndex: "10",
              opacity: 0.5,
              width: {
                xs: "180px",
                sm: "160px",
                md: "125px",
              },
              "&:hover": { opacity: 1 },
            }}
          >
            <Rating
              onClick={handleRating}
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
