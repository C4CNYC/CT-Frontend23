import { IProgressTableData } from "@pages/manager/school/progress";
import _ from "lodash";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Checkbox,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

interface IProgressTable {
  hasBackLink: boolean;
  hasNextLink: boolean;
  data: IProgressTableData[];
  goBack: () => void;
  onSelectGroup: (groupId: string) => void;
}

export default function ProgressTable({
  data,
  goBack,
  hasBackLink,
  hasNextLink,
  onSelectGroup,
}: IProgressTable): React.ReactElement {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                size="small"
                width="20%"
                sx={{
                  position: "sticky",
                  left: 0,
                  zIndex: "1000",
                  padding: "10px 10px",
                }}
              >
                Name
              </TableCell>
              {data[0]?.x?.map((el, i) => (
                <TableCell
                  sx={{ cursor: "pointer" }}
                  size="small"
                  key={el.id}
                  align="center"
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    pr={hasBackLink ? "38px" : 0}
                  >
                    {hasBackLink ? (
                      <IconButton size="small" onClick={goBack}>
                        <ArrowBackIosNewIcon
                          sx={{ width: "12px", height: "12px" }}
                        />
                      </IconButton>
                    ) : null}
                    <Tooltip placement="top" title={el.name}>
                      <Typography
                        sx={{
                          textDecoration: hasNextLink ? "underline" : "none",
                        }}
                        onClick={() => {
                          onSelectGroup(el.id);
                        }}
                        width="50px"
                        noWrap
                      >
                        {el.name}
                      </Typography>
                    </Tooltip>
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el, i) => (
              <TableRow key={i}>
                <TableCell
                  size="small"
                  sx={{
                    position: "sticky",
                    left: 0,
                    zIndex: "1000",
                    background: "#fff",
                    padding: "10px 10px",
                  }}
                >
                  {el.y}
                </TableCell>
                {el.x.map((x, i) => (
                  <TableCell key={i} align="center" size="small">
                    <Tooltip
                      placement="top"
                      title={
                        <div>
                          Student: {el.y} <br /> {_.capitalize(x.type)}:{" "}
                          {x.name} <br />
                          Progress:{" "}
                          {hasNextLink
                            ? `${Math.floor(x.progress)}%`
                            : `${x.progress ? "done" : "not done"}`}
                        </div>
                      }
                    >
                      {hasNextLink ? (
                        <LinearProgress
                          variant="determinate"
                          value={x.progress}
                          sx={{ height: "28px", m: "0 auto", width: "40%" }}
                        />
                      ) : (
                        <Checkbox checked={!!x.progress} />
                      )}
                    </Tooltip>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
