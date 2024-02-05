import { useRouter } from "next/router";
import { useState } from "react";

import { Draggable } from "@hello-pangea/dnd";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
import { RxDragHandleDots2 } from "@react-icons/all-files/rx/RxDragHandleDots2";
import * as _ from "lodash-es";

import {
  Box,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

// import { BaseResponseInterface } from "@utils";
import { LessonContentType } from "src/redux/services/enums/lesson-content-type.enum";
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";
import { useTranslate } from "@/utils/translateHelper";
import { GREEN_DOT_SX, getLessonItemPaperSx } from "../../lessons/LessonStep/constants";
import { Iconify, MenuPopover } from "@/components";

// import Preferences from "./Modals/Preferences";

interface Props {
  //   step: ILessonContent & BaseResponseInterface;
  step: string;
  index: number;
  onRemove: (id: string) => void;
  title: string;
}

const BRIEFING = "#0198ED";
const CUSTOM = "#364954";
const CHALANGES = "#FBDD3F";

export default function ModuleLessonItem({
  //   onRemove,
  title,
  step,
  index,
}: Props): React.ReactElement {
  const router = useRouter();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const translate = useTranslate();

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
        lessonId: step,
      })}`,
      undefined,
      { shallow: true }
    );
  };

  const chooseBorderColor = (): string => {
    return CUSTOM;
  };

  return (
    <Draggable draggableId={step} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          onClick={selectStep}
          elevation={8}
          sx={{ ...getLessonItemPaperSx(chooseBorderColor) }}
        >
          {router.query.stepId === step && <Box sx={GREEN_DOT_SX}></Box>}

          <IconButton sx={{ mr: "5px" }} {...provided.dragHandleProps}>
            <RxDragHandleDots2 size="24px" />
          </IconButton>
          <Stack sx={{ width: "100%", alignItems: "flex-end" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{ width: "100%" }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "160px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    mb: 0,
                  }}
                  gutterBottom
                >
                  {_.toUpper(title)}
                </Typography>
                <Typography
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                  noWrap
                  variant="body2"
                >
                  {title}
                </Typography>
              </Box>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenPopover(e);
                }}
              >
                <BsThreeDotsVertical size="20px" />
              </IconButton>
            </Stack>

            <Stack
              direction="row"
              gap={1}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <IconButton
              // onClick={() => {
              //   onDublicate(step);
              // }}
              >
                <Iconify icon="material-symbols:content-copy-outline" />
              </IconButton>

              {/* <Preferences
                defaultValues={{ ...step }}
                contentId={step.id}
                lessonId={lessonId}
              >
                <IconButton>
                  <Iconify icon="ep:setting" />
                </IconButton>
              </Preferences>  */}
            </Stack>
          </Stack>

          <MenuPopover
            open={openPopover}
            onClose={handleClosePopover}
            onClick={(e) => {
              e.stopPropagation();
            }}
            arrow="left-top"
            sx={{ width: 160 }}
          >
            <MenuItem
              onClick={() => {
                // onRemove();
                handleClosePopover();
              }}
            >
              <Iconify icon="eva:trash-2-outline" />
              {translate("actions_remove")}
            </MenuItem>
          </MenuPopover>
        </Paper>
      )}
    </Draggable>
  );
}
