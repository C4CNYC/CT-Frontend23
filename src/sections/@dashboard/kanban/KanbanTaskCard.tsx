import { useState, ChangeEvent } from "react";
import { Draggable } from "@hello-pangea/dnd";
// @mui
import { Paper, Typography, Box, Checkbox } from "@mui/material";
// @types
import { IKanbanCard } from "../../../@types/kanban";
//
import Image from '../../../components/image';
import KanbanDetails from "./details/KanbanDetails";
import { AssigmentTypes } from "src/redux/services/enums/assigment-types.enum";

// ----------------------------------------------------------------------

type Props = {
  index: number;
  card: IKanbanCard;
  onDeleteTask: (id: string) => void;
};

const ImageCardType: { [key: string]: string } = {
  [AssigmentTypes.REVIEW]: "/assets/assigment/code-review.svg",
  [AssigmentTypes.CODING_IDEA]: "/assets/assigment/code-review.svg",
  [AssigmentTypes.CODING_PROJECT]: "/assets/assigment/code-review.svg",
  [AssigmentTypes.CODING_SNIPETS]: "/assets/assigment/code-review.svg",
  [AssigmentTypes.GROUP_CODING_PROJECT]: "/assets/assigment/code-review.svg",
  [AssigmentTypes.PEER_PREVIEW]: "/assets/assigment/code-review.svg",
  [AssigmentTypes.RESEARCH]: "/assets/assigment/code-review.svg",
}

export default function KanbanTaskCard({ card, onDeleteTask, index }: Props) {
  const { name, type } = card;

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
      <Draggable  draggableId={card.id} index={index}>
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
                  ratio="4/3"
                  sx={{
                    width: "150px",
                    height: "150px",
                    transition: (theme) =>
                      theme.transitions.create('opacity', {
                        duration: theme.transitions.duration.shortest,
                      }),
                    ...(completed && {
                      opacity: 0.48,
                    }),
                  }}
                />
              <Typography
                noWrap
                variant="subtitle2"
                sx={{
                  pl: 2,
                  height: 72,
                  lineHeight: "72px",
                  transition: (theme) =>
                    theme.transitions.create("opacity", {
                      duration: theme.transitions.duration.shortest,
                    }),
                  // ...(completed && {
                  //   opacity: 0.48,
                  // }),
                }}
              >
                {name}
              </Typography>
            </Box>
          </Paper>
        )}
      </Draggable>

      <KanbanDetails
        task={card}
        openDetails={openDetails}
        onCloseDetails={handleCloseDetails}
        onDeleteTask={() => onDeleteTask(card.id)}
      />
    </>
  );
}
