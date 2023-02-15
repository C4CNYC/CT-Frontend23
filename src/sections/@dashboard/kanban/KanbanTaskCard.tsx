import { useState, ChangeEvent } from 'react';
import { Draggable } from '@hello-pangea/dnd';
// @mui
import { Paper, Typography, Box, Checkbox } from '@mui/material';
// @types
import { IKanbanCard } from '../../../@types/kanban';
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
//
import KanbanDetails from './details/KanbanDetails';
import { IAssigment } from 'src/redux/services/interfaces/assigment.interface';
import { BaseResponseInterface } from 'src/utils/baseResponce.interface';

// ----------------------------------------------------------------------

type Props = {
  index: number;
  card: IAssigment & BaseResponseInterface;
  onDeleteTask: (id: string) => void;
};

export default function KanbanTaskCard({ card, onDeleteTask, index }: Props) {
  const { name } = card;

  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
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
              overflow: 'hidden',
              position: 'relative',
              boxShadow: (theme) => theme.customShadows.z1,
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z20,
              },
            }}
          >
            <Box onClick={handleOpenDetails} sx={{ cursor: 'pointer' }}>
              <Typography
                noWrap
                variant="subtitle2"
                sx={{
                  pl: 2,
                  height: 72,
                  lineHeight: '72px',
                  transition: (theme) =>
                    theme.transitions.create('opacity', {
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
