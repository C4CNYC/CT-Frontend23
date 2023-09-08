import { useEffect, useState } from "react";

import { format } from "date-fns";
import { useSnackbar } from "notistack";

import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";

import { Iconify } from "@components";
import {
  useGetLessonContentValidationsManagerQuery,
  useRemoveLessonContentValiationManagerMutation,
} from "src/redux/services/manager/lesson-content-validation-manager";

import CreateEditValidation from "./CreateEditValidation";

const RECOMENDED_COUNT_VALIDATION = 3;

interface Props {
  children?: React.ReactElement;
  stepTitle: string;
  stepId: string;
  setHasValidation: (has: boolean) => void;
}

export default function Validation({
  children,
  stepTitle,
  stepId,
  setHasValidation,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpenDialog] = useState<boolean>(false);

  const [removeRule] = useRemoveLessonContentValiationManagerMutation();
  const { data, isLoading } = useGetLessonContentValidationsManagerQuery({
    id: stepId,
  });

  const onDeleteRule = async (id: string): Promise<void> => {
    try {
      await removeRule({ contentId: stepId, id }).unwrap();
      enqueueSnackbar("validation rule removed");
    } catch (e: any) {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };

  useEffect(() => {
    if (data?.length) {
      setHasValidation(true);
    }
  }, [data]);
  return (
    <>
      <Box
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        {children}
      </Box>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <DialogTitle variant="h5" sx={{ pb: 1, pt: 2 }}>
            Validation Rules ({stepTitle})
          </DialogTitle>
          <IconButton
            onClick={() => {
              setOpenDialog(false);
            }}
            sx={{ mb: "5px", mr: "14px" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 3 }}>
          {data?.length && data?.length >= RECOMENDED_COUNT_VALIDATION ? (
            <Alert sx={{ mb: "30px" }} severity="warning">
              We are not recommend put more then {RECOMENDED_COUNT_VALIDATION}{" "}
              rules for 1 step. <br />
              It can make your step a very complicated and can affect <br />{" "}
              comfort content consumers from phone
            </Alert>
          ) : null}
          <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Rule</StyledTableCell>
                  <StyledTableCell align="left">Regex</StyledTableCell>
                  <StyledTableCell align="left">Created At</StyledTableCell>
                  <StyledTableCell align="left">Updated At</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              {isLoading ? (
                <TableRow>
                  <TableCell>
                    <Skeleton width="100%" height="50px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton width="100%" height="50px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton width="100%" height="50px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton width="100%" height="50px" />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  <TableBody>
                    {data?.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell
                          align="left"
                          component="th"
                          scope="row"
                        >
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.regex}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {format(new Date(row.createdAt), "dd/MM/yyyy")}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {format(new Date(row.updatedAt), "dd/MM/yyyy")}
                        </StyledTableCell>
                        <StyledTableCell sx={{ display: "flex" }} align="left">
                          <CreateEditValidation
                            stepId={stepId}
                            id={row.id}
                            defaultValues={{
                              name: row.name,
                              regex: row.regex,
                            }}
                          >
                            <IconButton>
                              <Iconify icon="material-symbols:edit" />
                            </IconButton>
                          </CreateEditValidation>
                          <IconButton sx={{ ml: 1 }}>
                            <Iconify
                              color="red"
                              onClick={async () => {
                                await onDeleteRule(row.id);
                              }}
                              icon="material-symbols:delete-outline"
                            />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                    {!data?.length ? (
                      <TableRow>
                        <TableCell>NO RULES</TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </>
              )}
            </Table>
            <Stack direction="row-reverse" mt="25px">
              <CreateEditValidation stepId={stepId}>
                <Button sx={{ width: "150px" }} variant="contained">
                  ADD RULE{" "}
                  <Iconify
                    ml="10px"
                    icon="material-symbols:add-circle-outline"
                  />
                </Button>
              </CreateEditValidation>
            </Stack>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
