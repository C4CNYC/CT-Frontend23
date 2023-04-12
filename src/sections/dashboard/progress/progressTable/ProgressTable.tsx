import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
const users = [
  { name: "Annika	Schulte", userName: "annika.schulte@example.com" },
  { name: "Valtteri	Mikkola", userName: "valtteri.mikkola@example.com" },
  { name: "Stephanie	Lawson", userName: "stephanie.lawson@example.com" },
  { name: "Arlo	Jackson", userName: "arlo.jackson@example.com" },
  { name: "	Donald	Riley", userName: "donald.riley@example.com" },
  { name: "Stefan	Siebert", userName: "stefan.siebert@example.com" },
];
const modules = [
  {
    name: "Main tag",
    progress: 1,
    lessons: [{ name: "HTML skeleton", progress: 66 }],
  },
  {
    name: "CSS",
    progress: 15,
    lessons: [
      { name: "HTML body", progress: 89 },
      { name: "how to use tags?", progress: 20 },
    ],
  },
  {
    name: "CSS",
    progress: 81,
    lessons: [
      { name: "HTML body", progress: 44 },
      { name: "how to use tags?", progress: 55 },
    ],
  },
  {
    name: "CSS",
    progress: 38,
    lessons: [
      { name: "HTML body", progress: 60 },
      { name: "how to use tags?", progress: 35 },
    ],
  },
];

export default function ProgressTable(): React.ReactElement {
  const [isName, setIsName] = useState<boolean>(true);
  const [displayType, setDisplayType] = useState<string>("modules");
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<Array<any>>(modules);

  const changeTypeHandler = () => {
    if (displayType === "modules") {
      setDisplayType("lessons");
      setData(modules[index]?.lessons);
    } else {
      setDisplayType("modules");
      setData(modules);
    }
  };
  useEffect(() => {
    changeTypeHandler();
  }, [index]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                size="small"
                sx={{
                  position: "sticky",
                  left: 0,
                  zIndex: "1000",
                  padding: "10px 10px",
                  width: { xs: "100px", sm: "auto" },
                }}
              >
                <Button onClick={() => setIsName(!isName)}>
                  {isName ? "Name" : "User name"}
                </Button>
              </TableCell>
              {data.map((el, i) => (
                <TableCell
                  size="small"
                  key={el.name + i}
                  onClick={() => {}}
                  align="center"
                >
                  {displayType !== "modules" ? (
                    <IconButton
                      size="small"
                      onClick={() => {
                        setIndex(innerWidth);
                      }}
                    >
                      <ArrowBackIosNewIcon
                        sx={{ width: "12px", height: "12px" }}
                      />
                    </IconButton>
                  ) : null}

                  {el.name}
                  {displayType !== "lessons" ? (
                    <IconButton
                      onClick={() => {
                        setIndex(i);
                      }}
                      size="small"
                    >
                      <ArrowForwardIosIcon
                        sx={{ width: "12px", height: "12px" }}
                      />
                    </IconButton>
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((el, i) => (
              <TableRow key={i}>
                <TableCell
                  size="small"
                  sx={{
                    position: "sticky",
                    left: 0,
                    zIndex: "1000",
                    background: "#fff",
                    padding: "10px 10px",
                    width: { xs: "100px", sm: "auto" },
                  }}
                >
                  {isName ? el.name : el.userName}
                </TableCell>
                {data.map((el, i) => (
                  <TableCell align="center" size="small">
                    <LinearProgress
                      variant="determinate"
                      value={el.progress}
                      sx={{ height: "8px", width: "80%", margin: "0 auto" }}
                    />
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
