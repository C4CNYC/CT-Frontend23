import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import * as _ from "lodash";
import { Paper, Typography, Box, Stack, Tooltip } from "@mui/material";

import NextImage from "next/image";
import Image from "@components/image";
import AssignmentsDetails from "./details/AssignmentsDetails";
import { AssignmentTypes } from "src/redux/services/enums/assignment-types.enum";
import { AssignmentComplexity } from "src/redux/services/enums/assignment-complexity.enum";
import { convertDuration } from "src/utils/convertDuration";
import { IAssignmentsCard } from "../../../@types/assignments";

// ----------------------------------------------------------------------

interface Props {
  index: number;
  card: IAssignmentsCard;
  onDeleteTask: (id: string) => void;
  school_id: string;
};

const ImageCardType: Record<string, string> = {
  [AssignmentTypes.REVIEW]: "/assets/assignment/code-review.svg",
  [AssignmentTypes.CODING_IDEA]: "/assets/assignment/code-idea.svg",
  [AssignmentTypes.CODING_PROJECT]: "/assets/assignment/project.svg",
  [AssignmentTypes.CODING_SNIPETS]: "/assets/assignment/snipets.svg",
  [AssignmentTypes.GROUP_CODING_PROJECT]: "/assets/assignment/group-share.svg",
  [AssignmentTypes.PEER_PREVIEW]: "/assets/assignment/review.svg",
  [AssignmentTypes.RESEARCH]: "/assets/assignment/research.svg",
};

const IconComplexity: Record<string, string> = {
  [AssignmentComplexity.High]: "/assets/assignment/high-priority.svg",
  [AssignmentComplexity.Medium]: "/assets/assignment/medium-priority.svg",
  [AssignmentComplexity.Low]: "/assets/assignment/low-priority.svg",
};

export default function AssignmentsTaskCard({
  card,
  onDeleteTask,
  index,
  school_id
}:
Props): React.ReactElement | null {
  const { name, type, duration, complexity } = card;

  const [completed] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetails = (): void => {
    setOpenDetails(true);
  };

  const handleCloseDetails = (): void => {
    setOpenDetails(false);
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            sx={{
              width: 1,
              borderRadius: 1,
              overflow: "hidden",
              position: "relative",
              boxShadow: (theme) => theme.customShadows.z1,
              "&:hover": {
                boxShadow: (theme) => theme.customShadows.z20,
              },
            }}
          >
            <Box onClick={handleOpenDetails} sx={{ cursor: "pointer" }}>
              <Image
                disabledEffect
                alt={type}
                src={ImageCardType[type]}
                // ratio="4/3"
                sx={{
                  width: "40px",
                  height: "40px",
                  m: 3,
                  ml: 2,
                  marginBottom: 0,
                  transition: (theme) =>
                    theme.transitions.create("opacity", {
                      duration: theme.transitions.duration.shortest,
                    }),
                  ...(completed && {
                    opacity: 0.48,
                  }),
                }}
              />
              <Typography
                noWrap
                variant="h6"
                sx={{
                  p: 3,
                  pl: 2,
                  transition: (theme) =>
                    theme.transitions.create("opacity", {
                      duration: theme.transitions.duration.shortest,
                    }),
                  // ...(completed && {
                  //   opacity: 0.48,
                  // }),
                }}
              >
                {_.capitalize(name)}
              </Typography>
              <Stack
                display="flex"
                flexDirection="column"
                justifyContent="end"
                position="absolute"
                padding={3}
                paddingRight={2}
                right="0"
                top="0"
                bottom="0"
              >
                {duration?.hours ?? duration?.minutes
? (
                  <Tooltip
                    title={`Duration ( ${convertDuration(duration)} )`}
                    placement="right"
                  >
                    <NextImage
                      width="20"
                      height="20"
                      alt="priority"
                      src="/assets/assignment/time.svg"
                      style={{ marginBottom: "7px" }}
                    />
                  </Tooltip>
                )
: null}
                <Tooltip title="Linked to content" placement="right">
                  <NextImage
                    width="20"
                    height="20"
                    alt="priority"
                    src="/assets/assignment/linked.svg"
                    style={{ marginBottom: "7px" }}
                  />
                </Tooltip>
                <Tooltip
                  title={`${_.capitalize(complexity)} complexity level`}
                  placement="right"
                >
                  <NextImage
                    width="20"
                    height="20"
                    alt="priority"
                    style={{ marginBottom: "10px" }}
                    src={IconComplexity[complexity]}
                  />
                </Tooltip>
              </Stack>
            </Box>
          </Paper>
        )}
      </Draggable>

      <AssignmentsDetails
        school_id={school_id}
        assignment={card}
        task={card}
        openDetails={openDetails}
        onCloseDetails={handleCloseDetails}
        onDeleteTask={() => { onDeleteTask(card.id); }}
      />
    </>
  );
}
