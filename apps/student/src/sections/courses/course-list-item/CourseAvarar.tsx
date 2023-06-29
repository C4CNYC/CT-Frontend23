import { Image, useSnackbar } from "@ct-nx/components";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Rating } from "react-simple-star-rating";
import {
  useCourseAddLikeMutation,
  useCourseRemoveLikeMutation,
} from "src/redux/services/student/courses-manager";
interface Props {
  cover: string | null;
  courseId: string;
  progress?: number;
}

export default function CourseAvatar({
  cover,
  courseId,
  progress,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [addLike, { isLoading }] = useCourseAddLikeMutation();
  const [removeLike, { isLoading: isRemoving }] = useCourseRemoveLikeMutation();

  const likeHandler = async (): Promise<void> => {
    try {
      if (isLiked) {
        removeLike({ id: courseId }).unwrap();
        enqueueSnackbar("Like removed!");
        setIsLiked(false);
      } else {
        addLike({ id: courseId }).unwrap();
        enqueueSnackbar("Liked!");
        setIsLiked(true);
      }
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
  };

  const handleRating = (rate: number): void => {
    // rate starts from 0
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
          {!isLiked ? (
            <AiOutlineHeart size={26} color="#EE467A" />
          ) : (
            <AiFillHeart size={26} color="#EE467A" />
          )}
        </IconButton>
        <Image
          src={cover || "/assets/courses/tiger.png"}
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
        {progress && progress > 30 && (
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
              initialValue={0}
              transition
              allowFraction
              size={30}
            />
          </Box>
        )}
      </Box>
    </>
  );
}
