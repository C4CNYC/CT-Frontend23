import { useRouter } from "next/router";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TerminalIcon from "@mui/icons-material/Terminal";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

import { useGetChallangesQuery } from "src/redux/services/manager/challenges-student";

interface Props {
  children: React.ReactElement;
}
export default function ChallengesDialog({
  children,
}: Props): React.ReactElement {
  const router = useRouter();
  const courseId = router.query.id as string;
  const [openDialog, setOpenDialog] = useState(false);
  const { data, isLoading, isFetching } = useGetChallangesQuery(
    { id: courseId },
    { skip: !courseId }
  );

  return (
    <>
      <Stack
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        {children}
      </Stack>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(true);
        }}
        fullWidth
        scroll="body"
        maxWidth="md"
        sx={{
          "& .MuiDialog-container": { minHeight: "auto" },
        }}
      >
        <DialogTitle
          sx={{
            pb: 0,
            pt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
          variant="h4"
        >
          Modules
          <IconButton
            edge="end"
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ height: "70vh", overflow: "scroll" }}>
          <Stack p="30px 0">
            {isLoading || isFetching ? <CircularProgress /> : null}
            {data?.units?.map((module) => (
              <Stack key={module.id} pb={2}>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    sx={{ background: "#dedede" }}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography variant="h6" p="13px 0" whiteSpace="nowrap">
                      {module.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0, pb: 0 }}>
                    <List>
                      {!module.lessons.length ? (
                        <ListItem>No lessons</ListItem>
                      ) : null}
                      {module.lessons.map((lesson) => (
                        <ListItem
                          key={lesson.id}
                          sx={{
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            background: "#f4f4f4",
                            marginBottom: 1,
                            pt: 2,
                            pb: 2,
                          }}
                        >
                          <Box display="flex">
                            <TerminalIcon />
                            <Typography ml={2} variant="subtitle2">
                              {lesson.name}
                            </Typography>
                          </Box>
                          <Checkbox />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
