import Iconify from "@components/iconify";
import MenuPopover from "@components/menu-popover/MenuPopover";
import { Draggable } from "@hello-pangea/dnd";
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import Preferences from "./Modals/Preferences";
import Validation from "./Modals/Validation";

interface Props {
  lessonId: string;
  step: ILessonContent & BaseResponseInterface;
  index: number;
  onRemove: (id: string) => void;
  onDublicate: (step: ILessonContent & BaseResponseInterface) => void;
}

export default function LessonListItem({
  onRemove,
  onDublicate,
  lessonId,
  step,
  index,
}: Props): React.ReactElement {
  const router = useRouter();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = async (
    event: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const selectStep = (): void => {
    router.push(
      `${router.pathname}?${new URLSearchParams({
        ...router.query,
        stepId: step.id,
      })}`,
      undefined,
      { shallow: true }
    );
  };

  return (
    <Draggable draggableId={step.id} index={index}>
      {(provided) => (
        <Paper
          // onClick={selectStep}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          elevation={8}
          sx={{
            cursor: "pointer!important",
            display: "flex",
            p: "15px 10px 15px 5px",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              sx={{ mr: "5px" }}
              onClick={selectStep}
              size="small"
              checked={step.id === router.query.stepId}
            />
            <Box>
              <Typography
                noWrap
                maxWidth="250px"
                variant="subtitle2"
                gutterBottom
              >
                {_.toUpper(step.title)}
              </Typography>
              <Typography maxWidth="250px" noWrap variant="body2">
                {step.description}
              </Typography>
            </Box>
          </Box>
          <IconButton
            sx={{ mr: "2px", mt: "6px" }}
            edge="end"
            onClick={handleOpenPopover}
          >
            <BsThreeDotsVertical size="20px" />
          </IconButton>
          <MenuPopover
            open={openPopover}
            onClose={handleClosePopover}
            arrow="left-top"
            sx={{ width: 160 }}
          >
            <MenuItem
              onClick={() => {
                handleClosePopover();
                onDublicate(step);
              }}
            >
              <Iconify icon="material-symbols:content-copy-outline" />
              Dublicate
            </MenuItem>
            <Preferences
              defaultValues={{ ...step }}
              contentId={step.id}
              lessonId={lessonId}
            >
              <MenuItem>
                <Iconify icon="ep:setting" />
                Preferences
              </MenuItem>
            </Preferences>
            <Validation stepId={step.id} stepTitle={step.title}>
              <MenuItem>
                <Iconify icon="file-icons:test-generic" />
                Validations
              </MenuItem>
            </Validation>
            <Divider sx={{ borderStyle: "dashed" }} />
            <MenuItem
              onClick={() => {
                onRemove(step.id);
                handleClosePopover();
              }}
            >
              <Iconify icon="eva:trash-2-outline" />
              Remove
            </MenuItem>
          </MenuPopover>
        </Paper>
      )}
    </Draggable>
  );
}
