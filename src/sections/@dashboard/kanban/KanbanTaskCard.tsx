import { useState, ChangeEvent } from "react";
import { Draggable } from "@hello-pangea/dnd";
import * as _ from "lodash";
// @mui
import {
  Paper,
  Typography,
  Box,
  Checkbox,
  Stack,
  Tooltip,
} from "@mui/material";
// @types
import { IKanbanCard } from "../../../@types/kanban";
//
import NextImage from "next/image";
import Image from "../../../components/image";
import KanbanDetails from "./details/KanbanDetails";
import { AssigmentTypes } from "src/redux/services/enums/assigment-types.enum";
import { AssigmentComplexity } from "src/redux/services/enums/assigment-complexity.enum";

// ----------------------------------------------------------------------

type Props = {
  index: number;
  card: IKanbanCard;
  onDeleteTask: (id: string) => void;
  school_id: string;
};

const ImageCardType: { [key: string]: string } = {
  [AssigmentTypes.REVIEW]: "/assets/assigment/code-review.svg",
  [AssigmentTypes.CODING_IDEA]: "/assets/assigment/code-idea.svg",
  [AssigmentTypes.CODING_PROJECT]: "/assets/assigment/project.svg",
  [AssigmentTypes.CODING_SNIPETS]: "/assets/assigment/snipets.svg",
  [AssigmentTypes.GROUP_CODING_PROJECT]: "/assets/assigment/group-share.svg",
  [AssigmentTypes.PEER_PREVIEW]: "/assets/assigment/review.svg",
  [AssigmentTypes.RESEARCH]: "/assets/assigment/research.svg",
};

const IconComplexity: { [key: string]: string } = {
  [AssigmentComplexity.Hight]: '/assets/assigment/high-priority.svg',
  [AssigmentComplexity.Medium]: '/assets/assigment/medium-priority.svg',
  [AssigmentComplexity.Low]: '/assets/assigment/low-priority.svg'
}

export default function KanbanTaskCard({ card, onDeleteTask, index, school_id }: Props) {
  const { name, type, duration, complexity } = card;

  const [completed, setCompleted] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleChangeComplete = (event: ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
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
                {
                  duration ? (
                  <Tooltip title="Time limited" placement="right">
                    <NextImage
                      width="20"
                      height="20"
                      alt="priority"
                      src="/assets/assigment/time.svg"
                      style={{ marginBottom: "7px" }}
                    />
                  </Tooltip>) : null
                }
                <Tooltip title="Linked to content" placement="right">
                  <NextImage
                    width="20"
                    height="20"
                    alt="priority"
                    src="/assets/assigment/linked.svg"
                    style={{ marginBottom: "7px" }}
                  />
                </Tooltip>
                <Tooltip title="Low complexity" placement="right">
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

      <KanbanDetails
        school_id={school_id}
        assigment={card}
        task={card}
        openDetails={openDetails}
        onCloseDetails={handleCloseDetails}
        onDeleteTask={() => onDeleteTask(card.id)}
      />
    </>
  );
}
